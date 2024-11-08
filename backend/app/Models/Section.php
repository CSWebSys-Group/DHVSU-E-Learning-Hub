<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    protected $table = 'section';

    protected $fillable = [
        'year',
        'course_code',
        'students',
        'subjects',
        'adviser_id'
    ];

    protected $casts = [
        'students' => 'array',
        'subjects' => 'array'
    ];
}
