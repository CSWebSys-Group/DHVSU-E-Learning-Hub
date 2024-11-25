<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassroomUpload extends Model
{
    /** @use HasFactory<\Database\Factories\ClassroomUploadFactory> */
    use HasFactory;

    protected $fillable = [
        'type',
        'subject_id'
    ];
}
