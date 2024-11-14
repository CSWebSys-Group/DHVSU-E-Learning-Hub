<?php

namespace Database\Seeders;

use App\Models\Section;
use App\Models\Subject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define subjects for each year level
        $subjectsByYear = [
            '1' => [ // Year 1 subjects
                'core' => [
                    'CS101' => 'Introduction to Computer Science',
                    'CS102' => 'Programming Fundamentals',
                    'MATH101' => 'Calculus I',
                    'PHYS101' => 'Physics I',
                    'ENG101' => 'English Communication',
                ],
                'minor' => [
                    'PE101' => 'Physical Education I',
                    'NSTP101' => 'National Service Training Program I',
                ],
            ],
            '2' => [ // Year 2 subjects
                'core' => [
                    'CS201' => 'Data Structures',
                    'CS202' => 'Discrete Mathematics',
                    'CS203' => 'Computer Architecture',
                    'MATH201' => 'Linear Algebra',
                    'CS204' => 'Object-Oriented Programming',
                ],
                'minor' => [
                    'PE201' => 'Physical Education II',
                    'NSTP201' => 'National Service Training Program II',
                ],
            ],
            '3' => [ // Year 3 subjects
                'core' => [
                    'CSAC 313' => 'Algorithms and Complexity',
                    'CSOS 313' => 'Operating Systems',
                    'CSSE 313' => 'Software Engineering',
                    'CSWEBYS 313' => 'Web Systems and Technologies',
                    'CSIAS 313' => 'Information Assurance and Security',
                ],
                'minor' => [
                    'CS301' => 'Ethics in Computing',
                    'GE301' => 'General Education Subject I',
                ],
            ],
            '4' => [ // Year 4 subjects
                'core' => [
                    'CSAC 414' => 'Advanced Algorithms',
                    'CSOS 414' => 'Advanced Operating Systems',
                    'CSSE 414' => 'Software Architecture',
                    'CSWEBYS 414' => 'Advanced Web Systems',
                    'CSIAS 414' => 'Network Security and Cryptography',
                ],
                'minor' => [
                    'CS401' => 'Professional Development in Computing',
                    'GE401' => 'General Education Subject II',
                ],
            ],
        ];

            // Get all sections
            $sections = Section::all();

            // Loop through each section
            foreach ($sections as $section) {
                $year = $section->year; // Get the year of the section
    
                // Check if subjects exist for the current year
                if (isset($subjectsByYear[$year])) {
                    $yearSubjects = $subjectsByYear[$year]; // Get subjects for the current year
    
                    // Loop through the core subjects and assign them to the section
                    foreach ($yearSubjects['core'] as $code => $name) {
                        Subject::create([
                            'subject_code' => $code,
                            'subject_name' => $name,
                            'section_id' => $section->id,
                            'tasks' => json_encode([]), // Initialize with an empty task array
                            'type' => 'core', // Mark it as a core subject
                        ]);
                    }
    
                    // Loop through the minor subjects and assign them to the section
                    foreach ($yearSubjects['minor'] as $code => $name) {
                        Subject::create([
                            'subject_code' => $code,
                            'subject_name' => $name,
                            'section_id' => $section->id,
                            'tasks' => json_encode([]), // Initialize with an empty task array
                            'type' => 'minor', // Mark it as a minor subject
                        ]);
                    }
                }
            }
        }
    }