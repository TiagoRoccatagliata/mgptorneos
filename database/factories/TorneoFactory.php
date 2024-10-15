<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TorneoFactory extends Factory
{
    public function definition()
    {
        return [
            'club_id' => \App\Models\Club::factory(), // Relación con club (si es un torneo de club)
            'nombre' => $this->faker->word() . ' Tournament',
            'descripcion' => $this->faker->paragraph(),
            'tipo' => $this->faker->randomElement(['publico', 'privado', 'club']),
            'codigo_acceso' => $this->faker->optional()->numerify('####'), // Solo para torneos privados
            'fecha_inicio' => $this->faker->date(),
            'fecha_fin' => $this->faker->optional()->date(),
        ];
    }
}
