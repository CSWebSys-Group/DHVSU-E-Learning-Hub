<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $table = 'course';

    protected $fillable = [
        'course_code',
        'course_name',
    ];

    //connects to section model
    public function section(){
        return $this->hasMany(Section::class, 'course_code');
    }
}
