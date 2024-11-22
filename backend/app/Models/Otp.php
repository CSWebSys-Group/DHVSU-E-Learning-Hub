<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Otp extends Model
{
    use HasFactory;

    // Define the table name (optional, if it is different from the default plural form)
    protected $table = 'otps';

    // Define which fields are mass assignable
    protected $fillable = [
        'email',
        'otp',
        'expires_at',
    ];

    // Ensure the 'expires_at' field is cast to a Carbon instance
    protected $dates = [
        'expires_at',
    ];

    // Prevent automatic timestamps if not needed
    public $timestamps = true;
}
