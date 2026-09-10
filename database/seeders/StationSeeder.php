<?php

namespace Database\Seeders;

use App\Models\Station;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StationSeeder extends Seeder
{
    public function run(): void
    {
        $data = json_decode(file_get_contents(database_path('seeders/data/stations.json')), true, 512, JSON_THROW_ON_ERROR);

        DB::transaction(function () use ($data) {
            foreach ($data['schools'] as $school) {
                // School codes can repeat; identify each school by its type and name.
                Station::updateOrCreate(
                    ['type' => 'school', 'name' => $school['name']],
                    ['school_code' => $school['school_code']],
                );
            }

            foreach ($data['sdo_units'] as $unit) {
                Station::firstOrCreate(['type' => 'sdo_office', 'name' => $unit], ['school_code' => null]);
            }
        });

        $this->command?->info('Seeded '.count($data['schools']).' schools and '.count($data['sdo_units']).' SDO units. StationSeeder only seeds stations; account creation is handled by DatabaseSeeder.');
    }
}
