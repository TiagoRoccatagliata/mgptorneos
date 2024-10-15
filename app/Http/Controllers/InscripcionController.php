<?php

namespace App\Http\Controllers;

use App\Models\Inscripcion;
use Illuminate\Http\Request;

class InscripcionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'usuario_id' => 'required|exists:usuarios,id',
            'torneo_id' => 'required|exists:torneos,id',
        ]);

        Inscripcion::create($request->all());

        return redirect()->back()->with('message', 'Inscripción exitosa.');
    }

    public function destroy($id)
    {
        $inscripcion = Inscripcion::findOrFail($id);
        $inscripcion->delete();

        return redirect()->back()->with('message', 'Inscripción cancelada.');
    }
}
