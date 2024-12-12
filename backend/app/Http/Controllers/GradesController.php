<?php

namespace App\Http\Controllers;

use App\Models\Grades;
use App\Http\Requests\StoreGradesRequest;
use App\Http\Requests\UpdateGradesRequest;
use App\Models\AuditLog;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class GradesController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show', 'getStudentGrades'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Grades::all(), 200);
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
    public function store(StoreGradesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Grades $grades)
    {
        return ['grade' => $grades];
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Grades $grades)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGradesRequest $request, Grades $grades)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Grades $grades)
    {
        //
    }

    public function getStudentGrades(Request $request)
    {
        $request->validate(['id' => 'required|integer']);

        $student = Student::where('id', $request->id)->first();

        if (!$student) {
            return response()->json(['message' => 'Student not found', 400]);
        }

        $studentGrades = Grades::where('student_id', $student->id)->get();

        return ['studentGrades' => $studentGrades];
    }

    public function findStudentGrade(Request $request)
    {
        $request->validate([
            'student_id' => 'required|integer',
            'subject_id' => 'required|integer'
        ]);

        $grade = Grades::where('student_id', $request->student_id)->where('subject_id', $request->subject_id)->first();

        if (!$grade) {
            return response()->json(['grade' => null], 200); // Explicitly return a grade key
        }

        return response()->json(['grade' => $grade], 200);
    }

    public function gradeStudent(Request $request)
    {
        $user = User::where('id', Auth::user()->id)->first();
        $teacher = Teacher::where('id', $user->id)->first();

        $request->validate([
            'subject_id' => 'required|integer|exists:subjects,id',
            'grade' => [
                'required',
                'regex:/^\d+(\.\d{1})?$/', // Ensure exactly one decimal place
            ],
            'student_id' => 'required|integer|exists:students,id',
        ], [
            'grade.regex' => 'The grade must be a number with exactly one decimal place.',
        ]);

        $subject = Subject::where('id', $request->subject_id)->first();
        if (!$subject) return response()->json(['message' => 'Subject not found'], 400);

        if (!$teacher->isAdmin && $subject->teacher_id !== $teacher->id) return response()->json(['message' => 'Unauthorized'], 400);

        $student = Student::where('id', $request->student_id)->first();
        if (!$student) return response()->json(['message' => 'Student not found'], 400);

        $studentGradeIds = $student->grades ?? [];

        foreach ($studentGradeIds as $gradeID) {
            $student_grade = Grades::where('id', $gradeID)->first();

            if ($student_grade->subject_id === $subject->id) return response()->json(['message' => 'Already graded'], 400);
        }

        $grade = Grades::create([
            'subject_id' => $subject->id,
            'student_id' => $student->id,
            'grade' => $request->grade
        ]);

        $studentGradeIds[] = $grade->id;
        $student->grades = $studentGradeIds;
        $student->save();

        AuditLog::create([
            'description' => "{$teacher->fn} {$teacher->ln} with ID: {$user->id} graded student: {$student->fn} {$student->ln} on subject {$subject->subject_code}.",
            "user_type" => "A"
        ]);

        return ['grade' => $grade];
    }
}
