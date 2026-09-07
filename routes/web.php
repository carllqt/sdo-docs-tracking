<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\AdminModuleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/adminmodule', [AdminModuleController::class, 'index'])->name('adminmodule.index');
    // Keep previously downloaded QR links working.
    Route::get('/documents/{document:qr_token}', [DocumentController::class, 'show']);
    Route::get('/employeemodule', [DocumentController::class, 'index'])->name('employeemodule.index');
    Route::post('/employeemodule', [DocumentController::class, 'store'])->middleware('throttle:30,1')->name('employeemodule.store');
    Route::get('/employeemodule/{document:qr_token}', [DocumentController::class, 'show'])->name('employeemodule.show');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
