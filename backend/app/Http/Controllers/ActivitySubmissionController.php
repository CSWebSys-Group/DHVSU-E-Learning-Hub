<?php

namespace App\Http\Controllers;

use App\Models\ActivitySubmission;
use App\Http\Requests\StoreActivitySubmissionRequest;
use App\Http\Requests\UpdateActivitySubmissionRequest;
use App\Models\ActivityDeadline;
use App\Models\ActivityUpload;
use App\Models\AuditLog;
use App\Models\ClassroomUpload;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Cloudinary\Cloudinary;
use Illuminate\Support\Facades\Auth;

class ActivitySubmissionController extends Controller implements HasMiddleware
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
                $result = $this->cloudinary->uploadApi()->upload(
                    $file->getRealPath(),
                    [
                        'folder' => 'ClassroomAttachments',
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
        return response()->json(ActivitySubmission::all(), 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'student_id' => 'required|integer',
            'activity_upload_id' => 'required|integer',
            'files' => 'sometimes|array',
            'files.*' => 'file|max:20480',
        ]);

        $student = Student::where('id', $request->student_id)->first();
        $activity = ActivityUpload::where('id', $request->activity_upload_id)->first();

        if (!$student) return response()->json(['message' => 'No student found']);
        if (!$activity) return response()->json(['message' => 'No activity found']);

        $studentAlreadySubmitted = ActivitySubmission::where('student_id', $fields['student_id'])
            ->where('activity_upload_id', $fields['activity_upload_id'])
            ->exists();

        if ($studentAlreadySubmitted) {
            return response()->json(['message' => 'Student has already submitted this activity'], 400);
        }

        $deadline = ActivityDeadline::where('activity_upload_id', $activity->id)->first();

        if (!$deadline) return response()->json(['message' => 'No deadline'], 400);

        $deadlineTime = Carbon::parse($deadline->deadline);

        if (Carbon::now()->greaterThan($deadlineTime)) {
            return response()->json(['message' => 'Deadline has passed'], 400);
        }

        $uploadedAttachments = $this->handleFileUploads($request);

        // Continue processing the request if no submission exists.
        $submission = ActivitySubmission::create([
            'student_id' => $fields['student_id'],
            'activity_upload_id' => $fields['activity_upload_id'],
            'attachments' => $uploadedAttachments,
        ]);

        // Update the student's activities array
        $activities = $student->activities ?? []; // Ensure it's an array
        $activities[] = $submission->id; // Add the new submission ID
        $student->activities = $activities; // Assign the updated array back
        $student->save(); // Save the changes

        AuditLog::create([
            'description' => "{$student->fn} {$student->ln} with ID: {$student->id} made a submission in Activity: {$activity->title} with activity ID: {$activity->id}.",
            "user_type" => "S"
        ]);

        return ['activity_submission' => $submission];
    }

    /**
     * Display the specified resource.
     */
    public function show(ActivitySubmission $activitySubmission)
    {
        return ['activity_submission' => $activitySubmission];
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ActivitySubmission $activitySubmission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateActivitySubmissionRequest $request, ActivitySubmission $activitySubmission)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ActivitySubmission $activitySubmission)
    {
        //
    }

    public function findSubmissionByStudentIdAndActivityId(Request $request)
    {
        $request->validate([
            'student_id' => 'required|integer',
            'activity_upload_id' => 'required|integer'
        ]);

        $studentSubmission = ActivitySubmission::where('student_id', $request->student_id)
            ->where('activity_upload_id', $request->activity_upload_id)
            ->first();

        if (!$studentSubmission) {
            return response()->json([null]);
        }

        return ['studentSubmission' => $studentSubmission];
    }

    public function gradeSubmission(Request $request, $activitySubmissionId)
    {
        $activitySubmissionId = (int) $activitySubmissionId; // Ensure it's an integer
        $activitySubmission = ActivitySubmission::where('id', $activitySubmissionId)->first();
        if (!$activitySubmission) return response()->json(['message' => 'Submission not found'], 400);

        $activityUpload = ActivityUpload::where('id', $activitySubmission->activity_upload_id)->first();
        $classroomUpload = ClassroomUpload::where('id', $activityUpload->id)->first();
        $subject = Subject::where('id', $classroomUpload->subject_id)->first();

        $teacher = Teacher::where('id', Auth::user()->id)->first();

        if ($subject->teacher_id !== Auth::user()->id || !$teacher) return response()->json(['message' => 'Unauthorized'], 403);

        $student = Student::where('id', $activitySubmission->student_id)->first();

        $request->validate(['score' => 'required|integer']);

        if ($request->score > $activityUpload->total_score) return response()->json(['message' => 'Score should not be greater than the total score'], 400);
        if ($request->score < 0) return response()->json(['message' => 'Score should not be lower than zero'], 400);

        $activitySubmission->score = $request->score;
        $activitySubmission->submitted = true;
        $activitySubmission->save();

        AuditLog::create([
            'description' => "{$teacher->fn} {$teacher->ln} graded {$student->fn} {$student->ln}'s activity",
            "user_type" => "T"
        ]);

        return ['activitySubmission' => $activitySubmission];
    }
}
