<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'task';

    protected $fillable = [
        'task_name',
        'tests',
        'student_id',
        'score',
        'type',
        'total_score',
        'subject_code'
    ];

    protected $casts = [
        'tests' => 'array'
    ];
}
