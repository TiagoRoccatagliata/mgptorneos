<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * Actualizar el perfil del usuario.
     */
    public function update(Request $request)
    {
        // Validar los datos del formulario
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . Auth::id()],
        ]);

        // Obtener el usuario autenticado
        $user = Auth::user();

        // Actualizar los datos del usuario
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->save();

        // Redirigir con mensaje de éxito
        return redirect()->back()->with('status', 'Perfil actualizado correctamente.');
    }
}
