<?php

namespace App\Http\Controllers;

use App\Models\Estadistica;
use Illuminate\Http\Request;

class EstadisticaController extends Controller
{
    public function index()
    {
        $estadisticas = Estadistica::all();
        return view('estadisticas.index', compact('estadisticas'));
    }

    public function show($id)
    {
        $estadistica = Estadistica::findOrFail($id);
        return view('estadisticas.show', compact('estadistica'));
    }
}
