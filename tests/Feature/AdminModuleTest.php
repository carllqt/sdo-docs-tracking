<?php

use App\Models\Document;
use App\Models\DocumentMovement;
use App\Models\Employee;
use App\Models\Station;
use App\Models\User;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;

it('restricts the admin module to admin accounts', function () {
    $this->get(route('adminmodule.index'))->assertRedirect(route('login'));
    $user = User::factory()->create();
    $this->actingAs($user)->get(route('adminmodule.index'))->assertForbidden();
    $user->fill(['is_admin' => true])->save();
    expect($user->fresh()->is_admin)->toBeFalse();
    $user->forceFill(['is_admin' => true])->save();
    $this->get(route('adminmodule.index'))->assertOk();
});

it('shows all employee documents and separate creation release and receipt events', function () {
    $admin = User::factory()->create(['is_admin' => true]);
    $station = Station::create(['name' => 'School A', 'type' => 'school']);
    $destination = Station::create(['name' => 'Records', 'type' => 'sdo_office']);
    $employees = collect([1, 2])->map(fn ($n) => Employee::create([
        'user_id' => User::factory()->create()->id, 'station_id' => $station->id,
        'first_name' => 'Employee', 'last_name' => (string) $n,
    ]));
    foreach (range(1, 11) as $n) {
        $document = Document::create([
            'tracking_number' => 'TEST-'.$n, 'qr_token' => (string) Str::uuid(),
            'title' => 'Request '.$n, 'created_by' => $employees[$n % 2]->id,
            'origin_station_id' => $station->id, 'current_station_id' => $station->id,
        ]);
    }
    DocumentMovement::create([
        'document_id' => $document->id, 'from_station_id' => $station->id,
        'to_station_id' => $destination->id, 'released_by' => $employees[0]->id,
        'received_by' => $employees[1]->id, 'released_at' => now()->addMinute(),
        'received_at' => now()->addMinutes(2), 'remarks' => 'For processing',
    ]);
    $this->actingAs($admin)->get(route('adminmodule.index'))->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('AdminModule/Index')->where('documents.total', 11)->has('documents.data', 10)
        ->where('activities.total', 13)->where('activities.data.0.action', 'Received')
        ->where('activities.data.1.action', 'Released')->where('activities.data.0.station_name', 'Records')
        ->where('activities.data.0.remarks', 'For processing'));
    $this->get(route('adminmodule.index', ['documents_page' => 2, 'activity_page' => 1]))
        ->assertInertia(fn (Assert $page) => $page->has('documents.data', 1)->has('activities.data', 10)
            ->where('documents.current_page', 2)->where('activities.current_page', 1));
});
