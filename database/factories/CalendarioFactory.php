<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CalendarioFactory extends Factory
{
    public function definition()
    {
        return [
            'torneo_id' => \App\Models\Torneo::factory(), // Relación con torneo
            'fecha' => $this->faker->date(),
            'evento' => $this->faker->sentence(),
        ];
    }
}
