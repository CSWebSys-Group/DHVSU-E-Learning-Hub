<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    protected $fillable = [
        'task_name',
        'tests',
        'type',
        'total_score',
        'subject_id',
        'deadline'
    ];

    protected $casts = [
        'tests' => 'array',
        'deadline' => 'datetime',
    ];
}
