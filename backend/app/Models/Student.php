<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    /** @use HasFactory<\Database\Factories\StudentFactory> */
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'fn',
        'ln',
        'gender',
        'birthday',
        'section_id',
        'tasks',
        'grades'
    ];

    protected $casts = [
        'tasks' => 'array',
        'grades' => 'array',
        'birthday' => 'date'
    ];

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    /**
     * Accessor to format the birthday attribute as m-d-Y.
     */
    public function getBirthdayAttribute($value)
    {
        return Carbon::parse($value)->format('m-d-Y');
    }
}
