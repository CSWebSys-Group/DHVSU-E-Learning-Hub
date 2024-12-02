<?php

namespace Database\Seeders;

use App\Models\Section;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'sirjm@dhvsu.edu.ph')->first();

        $teacher = Teacher::where('id', $user->id)->first();

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

            // Track all subjects for the current section
            $sectionSubjectIds = [];

            // Check if subjects exist for the current year
            if (isset($subjectsByYear[$year])) {
                $yearSubjects = $subjectsByYear[$year]; // Get subjects for the current year

                // Track subject IDs for the teacher
                $teacherSubjectIds = [];
                $sectionSubjectIds = [];

                // Loop through the core subjects and assign them to the section
                foreach ($yearSubjects['core'] as $code => $name) {
                    $subject = Subject::create([
                        'subject_code' => $code,
                        'subject_name' => $name,
                        'teacher_id' => $section->course_id === 1 ? $teacher->id : null,
                        'section_id' => $section->id,
                        'classroom_uploads' => [], // Initialize with an empty task array
                        'type' => 'core', // Mark it as a core subject
                    ]);

                    // Add the subject ID to the teacher's array if applicable
                    if ($section->course_id === 1) {
                        $teacherSubjectIds[] = $subject->id;
                    }
                    // Add the created subject ID to the section's subject array
                    $sectionSubjectIds[] = $subject->id;
                }

                // Loop through the minor subjects and assign them to the section
                foreach ($yearSubjects['minor'] as $code => $name) {
                    $subject = Subject::create([
                        'subject_code' => $code,
                        'subject_name' => $name,
                        'section_id' => $section->id,
                        'classroom_uploads' => [], // Initialize with an empty task array
                        'type' => 'minor', // Mark it as a minor subject
                    ]);

                    // Add the created subject ID to the section's subject array
                    $sectionSubjectIds[] = $subject->id;
                }

                // Update the section's subjects attribute
                if (!empty($sectionSubjectIds)) {
                    $existingSectionSubjects = $section->subjects;

                    // Ensure $existingSectionSubjects is decoded properly
                    if (is_string($existingSectionSubjects)) {
                        $existingSectionSubjects = json_decode($existingSectionSubjects, true);
                    }

                    // Ensure we are working with an array
                    $existingSectionSubjects = is_array($existingSectionSubjects) ? $existingSectionSubjects : [];

                    // Merge new subjects with existing ones and remove duplicates
                    $section->subjects = array_merge($existingSectionSubjects, $sectionSubjectIds);

                    // Save the updated section record
                    $section->save();
                }

                // Update the teacher's subjects array in the database
                if (!empty($teacherSubjectIds)) {
                    $existingSubjects = $teacher->subjects;

                    // Ensure $existingSubjects is decoded properly
                    if (is_string($existingSubjects)) {
                        $existingSubjects = json_decode($existingSubjects, true);
                    }

                    // Ensure we are working with an array
                    $existingSubjects = is_array($existingSubjects) ? $existingSubjects : [];

                    // Merge new subjects with existing ones
                    $teacher->subjects = array_merge($existingSubjects, $teacherSubjectIds);

                    // Save the updated teacher record
                    $teacher->save();
                }
            }
        }
    }
}
