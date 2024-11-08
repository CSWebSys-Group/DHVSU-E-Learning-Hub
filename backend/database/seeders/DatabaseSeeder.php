<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StudentIDs;
use App\Models\TeacherIDs;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $initialStudentIDs = [
            ['id' => 1001],
            ['id' => 1002],
            ['id' => 1003],
        ];

        $initialTeacherIDs = [
            ['id' => 2001],
            ['id' => 2002],
            ['id' => 2003],
        ];

        foreach ($initialStudentIDs as $studentID) {
            StudentIDs::create($studentID);
        }

        foreach ($initialTeacherIDs as $teacherID) {
            TeacherIDs::create($teacherID);
        }
    }
}
