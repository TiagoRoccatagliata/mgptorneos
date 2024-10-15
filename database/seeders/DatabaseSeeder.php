<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuario;
use App\Models\Club;
use App\Models\Torneo;
use App\Models\Inscripcion;
use App\Models\Ranking;
use App\Models\Estadistica;
use App\Models\Partido;
use App\Models\Categoria;
use App\Models\CodigoAcceso;
use App\Models\Calendario;
use App\Models\Resultado;
use App\Models\Notificacion;
use App\Models\Comentario;
use App\Models\Rol;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Crear usuarios con diferentes roles
        Usuario::factory()->create([
            'nombre' => 'Administrador',
            'email' => 'admin@torneos.com',
            'rol' => 'admin',
        ]);

        Usuario::factory()->count(10)->create([
            'rol' => 'jugador',
        ]);

        Usuario::factory()->count(5)->create([
            'rol' => 'club',
        ]);

        // Crear clubes relacionados con los usuarios de tipo "club"
        Club::factory()->count(5)->create();

        // Crear torneos públicos y privados
        Torneo::factory()->count(5)->create([
            'tipo' => 'publico',
        ]);

        Torneo::factory()->count(3)->create([
            'tipo' => 'privado',
        ]);

        // Crear inscripciones para jugadores en torneos
        Inscripcion::factory()->count(20)->create();

        // Crear rankings de jugadores
        Ranking::factory()->count(15)->create();

        // Crear estadísticas para jugadores
        Estadistica::factory()->count(10)->create();

        // Crear partidos de prueba en torneos
        Partido::factory()->count(10)->create();

        // Crear categorías para los torneos
        Categoria::factory()->count(3)->create();

        // Crear códigos de acceso para torneos privados
        CodigoAcceso::factory()->count(3)->create();

        // Crear calendarios de torneos
        Calendario::factory()->count(5)->create();

        // Crear resultados para partidos
        Resultado::factory()->count(10)->create();

        // Crear notificaciones para usuarios
        Notificacion::factory()->count(10)->create();

        // Crear comentarios de prueba para torneos (opcional)
        Comentario::factory()->count(5)->create();

        // Crear roles para los usuarios (si es necesario manejar roles adicionales)
        Rol::factory()->count(3)->create();
    }
}
