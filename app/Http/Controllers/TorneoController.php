<?php

namespace App\Http\Controllers;

use App\Models\Torneo;
use Illuminate\Http\Request;

class TorneoController extends Controller
{
    public function index()
    {
        $torneos = Torneo::all();
        return view('torneos.index', compact('torneos'));
    }

    public function show($id)
    {
        $torneo = Torneo::findOrFail($id);
        return view('torneos.show', compact('torneo'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'fecha_inicio' => 'required|date',
        ]);

        Torneo::create($request->all());

        return redirect()->route('torneos.index');
    }

    public function update(Request $request, $id)
    {
        $torneo = Torneo::findOrFail($id);
        $torneo->update($request->all());

        return redirect()->route('torneos.index');
    }

    public function destroy($id)
    {
        $torneo = Torneo::findOrFail($id);
        $torneo->delete();

        return redirect()->route('torneos.index');
    }
}
