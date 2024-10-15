<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ClubFactory extends Factory
{
    public function definition()
    {
        return [
            'usuario_id' => \App\Models\Usuario::factory(), // Relación con usuario
            'nombre' => $this->faker->company(),
            'descripcion' => $this->faker->sentence(),
        ];
    }
}
