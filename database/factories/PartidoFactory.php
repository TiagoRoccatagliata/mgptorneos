<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PartidoFactory extends Factory
{
    public function definition()
    {
        return [
            'torneo_id' => \App\Models\Torneo::factory(), // Relación con torneo
            'jugador1_id' => \App\Models\Usuario::factory(), // Relación con jugador 1
            'jugador2_id' => \App\Models\Usuario::factory(), // Relación con jugador 2
            'puntos_jugador1' => $this->faker->numberBetween(0, 10),
            'puntos_jugador2' => $this->faker->numberBetween(0, 10),
            'resultado' => $this->faker->randomElement(['Jugador 1', 'Jugador 2', 'Empate']),
            'fecha' => $this->faker->date(),
        ];
    }
}
