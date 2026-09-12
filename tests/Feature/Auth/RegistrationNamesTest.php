<?php

use App\Models\RegistrationRequest;
use App\Models\Station;

it('stores separate registration names without creating a user', function () {
    $station = Station::create(['name' => 'Test Office', 'type' => 'sdo_office']);
    $this->post(route('register'), [
        'first_name' => 'Maria Clara', 'middle_name' => '', 'last_name' => 'De Leon',
        'email' => 'names@example.com', 'station_id' => $station->id,
        'password' => 'Password123!', 'password_confirmation' => 'Password123!',
    ])->assertSessionHasNoErrors()->assertRedirect(route('register'));

    $request = RegistrationRequest::sole();
    expect($request->first_name)->toBe('Maria Clara')
        ->and($request->middle_name)->toBeNull()
        ->and($request->last_name)->toBe('De Leon')
        ->and($request->name)->toBe('Maria Clara De Leon');
    $this->assertDatabaseCount('users', 0);
    $this->assertGuest();
});

it('requires first and last names for registration', function () {
    $this->post(route('register'), [])->assertSessionHasErrors(['first_name', 'last_name']);
});
