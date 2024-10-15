<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RolFactory extends Factory
{
    public function definition()
    {
        return [
            'nombre' => $this->faker->randomElement(['jugador', 'club', 'admin']),
        ];
    }
}
