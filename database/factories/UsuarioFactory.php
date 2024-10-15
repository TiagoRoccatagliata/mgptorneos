<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UsuarioFactory extends Factory
{
    public function definition()
    {
        return [
            'nombre' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => bcrypt('password'), // Usar bcrypt para contraseñas
            'documento' => $this->faker->unique()->numerify('########'),
            'telefono' => $this->faker->phoneNumber(),
            'rol' => $this->faker->randomElement(['jugador', 'club', 'admin']), // Asigna roles aleatorios
        ];
    }
}
