<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = [
            'BSCS' => 'Bachelor of Science in Computer Science',
            'BSIT' => 'Bachelor of Science in Information Technology',
            'BSIS' => 'Bachelor of Science in Information Systems'
        ];

        foreach ($courses as $code => $name) {
            Course::create([
                'course_code' => $code,
                'course_name' => $name,
            ]);
        }
    }
}
