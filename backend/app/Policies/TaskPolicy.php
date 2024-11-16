<?php

namespace App\Policies;

use App\Models\Section;
use App\Models\Subject;
use App\Models\Task;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Http\Request;

class TaskPolicy
{

    public function create(User $user, Request $req): Response
    {
        if ($user->user_type !== 'T') return Response::deny('Unauthorized');

        $teacher = Teacher::where('id', $user->id)->first();
        $section = Section::where('id', $req->section_id)->first();

        if (!$section) return Response::deny('Unauthorized');

        $sub = Subject::where('section_id', $section->id)->first();

        if (!$sub) return Response::deny('Unauthorized');
        if ($sub->teacher_id !== $teacher->id) return Response::deny('Unauthorized');

        foreach ($section->subjects as $subject) {
            if ($subject === $sub->id) {
                return Response::allow();
            }
        }
        return Response::deny('Unauthorized');
    }

    public function modify(User $user, Task $task): Response
    {
        $subject = Subject::where('id', $task->subject_id)->first();
        if (!$subject) return Response::deny('Unauthorized');
        return $user->id === $subject->teacher_id
            ? Response::allow()
            : Response::deny('You do not own this task');
    }
}
