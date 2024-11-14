<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
    use HasFactory;

    protected $primaryKey = 'id';

    protected $fillable = [
        'course_code',
        'course_name'
    ];

    public function sections()
    {
        return $this->hasMany(Section::class);
    }
}
