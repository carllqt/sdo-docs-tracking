<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Station;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         $this->call(RoleSeeder::class);
        $station = Station::updateOrCreate(
            ['name' => 'Administrative Office'],
            [
                'type' => 'sdo_office',
                'school_code' => null,
            ],
        );

        $user = User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin Admin',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
            ],
        );

        // Assign Spatie role
        $user->syncRoles(['admin']);

        Employee::updateOrCreate(
            ['user_id' => $user->id],
            [
                'station_id' => $station->id,
                'first_name' => 'Admin',
                'middle_name' => null,
                'last_name' => 'Admin',
            ],
        );
    }
}