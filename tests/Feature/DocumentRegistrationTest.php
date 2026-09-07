<?php

use App\Models\Document;
use App\Models\Employee;
use App\Models\Station;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

function documentEmployee(): Employee
{
    $station = Station::create(['name' => 'Administrative Office', 'type' => 'sdo_office']);

    return Employee::create([
        'user_id' => User::factory()->create()->id,
        'station_id' => $station->id,
        'first_name' => 'Admin',
        'last_name' => 'Admin',
    ]);
}

it('saves the control number and QR with server-owned employee and station details', function () {
    $employee = documentEmployee();
    $response = $this->actingAs($employee->user)->post(route('employeemodule.store'), [
        'control_number' => ' sdo-2026-001 ', 'title' => 'Request for supplies',
        'created_by' => 999, 'origin_station_id' => 999, 'qr_token' => 'forged',
    ]);
    $document = Document::sole();
    $response->assertRedirect(route('employeemodule.show', $document->qr_token));
    expect($document->tracking_number)->toBe('SDO-2026-001')
        ->and($document->created_by)->toBe($employee->id)
        ->and($document->origin_station_id)->toBe($employee->station_id)
        ->and($document->current_station_id)->toBe($employee->station_id)
        ->and(Illuminate\Support\Str::isUuid($document->qr_token))->toBeTrue();
    $this->get(route('employeemodule.show', $document->qr_token))->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('EmployeeModule/Show')->where('qrValue', route('employeemodule.show', $document->qr_token)));
    $this->assertDatabaseCount('document_movements', 0);
});

it('rejects duplicates and invalid inputs without adding documents', function () {
    $employee = documentEmployee();
    $this->actingAs($employee->user)->post(route('employeemodule.store'), ['control_number' => 'ABC-1', 'title' => 'First']);
    $this->post(route('employeemodule.store'), ['control_number' => 'abc-1', 'title' => 'Duplicate'])->assertSessionHasErrors('control_number');
    $this->post(route('employeemodule.store'), ['control_number' => 'bad number', 'title' => ''])->assertSessionHasErrors(['control_number', 'title']);
    $this->assertDatabaseCount('documents', 1);
});

it('requires authentication and an employee profile', function () {
    $this->post(route('employeemodule.store'), [])->assertRedirect(route('login'));
    $this->actingAs(User::factory()->create())->post(route('employeemodule.store'), ['control_number' => 'ABC', 'title' => 'Test'])->assertForbidden();
    $this->assertDatabaseCount('documents', 0);
});

it('keeps employee documents private and paginates their own list', function () {
    $owner = documentEmployee();
    $this->actingAs($owner->user)->post(route('employeemodule.store'), ['control_number' => 'PRIVATE', 'title' => 'Private document']);
    $document = Document::sole();
    $other = documentEmployee();
    $this->actingAs($other->user)->get(route('employeemodule.show', $document->qr_token))->assertForbidden();
    $this->get(route('employeemodule.index'))->assertInertia(fn (Assert $page) => $page->component('EmployeeModule/Index')->has('documents.data', 0));
    $this->actingAs($owner->user)->get(route('employeemodule.index'))->assertInertia(fn (Assert $page) => $page->has('documents.data', 1)->where('documents.per_page', 10));
});
