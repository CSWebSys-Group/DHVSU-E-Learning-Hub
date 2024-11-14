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
            $table->enum('gender', ['M', 'F', 'Others']);
            $table->date('birthday');
            $table->unsignedBigInteger('section_id')->nullable();
            $table->json('tasks')->nullable();
            $table->json('grades')->nullable();
            $table->timestamps();

            $table->foreign('section_id')->references('id')->on('sections')->cascadeOnDelete();
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
