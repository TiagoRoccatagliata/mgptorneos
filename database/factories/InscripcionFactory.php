<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class InscripcionFactory extends Factory
{
    public function definition()
    {
        return [
            'usuario_id' => \App\Models\Usuario::factory(), // Relación con usuario (jugador)
            'torneo_id' => \App\Models\Torneo::factory(),  // Relación con torneo
        ];
    }
}
