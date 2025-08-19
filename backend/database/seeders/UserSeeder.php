<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOnCreate(
            ['email' => 'teste@gmail.com'],
            [
                'name' => 'Victor Ramos',
                'password' => Hash::make('123456'),
            ]
        );
    }
}
