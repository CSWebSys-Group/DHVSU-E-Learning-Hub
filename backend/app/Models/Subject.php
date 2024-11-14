<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    /** @use HasFactory<\Database\Factories\SubjectFactory> */
    use HasFactory;

    protected $fillable = [
        'subject_code',
        'subject_name',
        'section_id',
        'tasks'
    ];

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}
