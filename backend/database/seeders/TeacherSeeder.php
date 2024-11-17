<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Teacher;
use App\Models\User;
use App\Models\ValidIDs;
use Illuminate\Support\Facades\Hash;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $valid_ids = ValidIDs::where('user_type', 'T')->get();
        $non_admin_teacher_initialized = false;

        foreach ($valid_ids as $valid_id) {
            if (!$non_admin_teacher_initialized) {
                $teacherExists = Teacher::where('id', $valid_id->id)->exists();
                $userExists = User::where('id', $valid_id->id)->exists();

                if (!$teacherExists && !$userExists) {
                    User::create([
                        'id' => $valid_id->id,
                        'email' => "sirjm@dhvsu.edu.ph",
                        'user_type' => "T",
                        'password' => Hash::make(env('FIRST_ADMIN_PASSWORD'))
                    ]);

                    Teacher::create([
                        'id' => $valid_id->id,
                        'fn' => "John Mark",
                        'ln' => "Policarpio",
                        'birthday' => '2001-01-01',
                        'gender' => 'M',
                        'isAdmin' => false,
                        'subjects' => []
                    ]);

                    $non_admin_teacher_initialized = true;
                }
            }
        }
    }
}
