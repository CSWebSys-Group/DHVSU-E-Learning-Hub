<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StudentIDs;

// php artisan db:seed --class=StudentIDsSeeder

class StudentIDsSeeder extends Seeder
{
    public function run()
    {
        $initialStudentIDs = [
            ['id' => 1001],
            ['id' => 1002],
            ['id' => 1003],
        ];

        foreach ($initialStudentIDs as $studentID) {
            StudentIDs::create($studentID);
        }
    }
}
