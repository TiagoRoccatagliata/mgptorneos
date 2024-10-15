<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EstadisticaFactory extends Factory
{
    public function definition()
    {
        return [
            'usuario_id' => \App\Models\Usuario::factory(), // Relación con usuario
            'partidos_jugados' => $this->faker->numberBetween(0, 100),
            'partidos_ganados' => $this->faker->numberBetween(0, 50),
            'partidos_perdidos' => $this->faker->numberBetween(0, 50),
            'puntos_totales' => $this->faker->numberBetween(0, 500),
        ];
    }
}
