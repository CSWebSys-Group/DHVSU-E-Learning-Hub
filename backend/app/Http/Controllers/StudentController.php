<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Cloudinary\Cloudinary;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class StudentController extends Controller implements HasMiddleware
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

    public function index()
    {
        return response()->json(Student::all(), 200);
    }

    public function store(Request $request) {}

    public function show(Student $student)
    {
        return ['student' => $student];
    }


    /**
     * Update the specified student in storage.
     */
    public function update(Request $request, Student $student)
    {
        $user = User::where('id', Auth::id())->first();

        if ($user->user_type === "T") {
            $authteacher = Teacher::where('id', $user->id)->first();

            // Only admins and user can update the logged student
            if (!$authteacher || (!$authteacher->isAdmin && $user->id !== $student->id)) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        } else if ($user->user_type === "S") {
            $authstudent = Student::where('id', $user->id)->first();

            if (!$authstudent || $user->id !== $student->id) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }


        $fields = $request->validate([
            'fn' => 'sometimes|string|max:100',
            'ln' => 'sometimes|string|max:100',
            'gender' => 'sometimes|string|in:M,F,Others',
            'birthday' => 'nullable|sometimes|date',
            'section_id' => 'nullable|sometimes|integer|exists:sections,id',
            'activities' => 'nullable|sometimes|array',
            'grades' => 'nullable|sometimes|array',
            'middle_name' => 'nullable|sometimes|string|max:100',
            'ext_name' => 'nullable|sometimes|string|max:10',
            'place_of_birth' => 'nullable|sometimes|string',
            'civil_status' => 'nullable|sometimes|in:single,married,widowed',
            'nationality' => 'nullable|sometimes|string',
            'religion' => 'nullable|sometimes|string',
            'contact_number' => 'nullable|sometimes|string',
            'height' => 'nullable|sometimes|integer',
            'weight' => 'nullable|sometimes|integer',
            'blood_type' => 'nullable|sometimes|string',
            'address' => 'nullable|sometimes|string',
            'province' => 'nullable|sometimes|string',
            'city' => 'nullable|sometimes|string',
            'barangay' => 'nullable|sometimes|string',
            'zip_code' => 'nullable|sometimes|integer',
        ]);

        $student->update($fields);

        return response()->json(['student' => $student], 200);
    }

    public function destroy(Student $student)
    {
        // Get the authenticated user
        $user = User::where('id', Auth::id())->first();

        $studentuser = User::where('id', $student->id)->first();
        $authAdmin = Teacher::where('id', $user->id)->first();

        // Only admins can delete students
        if (!$authAdmin || !$authAdmin->isAdmin) {  // Check if the authenticated user is an admin
            return response()->json(['message' => 'Unauthorized'], 403);
        }


        try {
            // Attempt to delete the student
            $studentuser->delete();
            $student->delete();
            return response()->json(['message' => 'Student deleted successfully'], 200);
        } catch (\Exception $e) {
            // Catch any errors and return them
            return response()->json(['message' => 'Failed to delete Student', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateProfilePicture(Request $request, Student $student)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg|max:2048', // Accept only images up to 2MB
        ]);

        // Get the authenticated user
        $user = Auth::user(); // Using Laravel's `Auth::user()` for convenience

        // Check if the authenticated user is either the owner or an admin
        if ($user->user_type === 'S' && $user->id !== $student->id) {
            // Students can only update their own profile picture
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($user->user_type === 'T') {
            $authteacher = Teacher::where('id', $user->id)->first();
            if (!$authteacher || !$authteacher->isAdmin) {
                // Non-admin teachers cannot update student profiles
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        }

        if ($request->hasFile('file')) {

            // Delete old profile picture from Cloudinary
            if ($student->profile_picture !== null) {
                $publicId = preg_replace('/^.+\/Project_Impossible\/(.+)\..+$/', 'Project_Impossible/$1', $student->profile_picture);
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

                $student->update(['profile_picture' => $uploadedFile['secure_url']]);

                return response()->json([
                    'message' => 'Profile picture updated successfully',
                    'student' => $student,
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
