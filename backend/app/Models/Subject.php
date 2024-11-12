<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $primaryKey = 'subject_code';
    public $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'subject_code',
        'subject_name',
        'section_id',
        'tasks'
    ];

    public function section()
    {
        return $this->belongsTo(Section::class);
    }
}
