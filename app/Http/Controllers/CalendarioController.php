<?php

namespace App\Http\Controllers;

use App\Models\Calendario;
use Illuminate\Http\Request;

class CalendarioController extends Controller
{
    public function index()
    {
        $eventos = Calendario::all();
        return view('calendario.index', compact('eventos'));
    }
}
