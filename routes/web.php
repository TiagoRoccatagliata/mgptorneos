<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\TorneoController;
use App\Http\Controllers\InscripcionController;
use App\Http\Controllers\RankingController;
use App\Http\Controllers\CalendarioController;
use App\Http\Controllers\EstadisticaController;
use App\Http\Controllers\NotificacionController;
use App\Http\Controllers\CodigoAccesoController;
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

// Rutas protegidas por autenticación
Route::middleware('auth')->group(function () {

    // Gestión de perfil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Usuarios
    Route::get('/usuarios', [UsuarioController::class, 'index'])->name('usuarios.index');
    Route::patch('/usuarios/{id}', [UsuarioController::class, 'update'])->name('usuarios.update');

    // Clubes
    Route::get('/clubes', [ClubController::class, 'index'])->name('clubes.index');
    Route::post('/clubes', [ClubController::class, 'store'])->name('clubes.store');
    Route::patch('/clubes/{id}', [ClubController::class, 'update'])->name('clubes.update');
    Route::delete('/clubes/{id}', [ClubController::class, 'destroy'])->name('clubes.destroy');

    // Torneos
    Route::get('/torneos', [TorneoController::class, 'index'])->name('torneos.index');
    Route::get('/torneos/{id}', [TorneoController::class, 'show'])->name('torneos.show');
    Route::post('/torneos', [TorneoController::class, 'store'])->name('torneos.store');
    Route::patch('/torneos/{id}', [TorneoController::class, 'update'])->name('torneos.update');
    Route::delete('/torneos/{id}', [TorneoController::class, 'destroy'])->name('torneos.destroy');

    // Inscripciones
    Route::post('/inscripciones', [InscripcionController::class, 'store'])->name('inscripciones.store');
    Route::delete('/inscripciones/{id}', [InscripcionController::class, 'destroy'])->name('inscripciones.destroy');

    // Rankings
    Route::get('/rankings', [RankingController::class, 'index'])->name('rankings.index');
    Route::get('/rankings/{id}', [RankingController::class, 'show'])->name('rankings.show');

    // Calendario de torneos
    Route::get('/calendario', [CalendarioController::class, 'index'])->name('calendario.index');

    // Estadísticas
    Route::get('/estadisticas', [EstadisticaController::class, 'index'])->name('estadisticas.index');
    Route::get('/estadisticas/{id}', [EstadisticaController::class, 'show'])->name('estadisticas.show');

    // Notificaciones
    Route::get('/notificaciones', [NotificacionController::class, 'index'])->name('notificaciones.index');
    Route::patch('/notificaciones/{id}/marcar-como-leido', [NotificacionController::class, 'markAsRead'])->name('notificaciones.markAsRead');

    // Códigos de acceso para torneos privados
    Route::post('/codigo-acceso', [CodigoAccesoController::class, 'store'])->name('codigo-acceso.store');
    Route::post('/codigo-acceso/validar', [CodigoAccesoController::class, 'validateCode'])->name('codigo-acceso.validate');
});

// Rutas de autenticación (registrarse, iniciar sesión, etc.)
require __DIR__.'/auth.php';
