<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Public routes
Route::post('/register-student', [AuthController::class, 'registerStudent']);
Route::post('/register-teacher', [AuthController::class, 'registerTeacher']);
Route::post('/login', [AuthController::class, 'login']);


// Protected routes
Route::middleware('auth:api')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
