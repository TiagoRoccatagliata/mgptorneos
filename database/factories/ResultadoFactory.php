<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ResultadoFactory extends Factory
{
    public function definition()
    {
        return [
            'partido_id' => \App\Models\Partido::factory(), // Relación con partido
            'ganador_id' => \App\Models\Usuario::factory(), // Relación con usuario (ganador)
        ];
    }
}
