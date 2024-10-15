<?php

namespace App\Http\Controllers;

use App\Models\Ranking;
use Illuminate\Http\Request;

class RankingController extends Controller
{
    public function index()
    {
        $rankings = Ranking::orderBy('puntos', 'desc')->get();
        return view('rankings.index', compact('rankings'));
    }

    public function show($id)
    {
        $ranking = Ranking::findOrFail($id);
        return view('rankings.show', compact('ranking'));
    }
}
