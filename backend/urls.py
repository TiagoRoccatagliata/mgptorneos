from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin de Django
    path('auth/', include('auth.urls')),  # Rutas de autenticación
    path('users/', include('users.urls')),  # Rutas de usuarios
    path('torneos/', include('torneos.urls')),  # Rutas de torneos
]