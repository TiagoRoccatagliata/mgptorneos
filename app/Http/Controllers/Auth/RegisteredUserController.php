<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // Validar los campos adicionales
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'documento' => 'required|string|max:20|unique:users',  // Campo para documento
            'telefono' => 'nullable|string|max:15',  // Campo para teléfono (opcional)
            'rol' => 'required|in:jugador,club,admin',  // Validación para el rol
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Crear el usuario con los campos adicionales
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'documento' => $request->documento,  // Guardar el documento
            'telefono' => $request->telefono,  // Guardar el teléfono
            'rol' => $request->rol,  // Guardar el rol
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
