<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class StudentController extends Controller implements HasMiddleware
{

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

    public function store(Request $request)
    {
      
    }

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
    }   else if ($user->user_type ==="S"){
        $authstudent = Student::where('id', $user->id)->first();

        if (!$authstudent || $user->id !== $student->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }   else {
        return response()->json(['message' => 'Unauthorized'], 403);
    }


    $fields = $request->validate([
        'fn' => 'sometimes|string|max:100',
        'ln' => 'sometimes|string|max:100',
        'gender' => 'sometimes|string|in:M,F,Others',
        'birthday' => 'nullable|date',
        'section_id' => 'nullable|integer|exists:sections,id',
        'tasks' => 'nullable|array',
        'grades' => 'nullable|array',
    ]);

    $student->update($fields);

    return response()->json(['student' => $student], 200);
}

public function destroy(Student $student)
{
    // Get the authenticated user
    $user = User::where('id', Auth::id())->first();
    
    $studentuser = User::where('id',$student->id)->first();
    $authAdmin = Teacher::where('id', $user->id)->first();

    // Only admins can delete teachers
    if (!$authAdmin->isAdmin) {  // Check if the authenticated user is an admin
        return response()->json(['message' => 'Unauthorized'], 403);
    }


    try {
        // Attempt to delete the teacher
        $studentuser->delete();
        $student->delete();
        return response()->json(['message' => 'Student deleted successfully'], 200);
    } catch (\Exception $e) {
        // Catch any errors and return them
        return response()->json(['message' => 'Failed to delete Student', 'error' => $e->getMessage()], 500);
    }
}
}