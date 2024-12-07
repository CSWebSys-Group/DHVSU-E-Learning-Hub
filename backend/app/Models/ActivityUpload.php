<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityUpload extends Model
{
    /** @use HasFactory<\Database\Factories\ActivityUploadFactory> */
    use HasFactory;

    protected $fillable = [
        'id',
        'title',
        'description',
        'attachments',
        'total_score',
        'deadline_id'
    ];

    protected $casts = [
        'attachments' => 'array',
        'total_score' => 'integer',
        'deadline_id' => 'integer'
    ];
}
