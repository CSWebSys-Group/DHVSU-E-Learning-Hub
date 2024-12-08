<?php

namespace App\Http\Controllers;

use App\Models\Grades;
use App\Http\Requests\StoreGradesRequest;
use App\Http\Requests\UpdateGradesRequest;
use App\Models\Student;
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

    public function gradeStudent(Request $request)
    {
        $user = User::where('id', Auth::id())->first();
        $teacher = Teacher::where('id', $user->id)->first();

        $request->validate([
            'subject_id' => 'required|integer|exists:subjects,id',
            'grade' => [
                'required',
                'regex:/^\d+(\.\d{1})?$/', // Ensure exactly one decimal place
            ],
            'student_id' => 'required|integer',
        ], [
            'grade.regex' => 'The grade must be a number with exactly one decimal place.',
        ]);
    }
}
