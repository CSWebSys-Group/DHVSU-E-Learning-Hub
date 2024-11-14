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

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }

    /**
     * Accessor to format the birthday attribute as m-d-Y.
     */
    public function getBirthdayAttribute($value)
    {
        return Carbon::parse($value)->format('m-d-Y');
    }
}
