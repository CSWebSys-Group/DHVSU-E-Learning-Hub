<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use App\Models\Section;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class SubjectController extends Controller implements HasMiddleware
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
        return response()->json(Subject::all(), 200);
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
        $user = User::where('id', Auth::id())->first();

        $authteacher = Teacher::where('id', $user->id)->first();

        // Only admins
        if (!$authteacher || !$authteacher->isAdmin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $fields = $request->validate([
            'subject_code' => 'required|string',
            'subject_name' => 'required|string',
            'section_id' => 'required|integer|exists:sections,id', // Ensure section_id exists
            'teacher_id' => 'required|integer|exists:teachers,id',  // Ensure teacher_id exists
            'type' => 'required|string|in:minor,major'
        ]);

        $section = Section::where('id', $request->section_id)->first();
        $assignedTeacher = Teacher::where('id', $request->teacher_id)->first();

        if (!$section) return response()->json(['message' => 'No section found'], 400);
        if (!$assignedTeacher) return response()->json(['message' => 'No teacher found'], 400);

        foreach ($section->subjects as $sectionSubject) {
            $currentSubject = Subject::where('id', $sectionSubject)->first();

            if ($currentSubject->subject_code === $request->subject_code || $currentSubject->subject_name === $request->subject_name) {
                return response()->json(['message' => 'Cannot have duplicate Subject Code or Subject Name in one section.'], 400);
            }
        }

        $subject = Subject::create($fields);

        $assignedTeacher_SUBJECTS = $assignedTeacher->subjects ?? [];
        $assignedTeacher_SUBJECTS[] = $subject->id;
        $assignedTeacher->subjects = $assignedTeacher_SUBJECTS;
        $assignedTeacher->save();

        $section_SUBJECTS = $section->subjects ?? [];
        $section_SUBJECTS[] = $subject->id;
        $section->subjects = $section_SUBJECTS;
        $section->save();

        return ['subject' => $subject];
    }

    /**
     * Display the specified resource.
     */
    public function show(Subject $subject)
    {
        return ['subject' => $subject];
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subject $subject)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubjectRequest $request, Subject $subject)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {
        //
    }

    public function addTeacher(Request $request, Subject $subject)
    {
        $user = User::where('id', Auth::id())->first();
        $teacher = Teacher::where('id', $user->id)->first();

        if ($user->user_type !== 'T' || !$teacher || !$teacher->isAdmin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'id' => 'required|integer'
        ]);

        $teacher = Teacher::where('id', $request->id)->first();

        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found'], 400);
        }

        if (in_array($subject->id, $teacher->subjects)) {
            return response()->json(['message' => 'Teacher is already in the subject'], 400);
        }

        $teacher->subjects[] = $subject->id;
        $teacher->save();

        return response()->json(['message' => 'Teacher added to subject successfully'], 200);
    }

    public function removeTeacher(Request $request, Subject $subject)
    {
        $user = User::where('id', Auth::id())->first();
        $teacher = Teacher::where('id', $user->id)->first();

        if ($user->user_type !== 'T' || !$teacher || !$teacher->isAdmin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'id' => 'required|integer'
        ]);

        $teacher = Teacher::where('id', $request->id)->first();

        if (!$teacher) {
            return response()->json(['message' => 'Teacher not found'], 400);
        }

        if (!in_array($subject->id, $teacher->subjects)) {
            return response()->json(['message' => 'Teacher is not in the subject'], 400);
        }

        $subject->teacher_id = null;
        $teacher->subjects = array_values(array_diff($teacher->subjects, [$subject->id]));

        $teacher->save();

        return response()->json(['message' => 'Teacher removed from subject successfully'], 200);
    }
}
