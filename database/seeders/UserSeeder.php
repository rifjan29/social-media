<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user_name = ['rifjan'];
        for ($i=0; $i < count($user_name) ; $i++) {
            $user = new User;
            $user->name = $user_name[$i];
            $user->username = '@'.$user_name[$i];
            $user->profile = 'public';
            $user->jenis_kelamin = 'l';
            $user->email = $user_name[$i].'@mail.com';
            $user->password = Hash::make('password');
            $user->save();
        }
    }
}
