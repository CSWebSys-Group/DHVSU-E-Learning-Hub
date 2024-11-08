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
    ];

    protected $casts = [
        'students' => 'array',
        'subjects' => 'array'
    ];

    //connects to course model
    public function course()
    {
        return $this->belongsTo(Course::class, 'course_code');
    }
    //connects to student model
    public function student()
    {
        return $this->hasMany(Student::class, 'id');
    }
    //connects to subject model
    public function subject()
    {
        return $this->hasMany(Subject::class, 'subject_code');
    }
}
