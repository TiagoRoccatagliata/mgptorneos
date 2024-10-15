<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CodigoAccesoFactory extends Factory
{
    public function definition()
    {
        return [
            'torneo_id' => \App\Models\Torneo::factory(), // Relación con torneo
            'codigo' => $this->faker->unique()->numerify('####'),
        ];
    }
}
