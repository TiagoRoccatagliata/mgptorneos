from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('user_auth.urls')),  # Cambia 'auth' por 'user_auth'
    path('users/', include('users.urls')),
    path('tournaments/', include('tournaments.urls')),
    path('calendar/', include('event_calendar.urls')),  # Cambia a event_calendar
    path('ranking/', include('ranking.urls')),  # Para el ranking
]