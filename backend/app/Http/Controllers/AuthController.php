<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\StudentIDs;
use App\Models\TeacherIDs;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

    public function registerStudent(Request $request)
    {

        if (!StudentIDs::where('id', $request->id)->exists()) {
            return response()->json(['error' => 'Invalid student ID.'], 400);
        }

        if (Student::where('email', $request->email)->exists()) {
            return response()->json(['error' => 'The email has already been taken.'], 400);
        }

        if (Student::where('id', $request->id)->exists()) {
            return response()->json(['error' => 'The id has already been taken.'], 400);
        }

        $request->validate([
            'id' => 'required|integer|unique:students',
            'fn' => 'required|string|max:255',
            'ln' => 'required|string|max:255',
            'activities' => 'nullable|array',
            'assessment' => 'nullable|array',

            'grades' => 'nullable|array',
            'grades.*.subject_id' => 'required_with:grades|integer',
            'grades.*.grade' => 'required_with:grades|numeric|min:60|max:100',

            'email' => 'required|string|email|unique:students',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $student = Student::create([
            'id' => $request->id,
            'fn' => $request->fn,
            'ln' => $request->ln,
            'activities' => $request->activities,
            'assessment' => $request->assessment,
            'grades' => $request->grades,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($student->id);

        return response()->json(['student' => $student, 'token' => $token], 201);
    }

    public function registerTeacher(Request $request)
    {
        if (!TeacherIDs::where('id', $request->id)->exists()) {
            return response()->json(['error' => 'Invalid teacher ID.'], 400);
        }

        if (Teacher::where('email', $request->email)->exists()) {
            return response()->json(['error' => 'The email has already been taken.'], 400);
        }

        if (Teacher::where('id', $request->id)->exists()) {
            return response()->json(['error' => 'The id has already been taken.'], 400);
        }

        $request->validate([
            'id' => 'required|integer|unique:teachers',
            'fn' => 'required|string|max:255',
            'ln' => 'required|string|max:255',
            'activities' => 'nullable|array',
            'assessment' => 'nullable|array',
            'subjects' => 'nullable|array',
            'email' => 'required|string|email|unique:teachers',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $teacher = Teacher::create([
            'id' => $request->id,
            'fn' => $request->fn,
            'ln' => $request->ln,
            'activities' => $request->activities,
            'assessment' => $request->assessment,
            'subjects' => $request->subjects,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($teacher->id);

        return response()->json(['teacher' => $teacher, 'token' => $token], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Attempt to log in as a student
        $student = Student::where('email', $request->email)->first();
        if ($student && Hash::check($request->password, $student->password)) {
            $token = JWTAuth::fromUser($student->id);
            return response()->json(['user' => $student, 'token' => $token, 'role' => 'student'], 200);
        }

        // Attempt to log in as a teacher
        $teacher = Teacher::where('email', $request->email)->first();
        if ($teacher && Hash::check($request->password, $teacher->password)) {
            $token = JWTAuth::fromUser($teacher->id);
            return response()->json(['user' => $teacher, 'token' => $token, 'role' => 'teacher'], 200);
        }

        // If authentication failed for both
        return response()->json(['error' => 'Invalid credentials'], 401);
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['message' => 'Successfully logged out']);
    }


    // Get authenticated user
    public function me()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            $role = $user instanceof Student ? 'student' : 'teacher';

            return response()->json(['user' => $user, 'role' => $role]);
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token expired'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token invalid'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Token not found'], 401);
        }
    }
}
