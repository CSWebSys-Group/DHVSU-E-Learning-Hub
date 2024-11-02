<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TeacherIDs;

class TeacherIDsSeeder extends Seeder
{
    public function run()
    {
        $initialTeacherIDs = [
            ['id' => 2001],
            ['id' => 2002],
            ['id' => 2003],
        ];

        foreach ($initialTeacherIDs as $teacherID) {
            TeacherIDs::create($teacherID);
        }
    }
}
