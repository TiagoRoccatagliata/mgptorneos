<?php

namespace App\Http\Controllers;

use App\Models\Club;
use Illuminate\Http\Request;

class ClubController extends Controller
{
    public function index()
    {
        $clubes = Club::all();
        return view('clubes.index', compact('clubes'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
        ]);

        Club::create($request->all());

        return redirect()->route('clubes.index');
    }

    public function update(Request $request, $id)
    {
        $club = Club::findOrFail($id);
        $club->update($request->all());

        return redirect()->route('clubes.index');
    }

    public function destroy($id)
    {
        $club = Club::findOrFail($id);
        $club->delete();

        return redirect()->route('clubes.index');
    }
}
