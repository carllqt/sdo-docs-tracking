<?php

use App\Models\Document;
use App\Models\Employee;
use App\Models\Station;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Inertia\Testing\AssertableInertia as Assert;

it('routes a new document to an SDO office with server-owned sender details', function () {
    $school = Station::create(['name' => 'School', 'type' => 'school']);
    $office = Station::create(['name' => 'SDO Office', 'type' => 'sdo_office']);
    $user = User::factory()->create();
    $user->assignRole(Role::findOrCreate('employee', 'web'));
    $employee = Employee::create(['user_id' => $user->id, 'station_id' => $school->id, 'first_name' => 'Juan', 'last_name' => 'Cruz']);
    $this->actingAs($user)->get(route('employeemodule.index'))->assertInertia(fn (Assert $page) => $page->has('sdoOffices', 1)->where('sdoOffices.0.id', $office->id));
    foreach ([null, $school->id, 999999] as $destination) {
        $this->post(route('employeemodule.store'), ['control_number' => '000123', 'title' => 'Routing test', 'to_station_id' => $destination])->assertSessionHasErrors('to_station_id');
    }
    $this->assertDatabaseCount('documents', 0);
    $this->assertDatabaseCount('document_movements', 0);
    $this->post(route('employeemodule.store'), ['control_number' => '000123', 'title' => 'Routing test', 'to_station_id' => $office->id, 'from_station_id' => $office->id, 'released_by' => 999999])->assertSessionHasNoErrors();
    foreach (['18446744073709551616', '999999999999999999999', '12.5', '-1', '1e3', 'ABC'] as $invalid) {
        $this->post(route('employeemodule.store'), ['control_number' => $invalid, 'title' => 'Invalid', 'to_station_id' => $office->id])->assertSessionHasErrors('control_number');
    }
    $this->post(route('employeemodule.store'), ['control_number' => '123', 'title' => 'Duplicate', 'to_station_id' => $office->id])->assertSessionHasErrors('control_number');
    $document = Document::sole();
    expect($document->tracking_number)->toBe('123');
    $movement = $document->movements()->sole();
    expect($movement->to_station_id)->toBe($office->id)
        ->and($movement->from_station_id)->toBe($school->id)
        ->and($movement->released_by)->toBe($employee->id)
        ->and($movement->released_at)->not->toBeNull()
        ->and($movement->received_at)->toBeNull()
        ->and($movement->received_by)->toBeNull()
        ->and($document->current_station_id)->toBe($school->id);
});
