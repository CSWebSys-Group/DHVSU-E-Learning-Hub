<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $table = 'subject';

    protected $fillable = [
        'subject_code',
        'name',
        'section_id'
    ];

    //connects to section model
    public function section()
    {
        return $this->belongsTo(Section::class, 'id');
    }

    public function task()
    {
        return $this->hasMany(Task::class, 'id');
    }

    public function teacher()
    {
        return $this->belongsToMany(Teacher::class, 'id');
    }
}
