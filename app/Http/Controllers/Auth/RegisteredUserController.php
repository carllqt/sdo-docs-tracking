<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\RegistrationRequest;
use App\Models\Station;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('LandingPage/Index', [
            'authModal' => 'register',
            'stations' => Station::orderBy('name')->get(['id', 'name', 'type', 'school_code']),
            'registrationSubmitted' => session('registration_submitted', false),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email', 'unique:for_approval,email'],
            'station_id' => ['required', 'integer', 'exists:stations,id'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'email.unique' => 'This email already has an account or a registration request.',
            'station_id.required' => 'Please select your school or SDO unit.',
        ]);

        RegistrationRequest::create($validated);

        return to_route('register')->with('registration_submitted', true);
    }
}

