<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Inicio - Página de Torneos</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body class="bg-gray-100">

<header class="bg-white shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">
            Bienvenido a la Plataforma de Torneos
        </h1>
    </div>
</header>

<main class="py-12">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <!-- Contenido de la Home Page -->
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h2 class="text-2xl font-bold mb-4">Gestiona y participa en torneos deportivos</h2>
            <p class="text-gray-700 mb-4">Regístrate o inicia sesión para crear, gestionar o unirte a torneos en nuestra plataforma.</p>
            <div class="mt-6">
                <a href="{{ route('register') }}" class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                    Regístrate Ahora
                </a>
                <a href="{{ route('login') }}" class="ml-4 bg-gray-300 text-black font-bold py-2 px-4 rounded hover:bg-gray-400">
                    Iniciar Sesión
                </a>
            </div>
        </div>
    </div>
</main>

<footer class="bg-gray-800 text-white py-6 mt-8">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 text-center">
        <p>© 2024 Plataforma de Torneos - Todos los derechos reservados.</p>
    </div>
</footer>

</body>
</html>
