<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grades extends Model
{
    /** @use HasFactory<\Database\Factories\GradesFactory> */
    use HasFactory;

    protected $fillable = [
        'student_id',
        'subject_code',
        'grade'
    ];

    protected $casts = [
        'grade' => 'float',
    ];
}
