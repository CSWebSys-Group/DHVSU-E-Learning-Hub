<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Validation\Rule;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class SectionController extends Controller implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Section::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = User::where('id', Auth::id())->first();
        $teacher = Teacher::where('id', $user->id)->first();

        if ($user->user_type !== 'T' || !$teacher || !$teacher->isAdmin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'year' => 'required|integer',
            'name' => [
                'required',
                'string',
                Rule::unique('sections')->where(function ($query) use ($request) {
                    return $query
                        ->where('year', $request->year)
                        ->where('course_id', $request->course_id);
                }),
            ],
            'course_id' => 'required|integer',
        ]);

        $section = Section::create([
            'year' => $request->year,
            'name' => $request->name,
            'course_id' => $request->course_id,
            'students' => [],
            'subjects' => []
        ]);

        return ['section' => $section];
    }

    /**
     * Display the specified resource.
     */
    public function show(Section $section)
    {
        return ['section' => $section];
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Section $section)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Section $section)
    {
        $user = User::where('id', Auth::id())->first();
        $teacher = Teacher::where('id', $user->id)->first();

        if ($user->user_type !== 'T' || !$teacher || !$teacher->isAdmin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $fields = $request->validate([
            'year' => 'sometimes|integer',
            'name' => 'sometimes|string|unique:sections,name',
            'course_id' => 'sometimes|integer',
            'students' => 'sometimes|array|nullable',
            'subjects' => 'sometimes|array|nullable'
        ]);

        $section->update($fields);

        return response()->json(['section' => $section]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Section $section)
    {
        $user = User::where('id', Auth::id())->first();
        $teacher = Teacher::where('id', $user->id)->first();

        if ($user->user_type !== 'T' || !$teacher || !$teacher->isAdmin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $students = $section->students ?? [];

        foreach ($students as $studentId) {
            $student = Student::where('id', $studentId)->first();
            if ($student) {
                $student->section_id = null;
                $student->save();
            }
        }

        $section->delete();

        return ['message' => 'Section successfully deleted'];
    }

    public function addStudent(Request $request, Section $section)
    {
        $user = User::where('id', Auth::id())->first();
        $teacher = Teacher::where('id', $user->id)->first();

        if ($user->user_type !== 'T' || !$teacher || !$teacher->isAdmin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'id' => 'required|integer'
        ]);

        $student = Student::where('id', $request->id)->first();

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 400);
        }

        if ($student->section_id) {
            return response()->json(['message' => 'Student already has a section'], 400);
        }

        $students = $section->students ?? [];

        $students[] = $request->id;

        $section->students = $students;
        $section->save();

        $student->section_id = $section->id;
        $student->save();

        return response()->json(['message' => 'Student added successfully'], 200);
    }

    public function removeStudent(Request $request, Section $section)
    {
        $user = User::where('id', Auth::id())->first();
        $teacher = Teacher::where('id', $user->id)->first();

        if ($user->user_type !== 'T' || !$teacher || !$teacher->isAdmin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'id' => 'required|integer'
        ]);

        $student = Student::where('id', $request->id)->first();

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 400);
        }

        // Get the current students array from the section
        $students = $section->students ?? [];

        // Remove the student ID from the array
        $students = array_filter($students, function ($id) use ($request) {
            return $id != $request->id; // Remove the matching student ID
        });

        // Re-index the array to fix keys
        $students = array_values($students);

        // Update the section's students array and save it
        $section->students = $students;
        $section->save();

        // Optionally, update the student's section_id to null
        $student->section_id = null;
        $student->save();

        return response()->json(['message' => 'Student removed successfully'], 200);
    }
}
