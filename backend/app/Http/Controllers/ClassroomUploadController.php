<?php

namespace App\Http\Controllers;

use App\Models\ActivityDeadline;
use App\Models\ActivitySubmission;
use App\Models\ClassroomUpload;
use App\Models\ActivityUpload;
use App\Models\AuditLog;
use App\Models\Module;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\User;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class ClassroomUploadController extends Controller implements HasMiddleware
{
    private $cloudinary;

    public function __construct()
    {
        $this->cloudinary = new Cloudinary([
            'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
            'api_key'    => env('CLOUDINARY_API_KEY'),
            'api_secret' => env('CLOUDINARY_API_SECRET'),
        ]);
    }

    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

    /**
     * Handle file uploads to Cloudinary.
     */
    private function handleFileUploads(Request $request)
    {
        $uploadedAttachments = [];
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                if (!$file->isValid()) {
                    return response()->json(['message' => 'Invalid file uploaded'], 400);
                }

                $fileName = $file->getClientOriginalName();

                $result = $this->cloudinary->uploadApi()->upload(
                    $file->getRealPath(),
                    [
                        'folder' => 'ClassroomAttachments',
                        'public_id' => pathinfo($fileName, PATHINFO_FILENAME),
                        'resource_type' => 'auto'
                    ]
                );

                if (isset($result['secure_url'])) {
                    $uploadedAttachments[] = $result['secure_url'];
                } else {
                    return response()->json(['message' => 'Cloudinary upload failed'], 500);
                }
            }
        }
        return $uploadedAttachments;
    }

    private function handleFileDeletes(array $files)
    {
        // Initialize a list to collect unsuccessful deletions
        $failedDeletes = [];
        foreach ($files as $file) {
            // Extract the public ID from the file URL using a regex
            $publicId = preg_replace('/^.+\/ClassroomAttachments\/([^\/]+)\..+$/', 'ClassroomAttachments/$1', $file);

            // If the public ID extraction fails, log and return an error
            if (!$publicId) {
                $failedDeletes[] = [
                    'file_url' => $file,
                    'error' => 'Failed to extract public ID from file URL',
                ];
                continue; // Skip to the next file
            }

            try {
                // Attempt to delete the file from Cloudinary
                $result = $this->cloudinary->uploadApi()->destroy($publicId);

                // Check if the deletion was successful
                if ($result['result'] !== 'ok') {
                    $failedDeletes[] = [
                        'file_url' => $file,
                        'cloudinary_response' => $result,
                    ];
                }
            } catch (\Exception $e) {
                // Log any errors during the deletion process
                $failedDeletes[] = [
                    'file_url' => $file,
                    'error' => $e->getMessage(),
                ];
            }
        }

        // If there are any failed deletions, return the failure details
        if (count($failedDeletes) > 0) {
            return response()->json([
                'message' => 'Some files could not be deleted',
                'failed_deletes' => $failedDeletes,
            ], 500);
        }

        // Return success if all deletions were successful
        return response()->json(['message' => 'Files deleted successfully'], 200);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(ClassroomUpload::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string|in:module,activity',
            'subject_id' => 'required|integer',
            'title' => 'required|string',
            'description' => 'sometimes|string|nullable',
            'total_score' => 'sometimes|integer',
            'deadline' => 'sometimes|date_format:Y-m-d H:i:s',
            'files' => 'sometimes|array',
            'files.*' => 'file|max:51200',
        ]);

        $user = User::where('id', Auth::user()->id)->first();

        if ($user->user_type !== 'T') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $subject = Subject::where('id', $request->subject_id)->first();

        if (!$subject) {
            return response()->json(['message' => 'No subject found'], 403);
        }

        if ($user->id !== $subject->teacher_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Handle attachments upload
        $uploadedAttachments = $this->handleFileUploads($request);

        $classroomUpload = ClassroomUpload::create([
            'type' => $request->type,
            'subject_id' => $request->subject_id
        ]);

        // Ensure classroom_uploads is an array
        $uploads = $subject->classroom_uploads ?? []; // Decode from JSON to array
        $uploads[] = $classroomUpload->id; // Add the new upload ID to the array

        // Save back to the Subject model
        $subject->classroom_uploads = $uploads; // Encode back to JSON
        $subject->save(); // Save changes to the database

        $upload_info = null;

        if ($classroomUpload->type === 'activity') {
            if (!$request->total_score) {
                return response()->json(['message' => 'Activity Field missing'], 403);
            }
            if (!$request->deadline) {
                return response()->json(['message' => 'Deadline Field missing'], 403);
            }

            $deadline = ActivityDeadline::create(['activity_upload_id' => $classroomUpload->id, 'deadline' => $request->deadline]);

            $upload_info = ActivityUpload::create([
                'id' => $classroomUpload->id,
                'title' => $request->title,
                'description' => $request->description,
                'attachments' => $uploadedAttachments,
                'total_score' => $request->total_score,
                'deadline_id' => $deadline->id,
            ]);
        } else if ($classroomUpload->type === 'module') {
            $upload_info = Module::create([
                'id' => $classroomUpload->id,
                'title' => $request->title,
                'description' => $request->description,
                'attachments' => $uploadedAttachments,
            ]);
        }

        $subject_teacher = Teacher::where('id', $user->id)->first();

        AuditLog::create([
            'description' => "{$subject_teacher->fn} {$subject_teacher->ln} with ID: {$user->id} uploaded a new content in Subject: {$subject->subject_code} with subject ID: {$subject->id}.",
            "user_type" => "T"
        ]);

        return ['classroom_upload' => $classroomUpload, 'upload_info' => $upload_info];
    }


    /**
     * Display the specified resource.
     */
    public function show(ClassroomUpload $classroomUpload)
    {
        return ['classroom_upload' => $classroomUpload];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ClassroomUpload $classroomUpload) {}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ClassroomUpload $classroomUpload)
    {
        $user = User::where('id', Auth::user()->id)->first();

        if ($user->user_type !== 'T') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $subject = Subject::where('id', $classroomUpload->subject_id)->first();

        if (!$subject) {
            return response()->json(['message' => 'No subject found'], 403);
        }

        if ($user->id !== $subject->teacher_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($classroomUpload->type === 'activity') {
            $activityUpload = ActivityUpload::find($classroomUpload->id);
            if ($activityUpload) {
                $submissions = ActivitySubmission::where('activity_upload_id', $classroomUpload->id)->get();
                foreach ($submissions as $submission) {
                    $this->handleFileDeletes($submission->attachments ?? []);
                    $submission->delete();
                }
                ActivityDeadline::where('activity_upload_id', $classroomUpload->id)->delete();

                $this->handleFileDeletes($activityUpload->attachments ?? []);

                $activityUpload->delete();
            }
        } else if ($classroomUpload->type === 'module') {
            $module = Module::find($classroomUpload->id);
            if ($module) {
                $this->handleFileDeletes($module->attachments ?? []);
                $module->delete();
            }
        }

        if (!$subject) {
            return response()->json(['message' => 'No subject found'], 403);
        }

        if ($user->id !== $subject->teacher_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Remove the upload from the subject's classroom_uploads array
        $uploads = $subject->classroom_uploads ?? [];
        $uploads = array_filter($uploads, function ($uploadId) use ($classroomUpload) {
            return $uploadId !== $classroomUpload->id;
        });

        // Save the updated array back to the subject model
        $subject->classroom_uploads = $uploads;
        $subject->save();

        // Delete the classroom upload itself
        $classroomUpload->delete();

        $subject_teacher = Teacher::where('id', $subject->teacher_id)->first();

        AuditLog::create([
            'description' => "{$subject_teacher->fn} {$subject_teacher->ln} with ID: {$user->id} deleted a content in Subject: {$subject->subject_code} with subject ID: {$subject->id}.",
            "user_type" => "T"
        ]);

        return response()->json(['message' => 'Classroom upload deleted successfully'], 200);
    }

    public function showClassroomUploadBySubjectId(Request $request)
    {
        $request->validate([
            'subject_id' => 'required|integer'
        ]);

        $subject = Subject::where('id', $request->subject_id)->first();

        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 400);
        }

        $classroomUploads = ClassroomUpload::where('subject_id', $subject->id)->get();

        return ['classroomUploads' => $classroomUploads];
    }
}
