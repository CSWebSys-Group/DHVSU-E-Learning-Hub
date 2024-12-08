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
        'score',
        'submitted'
    ];

    protected $casts = [
        'student_id' => 'integer',
        'activity_upload_id' => 'integer',
        'score' => 'integer',
        'attachments' => 'array',
        'submitted' => 'boolean'
    ];
}
