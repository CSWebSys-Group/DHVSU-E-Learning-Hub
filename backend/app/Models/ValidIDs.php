<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ValidIDs extends Model
{
    /** @use HasFactory<\Database\Factories\ValidIDsFactory> */
    use HasFactory;

    protected $fillable = [
        'id',
        'user_type'
    ];
}
