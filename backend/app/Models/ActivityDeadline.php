<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityDeadline extends Model
{
    /** @use HasFactory<\Database\Factories\ActivityDeadlineFactory> */
    use HasFactory;

    protected $fillable = [
        'activity_upload_id',
        'deadline'
    ];

    protected $casts = [
        'deadline' => 'datetime'
    ];
}
