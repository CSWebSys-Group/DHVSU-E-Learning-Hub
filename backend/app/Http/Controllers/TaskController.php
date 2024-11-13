<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class TaskController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

    /**
     * Display a listing of the resource.
     * GET all
     */
    public function index()
    {
        return Task::all();
    }

    /**
     * Store a newly created resource in storage.
     * POST / create
     */
    public function store(Request $request)
    {
        // First, validate the basic fields
        $fields = $request->validate([
            'task_name' => 'required|string|max:255',
            'student_id' => 'nullable|integer',
            'score' => 'nullable|integer|min:0',
            'type' => 'required|string|in:act,assessment,exam',
            'total_score' => 'required|integer|min:1',
            'subject_code' => 'required|string',

            // `tests` base validation (array required)
            'tests' => 'required|array',
        ]);

        // Now, validate the nested `tests` field based on type
        $type = $request->input('type');
        $tests = $request->input('tests');

        // Custom validation for 'tests' based on `type`
        foreach ($tests as $index => $testGroup) {
            foreach ($testGroup as $questionIndex => $question) {
                // `act` or `exam`: Validate structure of the question
                if (in_array($type, ['act', 'exam'])) {
                    // Validate each question has required keys
                    $requiredKeys = ['q', 'a', 'choices', 'points'];
                    foreach ($requiredKeys as $key) {
                        if (!array_key_exists($key, $question)) {
                            return response()->json(['error' => "Each question in 'tests[{$index}][{$questionIndex}]' must include '{$key}'."]);
                        }
                    }

                    // Validate correct types
                    if (
                        !is_string($question['q']) || !is_string($question['a']) ||
                        !is_array($question['choices']) || !is_int($question['points'])
                    ) {
                        return response()->json(['error' => "Invalid format for question in 'tests[{$index}][{$questionIndex}]'."]);
                    }

                    // Ensure at least 2 choices
                    if (count($question['choices']) < 2) {
                        return response()->json(['error' => "Question {$questionIndex} in 'tests[{$index}]' must have at least two choices."]);
                    }
                }

                // `assessment`: Ensure each test is a valid URL
                if ($type === 'assessment' && !is_string($question)) {
                    return response()->json(['error' => "Each test in 'tests[{$index}]' must be a valid URL for 'assessment' type."]);
                }
            }
        }

        // Ensure authenticated user
        $user = Student::where('id', $request->user()->id)->first();
        if (!$user) {
            return response()->json(['error' => 'Student not found.'], 404);
        }

        $fields['student_id'] = $user->id;
        $task = $user->tasks()->create($fields);

        // Add the new `task_id` to the student's `tasks` array
        $user->tasks = array_merge($user->tasks ?? [], [$task->id]);
        $user->save();
        return response()->json(['task' => $task], 201);
    }

    /**
     * Display the specified resource.
     * GET specific row
     */
    public function show(Task $task)
    {
        return ['task' => $task];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        Gate::authorize('modify', $task);

        // First, validate the basic fields
        $fields = $request->validate([
            'task_name' => 'required|string|max:255',
            'score' => 'nullable|integer|min:0',
            'type' => 'required|string|in:act,assessment,exam',
            'total_score' => 'required|integer|min:1',
            'subject_code' => 'required|string',

            // `tests` base validation (array required)
            'tests' => 'required|array',
        ]);

        // Now, validate the nested `tests` field based on type
        $type = $request->input('type');
        $tests = $request->input('tests');

        // Custom validation for 'tests' based on `type`
        foreach ($tests as $index => $testGroup) {
            foreach ($testGroup as $questionIndex => $question) {
                // `act` or `exam`: Validate structure of the question
                if (in_array($type, ['act', 'exam'])) {
                    // Validate each question has required keys
                    $requiredKeys = ['q', 'a', 'choices', 'points'];
                    foreach ($requiredKeys as $key) {
                        if (!array_key_exists($key, $question)) {
                            return response()->json(['error' => "Each question in 'tests[{$index}][{$questionIndex}]' must include '{$key}'."]);
                        }
                    }

                    // Validate correct types
                    if (
                        !is_string($question['q']) || !is_string($question['a']) ||
                        !is_array($question['choices']) || !is_int($question['points'])
                    ) {
                        return response()->json(['error' => "Invalid format for question in 'tests[{$index}][{$questionIndex}]'."]);
                    }

                    // Ensure at least 2 choices
                    if (count($question['choices']) < 2) {
                        return response()->json(['error' => "Question {$questionIndex} in 'tests[{$index}]' must have at least two choices."]);
                    }
                }

                // `assessment`: Ensure each test is a valid URL
                if ($type === 'assessment' && !is_string($question)) {
                    return response()->json(['error' => "Each test in 'tests[{$index}]' must be a valid URL for 'assessment' type."]);
                }
            }
        }

        $task->update($fields);

        return ['task' => $task];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        Gate::authorize('modify', $task);

        $student = Student::where('id', $task->student_id)->first();

        if (!$student) {
            return response()->json(['error' => 'Student not found'], 404);
        }

        // Remove the task ID from the student's tasks array
        $student->tasks = array_filter(
            $student->tasks ?? [],
            fn($taskId) => $taskId !== $task->id
        );
        $student->save(); // Save the updated student record

        // Delete the task from the tasks table
        $task->delete();

        return response()->json(['message' => 'Task deleted and removed from student'], 200);
    }
}

// public function assignTaskToSection(Request $request, $taskId, $sectionId)
// {
//     // Validate that the section exists
//     $section = Section::findOrFail($sectionId);

//     // Get all students in the section (assuming students are associated with sections)
//     $students = $section->students; // Adjust if you have a relationship or method to get students

//     // Retrieve the task by ID
//     $task = Task::findOrFail($taskId);

//     // Iterate through each student and assign the task
//     foreach ($students as $student) {
//         // Ensure the task is assigned to the student (you might have additional logic)
//         $task->students()->attach($student->id); // This assumes a many-to-many relationship
//     }

//     return response()->json(['message' => 'Task assigned to all students in the section']);

        //for routes
        // Route::post('/tasks/{taskId}/assign-to-section/{sectionId}', [TaskController::class, 'assignTaskToSection']);
// }