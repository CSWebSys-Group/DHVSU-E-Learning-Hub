<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

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
     */
    public function index()
    {
        return Task::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // First, validate the basic fields
        $fields = $request->validate([
            'task_name' => 'required|string|max:255',
            'type' => 'required|string|in:act,assessment,exam',
            'total_score' => 'required|integer|min:1',
            'subject_id' => 'required|integer',

            // `tests` base validation (array required)
            'tests' => 'required|array',
        ]);

        $subject = Subject::find($fields["subject_id"]);
        if (!$subject || !$subject->teacher_id || Auth::id() !== $subject->teacher_id) {
            return response()->json(['message' => "Unauthorized."]);
        }

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

        // Create the task
        $task = Task::create($fields);

        // Update the tasks array in the subject
        $currentTasks = $subject->tasks ?? []; // Get the existing tasks (or an empty array if null)
        $updatedTasks = array_merge($currentTasks, [$task->id]); // Add the new task ID
        $subject->tasks = $updatedTasks; // Update the tasks field
        $subject->save(); // Save the changes to the database

        return response()->json(['task' => $task], 201);
    }

    /**
     * Display the specified resource.
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
        // First, validate the basic fields
        $fields = $request->validate([
            'task_name' => 'required|string|max:255',
            'type' => 'required|string|in:act,assessment,exam',
            'total_score' => 'required|integer|min:1',

            // `tests` base validation (array required)
            'tests' => 'required|array',
        ]);

        $subject = Subject::find($task->subject_id);
        if (!$subject || !$subject->teacher_id || Auth::id() !== $subject->teacher_id) {
            return response()->json(['message' => "Unauthorized."]);
        }

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
        $subject = Subject::find($task->subject_id);

        if (!$subject || !$subject->teacher_id || Auth::id() !== $subject->teacher_id) {
            return response()->json(['message' => "Unauthorized."]);
        }

        // Remove the task ID from the subject's tasks array
        $currentTasks = $subject->tasks ?? [];
        $updatedTasks = array_filter($currentTasks, fn($taskId) => $taskId !== $task->id); // Exclude the deleted task ID
        $subject->tasks = array_values($updatedTasks); // Re-index the array
        $subject->save();

        $task->delete();

        return response()->json(['message' => 'Task deleted and removed from subject'], 200);
    }
}
