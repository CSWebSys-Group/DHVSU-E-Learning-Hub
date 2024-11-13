<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'fn',
        'ln',
        'section_id',
        'tasks',
        'grades'
    ];

    protected $casts = [
        'tasks' => 'array',
        'grades' => 'array',
    ];

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
