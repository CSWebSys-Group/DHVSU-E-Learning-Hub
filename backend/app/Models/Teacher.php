<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    /** @use HasFactory<\Database\Factories\TeacherFactory> */
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'fn',
        'ln',
        'subjects',
        'gender',
        'birthday',
        'isAdmin'
    ];

    protected $casts = [
        'subjects' => 'array',
        'isAdmin' => 'boolean',
        'birthday' => 'date'
    ];

    public function formattedBirthday()
    {
        return $this->birthday ? $this->birthday->format('m-d-Y') : null;
    }
}
