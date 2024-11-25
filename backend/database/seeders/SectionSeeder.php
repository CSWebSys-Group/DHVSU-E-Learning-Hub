<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Section;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = Course::all();

        foreach ($courses as $course) {
            // Define the section suffixes
            $suffixes = ['A', 'B', 'C'];
            foreach ($suffixes as $suffix) {
                Section::create([
                    'year' => 3, // Assuming year 3, adjust as needed
                    'course_id' => $course->id,
                    'students' => json_encode([]), // Start with an empty student list
                    'subjects' => json_encode([]), // Start with an empty subject list
                    'name' => '3' . $suffix, // Section name like '3A', '3B', '3C'
                ]);
            }
        }
    }
}
