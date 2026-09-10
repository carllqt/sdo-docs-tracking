<?php

use Inertia\Testing\AssertableInertia as Assert;

it('renders authentication dialogs on the welcome page', function ($url, $modal) {
    $this->get($url)->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('LandingPage/Index')
        ->where('authModal', $modal));
})->with([
    'home' => ['/', null],
    'login' => ['/login', 'login'],
    'registration' => ['/register', 'register'],
]);

