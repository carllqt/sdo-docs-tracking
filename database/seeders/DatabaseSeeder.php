<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Station;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        DB::transaction(function () {
            $this->call([RoleSeeder::class, StationSeeder::class]);
            $password = Hash::make('password');

            foreach (Station::orderBy('id')->get() as $station) {
                // Station IDs remain stable even when names or school codes are corrected.
                $user = User::firstOrCreate(
                    ['email' => "station-{$station->id}@example.com"],
                    ['name' => $station->name, 'email_verified_at' => now(), 'password' => $password],
                );
                $user->syncRoles(['employee']);

                Employee::firstOrCreate(
                    ['user_id' => $user->id],
                    [
                        'station_id' => $station->id,
                        'first_name' => $station->name,
                        'middle_name' => null,
                        'last_name' => 'Employee',
                    ],
                );
            }

            $admin = User::firstOrCreate(
                ['email' => 'admin@example.com'],
                ['name' => 'Admin Admin', 'email_verified_at' => now(), 'password' => $password],
            );
            $admin->syncRoles(['admin']);

            Employee::firstOrCreate(
                ['user_id' => $admin->id],
                [
                    'station_id' => Station::where('type', 'sdo_office')->where('name', 'Administrative Unit')->firstOrFail()->id,
                    'first_name' => 'Admin',
                    'middle_name' => null,
                    'last_name' => 'Admin',
                ],
            );
        });
    }
}
