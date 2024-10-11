<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard del Usuario') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

            <!-- Información de la cuenta -->
            <div class="bg-white shadow-sm sm:rounded-lg p-6 mb-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ __('Información de la Cuenta') }}</h3>
                <p><strong>{{ __('Nombre:') }}</strong> {{ Auth::user()->name }}</p>
                <p><strong>{{ __('Email:') }}</strong> {{ Auth::user()->email }}</p>
                <p><strong>{{ __('Rol:') }}</strong> {{ ucfirst(Auth::user()->role) }}</p>
            </div>

            <!-- Formulario para editar la información del perfil -->
            <div class="bg-white shadow-sm sm:rounded-lg p-6 mb-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ __('Editar Información de la Cuenta') }}</h3>
                <form method="POST" action="{{ route('profile.update') }}">
                    @csrf
                    <!-- Nombre -->
                    <div class="mb-4">
                        <label for="name" class="block text-sm font-medium text-gray-700">{{ __('Nombre') }}</label>
                        <input id="name" name="name" type="text" class="mt-1 block w-full" value="{{ Auth::user()->name }}" required>
                    </div>
                    <!-- Email -->
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium text-gray-700">{{ __('Email') }}</label>
                        <input id="email" name="email" type="email" class="mt-1 block w-full" value="{{ Auth::user()->email }}" required>
                    </div>
                    <!-- Botón para actualizar -->
                    <div class="flex justify-end">
                        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {{ __('Actualizar Información') }}
                        </button>
                    </div>
                </form>
            </div>

            <!-- Estadísticas del Usuario -->
            <div class="bg-white shadow-sm sm:rounded-lg p-6 mb-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ __('Estadísticas del Usuario') }}</h3>
                <p><strong>{{ __('Torneos Jugados:') }}</strong> 10</p>
                <p><strong>{{ __('Partidos Ganados:') }}</strong> 6</p>
                <p><strong>{{ __('Partidos Perdidos:') }}</strong> 4</p>
            </div>

            <!-- Gráficos con Chart.js -->
            <div class="bg-white shadow-sm sm:rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ __('Gráficos de Desempeño') }}</h3>
                <canvas id="performanceChart"></canvas>
            </div>

        </div>
    </div>

    <!-- Scripts para Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        const ctx = document.getElementById('performanceChart').getContext('2d');
        const performanceChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Ganados', 'Perdidos'],
                datasets: [{
                    label: 'Partidos',
                    data: [6, 4], // Cambia los datos aquí según los valores reales
                    backgroundColor: ['#4CAF50', '#F44336'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    </script>
</x-app-layout>
