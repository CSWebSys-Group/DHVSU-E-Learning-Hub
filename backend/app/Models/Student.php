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
        'id',
        'fn',
        'ln',
        'gender',
        'birthday',
        'section_id',
        'activities',
        'grades',
        'profile_picture',
        'middle_name',
        'ext_name',
        'place_of_birth',
        'civil_status',
        'nationality',
        'religion',
        'contact_number',
        'height',
        'weight',
        'blood_type',
        'address',
        'province',
        'city',
        'barangay',
        'zip_code'
    ];

    protected $casts = [
        'activities' => 'array',
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
        return Carbon::parse($value)->format('Y-m-d');
    }
}
