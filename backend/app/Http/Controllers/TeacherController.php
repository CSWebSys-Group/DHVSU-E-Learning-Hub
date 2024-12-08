<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\Teacher;
use App\Models\User;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class TeacherController extends Controller implements HasMiddleware
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
     * Display a listing of teachers.
     */
    public function index()
    {
        return Teacher::all();
    }

    /**
     * Store a newly created teacher in storage.
     */
    public function store(Request $request) {}

    /**
     * Display the specified teacher.
     */
    public function show(Teacher $teacher)
    {
        return ['teacher' => $teacher];
    }

    /**
     * Update the specified teacher in storage.
     */
    public function update(Request $request, Teacher $teacher)
    {
        $user = User::where('id', Auth::id())->first();

        $authteacher = Teacher::where('id', $user->id)->first();

        // Only admins and user can update teachers
        if (!$authteacher || (!$authteacher->isAdmin && $user->id !== $teacher->id)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }


        $fields = $request->validate([
            'fn' => 'sometimes|string|max:100',
            'ln' => 'sometimes|string|max:100',
            'gender' => 'sometimes|string|in:M,F,Others',
            'isAdmin' => 'sometimes|boolean',
            'birthday' => 'nullable|sometimes|date',
            'subjects' => 'sometimes|array',
            'profile_picture' => 'nullable|sometimes|file|image|max:2048',
        ]);

        if ($request->hasFile('profile_picture')) {
            // Check and delete the existing Cloudinary file if it exists
            if ($teacher->profile_picture) {
                // Extract the public ID from the current Cloudinary URL
                $publicId = pathinfo($teacher->profile_picture, PATHINFO_FILENAME); // More robust extraction
                cloudinary()->destroy($publicId);
            }

            // Upload the new file to Cloudinary
            $uploadedFileUrl = cloudinary()->upload($request->file('profile_picture')->getRealPath())->getSecurePath();
            $fields['profile_picture'] = $uploadedFileUrl; // Update the profile_picture field
        }

        $teacher->update($fields);

        AuditLog::create([
            'description' => "{$authteacher->fn} {$authteacher->ln} with ID: {$user->id} made changes for teacher with name: {$teacher->fn} {$teacher->ln} and ID: {$teacher->id}.",
            "user_type" => $authteacher->isAdmin ? 'A' : 'T'
        ]);

        return ['teacher' => $teacher];
    }

    public function destroy(Teacher $teacher)
    {
        // Get the authenticated user
        $user = User::where('id', Auth::id())->first();


        $teacheruser = User::where('id', $teacher->id)->first();
        $authteacher = Teacher::where('id', $user->id)->first();

        // Only admins can delete teachers
        if (!$authteacher || !$authteacher->isAdmin) {  // Check if the authenticated user is an admin
            return response()->json(['message' => 'Unauthorized'], 403);
        }


        try {
            AuditLog::create([
                'description' => "{$authteacher->fn} {$authteacher->ln} with ID: {$user->id} deleted a teacher with name: {$teacher->fn} {$teacher->ln} and ID: {$teacher->id}.",
                "user_type" => $authteacher->isAdmin ? 'A' : 'T'
            ]);
            // Attempt to delete the teacher
            $teacheruser->delete();
            $teacher->delete();
            return response()->json(['message' => 'Teacher deleted successfully'], 200);
        } catch (\Exception $e) {
            // Catch any errors and return them
            return response()->json(['message' => 'Failed to delete teacher', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateProfilePicture(Request $request, Teacher $teacher)
    {
        $request->validate([
            'file' => 'required|file|image|max:2048', // Accept only images up to 2MB
        ]);

        // Get the authenticated user
        $user = Auth::user(); // Using Laravel's `Auth::user()` for convenience

        // Check if the authenticated user is either the owner or an admin
        $authTeacher = Teacher::where('id', $user->id)->first();

        if (!$authTeacher || ($user->id !== $teacher->id && !$authTeacher->isAdmin)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($request->hasFile('file')) {
            // Delete old profile picture from Cloudinary
            if ($teacher->profile_picture !== null) {
                $publicId = preg_replace('/^.+\/Project_Impossible\/(.+)\..+$/', 'Project_Impossible/$1', $teacher->profile_picture);
                try {
                    $this->cloudinary->uploadApi()->destroy($publicId);
                } catch (\Exception $e) {
                    return response()->json([
                        'error' => 'Failed to delete old profile picture',
                        'details' => $e->getMessage(),
                    ], 500);
                }
            }

            // Upload new profile picture
            try {
                $uploadedFile = $this->cloudinary->uploadApi()->upload(
                    $request->file('file')->getRealPath(),
                    [
                        'folder' => 'Project_Impossible',
                        'transformation' => [
                            'width' => 400,
                            'height' => 400,
                            'crop' => 'fill',
                        ]
                    ]
                );

                $teacher->update(['profile_picture' => $uploadedFile['secure_url']]);

                AuditLog::create([
                    'description' => "{$authTeacher->fn} {$authTeacher->ln} with ID: {$user->id} made changes to teacher information named: {$teacher->fn} {$teacher->ln} with ID: {$teacher->id}.",
                    "user_type" => $authTeacher->isAdmin ? 'A' : 'T'
                ]);

                return response()->json([
                    'message' => 'Profile picture updated successfully',
                    'teacher' => $teacher,
                ], 200);
            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Failed to upload new profile picture',
                    'details' => $e->getMessage(),
                ], 500);
            }
        }

        return response()->json([
            'error' => 'No file provided',
        ], 400);
    }
}
