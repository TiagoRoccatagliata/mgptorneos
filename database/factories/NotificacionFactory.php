<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class NotificacionFactory extends Factory
{
    public function definition()
    {
        return [
            'usuario_id' => \App\Models\Usuario::factory(), // Relación con usuario
            'mensaje' => $this->faker->sentence(),
            'leido' => $this->faker->boolean(),
        ];
    }
}
