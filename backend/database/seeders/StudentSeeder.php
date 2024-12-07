<?php

namespace Database\Seeders;

use App\Models\Section;
use App\Models\Student;
use App\Models\User;
use App\Models\ValidIDs;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $valid_ids = ValidIDs::where('user_type', 'S')->get();
        $my_account_created = false;

        foreach ($valid_ids as $valid_id) {
            $studentExists = Student::where('id', $valid_id)->exists();
            $userExists = User::where('id', $valid_id)->exists();

            if (!$userExists && !$studentExists) {
                if (!$my_account_created) {
                    User::create([
                        'id' => $valid_id->id,
                        'email' => '2022315212@dhvsu.edu.ph',
                        'user_type' => 'S',
                        'password' => Hash::make('1234567!A')
                    ]);

                    $student = Student::create([
                        'id' => $valid_id->id,
                        'gender' => 'M',
                        'fn' => "John Patrick",
                        'ln' => 'Mercado',
                        'activities' => []
                    ]);

                    $my_account_created = true;
                } else {
                    User::create([
                        'id' => $valid_id->id,
                        'email' => $valid_id->id . '@dhvsu.edu.ph',
                        'user_type' => 'S',
                        'password' => Hash::make(env('FIRST_ADMIN_PASSWORD'))
                    ]);

                    $student = Student::create([
                        'id' => $valid_id->id,
                        'gender' => ['M', 'F'][array_rand(['M', 'F'])],
                        'fn' => fake()->firstName,
                        'ln' => fake()->lastName,
                        'section_id' => fake()->numberBetween(1, 9),
                        'activities' => []
                    ]);

                    $section = Section::where('id', $student->section_id)->first();

                    $students_section = $section->students ?? [];
                    $students_section[] = $student->id;
                    $section->students = $students_section;
                    $section->save();
                }
            }
        }
    }
}
