<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\AdminModuleController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function (Request $request) {
    if ($request->user() && $request->user()->workspaceRoute() !== 'welcome') {
        return to_route($request->user()->workspaceRoute());
    }

    return Inertia::render('LandingPage/Index', [
        'authModal' => null,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::middleware('auth')->group(function () {
    Route::get('/adminmodule', [AdminModuleController::class, 'index'])
        ->middleware('role:admin')
        ->name('adminmodule.index');

    Route::get('/documents/{document:qr_token}', [DocumentController::class, 'show'])
        ->middleware('role:employee');

    Route::get('/employeemodule', [DocumentController::class, 'index'])
        ->middleware('role:employee')
        ->name('employeemodule.index');

    Route::post('/employeemodule', [DocumentController::class, 'store'])
        ->middleware('throttle:30,1')
        ->middleware('role:employee')
        ->name('employeemodule.store');

    Route::get('/employeemodule/{document:qr_token}', [DocumentController::class, 'show'])
        ->middleware('role:employee')
        ->name('employeemodule.show');

    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

require __DIR__.'/auth.php';
