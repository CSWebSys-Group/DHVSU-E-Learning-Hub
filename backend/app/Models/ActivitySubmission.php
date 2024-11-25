<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivitySubmission extends Model
{
    /** @use HasFactory<\Database\Factories\ActivitySubmissionFactory> */
    use HasFactory;

    protected $fillable = [
        'student_id',
        'activity_upload_id',
        'attachments',
        'description',
        'score',
        'submitted'
    ];

    protected $casts = [
        'attachments' => 'array',
        'submitted' => 'boolean'
    ];
}
