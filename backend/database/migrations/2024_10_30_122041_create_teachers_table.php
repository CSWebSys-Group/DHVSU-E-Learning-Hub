<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->string('fn');
            $table->string('ln');
            $table->json('activities')->nullable(); // Array for activities (JSON format)
            $table->json('assessment')->nullable(); // Array for assessments (JSON format)
            $table->json('subjects')->nullable(); // Array for subjects (JSON format)
            $table->string('email')->unique();
            $table->string('password');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
