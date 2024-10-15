<?php

namespace App\Http\Controllers;

use App\Models\CodigoAcceso;
use Illuminate\Http\Request;

class CodigoAccesoController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'codigo' => 'required|string|unique:codigos_acceso,codigo',
            'torneo_id' => 'required|exists:torneos,id',
        ]);

        CodigoAcceso::create($request->all());

        return redirect()->back()->with('message', 'Código de acceso generado.');
    }

    public function validateCode(Request $request)
    {
        $request->validate([
            'codigo' => 'required|string|exists:codigos_acceso,codigo',
        ]);

        $codigo = CodigoAcceso::where('codigo', $request->codigo)->first();

        // Validar si el código es correcto y redirigir al torneo
        if ($codigo) {
            return redirect()->route('torneos.show', $codigo->torneo_id);
        }

        return back()->withErrors(['codigo' => 'Código de acceso incorrecto.']);
    }
}
