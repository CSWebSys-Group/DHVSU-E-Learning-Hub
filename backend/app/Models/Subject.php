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
        'teacher_id',
        'classroom_uploads'
    ];

    protected $casts = [
        'classroom_uploads' => 'array',
    ];

    public function section()
    {
        return $this->belongsTo(Section::class);
    }
}
