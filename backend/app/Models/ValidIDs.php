<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ValidIDs extends Model
{
    protected $fillable = [
        'id',
        'user_type'
    ];
}
