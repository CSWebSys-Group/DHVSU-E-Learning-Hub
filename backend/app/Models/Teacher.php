<?php

namespace App\Models;

use Carbon\Carbon;
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
        'isAdmin',
        'profile_picture'
    ];

    protected $casts = [
        'subjects' => 'array',
        'isAdmin' => 'boolean',
        'birthday' => 'date'
    ];

    public function getBirthdayAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d');
    }
}
