<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;

/**
 * Rutas protegidas por autenticación
 */
Route::middleware('auth')->group(function () {
    // Actualizar perfil
    Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');

    // Dashboard
    Route::view('dashboard', 'dashboard')
        ->middleware(['verified'])  // Solo usuarios verificados
        ->name('dashboard');

    // Perfil del usuario
    Route::view('profile', 'profile')
        ->name('profile');
});

/**
 * Ruta para la Home Page
 * Asegúrate de que sólo haya una ruta para la URL "/"
 */
Route::get('/', [HomeController::class, 'index'])->name('home');

// Autenticación
require __DIR__.'/auth.php';

require __DIR__.'/auth.php';
