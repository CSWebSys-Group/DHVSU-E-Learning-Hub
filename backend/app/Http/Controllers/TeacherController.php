<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class TeacherController extends Controller implements HasMiddleware
{
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
    public function store(Request $request)
    {

    }

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
            'subjects' => 'sometimes|array',
        ]);
        

        $teacher->update($fields);

        return ['teacher' => $teacher];
    }

  public function destroy(Teacher $teacher)
{
    // Get the authenticated user
    $user = User::where('id', Auth::id())->first();
    
        
    $teacheruser = User::where('id',$teacher->id)->first();
    $authteacher = Teacher::where('id', $user->id)->first();

    // Only admins can delete teachers
    if (!$authteacher->isAdmin) {  // Check if the authenticated user is an admin
        return response()->json(['message' => 'Unauthorized'], 403);
    }


    try {
        // Attempt to delete the teacher
        $teacheruser->delete();
        $teacher->delete();
        return response()->json(['message' => 'Teacher deleted successfully'], 200);
    } catch (\Exception $e) {
        // Catch any errors and return them
        return response()->json(['message' => 'Failed to delete teacher', 'error' => $e->getMessage()], 500);
    }
}
}