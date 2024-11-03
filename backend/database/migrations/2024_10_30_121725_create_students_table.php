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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('fn');
            $table->string('ln');
            $table->unsignedBigInteger('section_id')->nullable();
            $table->json('activities')->nullable(); // Array for activities (JSON format)
            $table->json('assessment')->nullable(); // Array for assessments (JSON format)
            $table->json('grades')->nullable();    // Array of objects for grades (JSON format)
            $table->string('email')->unique();
            $table->string('password');

            // Optional: add timestamps
            $table->timestamps();

            // Foreign key to sections table (if it exists)
            // $table->foreign('section_id')->references('id')->on('sections')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
