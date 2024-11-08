<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Student extends Authenticable implements JWTSubject
{
    use HasFactory, Notifiable;

    // Required methods for JWTSubject
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    protected $table = 'students';

    protected $fillable = [
        'id',
        'fn',
        'ln',
        'section_id',
        'tasks',
        'grades',
        'email',
        'password'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Cast JSON fields to array automatically
    protected $casts = [
        'activities' => 'array',
        'assessment' => 'array',
        'grades' => 'array',
        'password' => 'hashed'
    ];

    //connects to section model
    public function section()
    {
        return $this->belongsTo(Section::class, 'course_code');
    }

    public function task()
    {
        return $this->hasMany(Task::class, 'id');
    }
}
