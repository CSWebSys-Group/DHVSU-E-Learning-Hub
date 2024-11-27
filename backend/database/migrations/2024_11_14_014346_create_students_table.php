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
            $table->string('middle_name')->nullable();
            $table->string('ext_name')->nullable();
            $table->enum('gender', ['M', 'F', 'Others'])->nullable();
            $table->date('birthday')->nullable();
            $table->string('place_of_birth')->nullable();
            $table->enum('civil_status', ['single', 'married', 'widowed'])->nullable();
            $table->string('nationality')->nullable();
            $table->string('religion')->nullable();
            $table->string('contact_number')->nullable();
            $table->integer('height')->nullable();
            $table->integer('weight')->nullable();
            $table->string('blood_type')->nullable();
            $table->string('address')->nullable();
            $table->string('province')->nullable();
            $table->string('city')->nullable();
            $table->string('barangay')->nullable();
            $table->integer('zip_code')->nullable();
            $table->string('profile_picture')->nullable();
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
