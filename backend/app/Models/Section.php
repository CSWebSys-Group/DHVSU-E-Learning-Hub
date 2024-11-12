<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'year',
        'course_id',
        'students',
        'subjects',
        'adviser_id',
    ];

    protected $casts = [
        'students' => 'array',
        'subjects' => 'array'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function adviser()
    {
        return $this->belongsTo(Teacher::class, 'adviser_id');
    }
}
