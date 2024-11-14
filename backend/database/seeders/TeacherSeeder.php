<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Teacher;


class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Teacher::create([
            'id' => 3992156069,
            'fn' => 'John Mark',
            'ln' => 'Policarpio',
            'isAdmin' => 1,
            'subjects' => json_encode([]),
            'birthday' => '1990-01-01',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
    }
}