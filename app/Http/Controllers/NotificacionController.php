<?php

namespace App\Http\Controllers;

use App\Models\Notificacion;
use Illuminate\Http\Request;

class NotificacionController extends Controller
{
    public function index()
    {
        $notificaciones = Notificacion::where('usuario_id', auth()->id())->get();
        return view('notificaciones.index', compact('notificaciones'));
    }

    public function markAsRead($id)
    {
        $notificacion = Notificacion::findOrFail($id);
        $notificacion->update(['leido' => true]);

        return redirect()->back();
    }
}
