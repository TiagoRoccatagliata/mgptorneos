from django.urls import path
from .views import TournamentListView, TournamentDetailView, TournamentEnrollView

urlpatterns = [
    path('', TournamentListView.as_view(), name='tournament_list'),  # Lista de torneos
    path('<int:id>/', TournamentDetailView.as_view(), name='tournament_detail'),  # Detalles de un torneo específico
    path('<int:id>/enroll/', TournamentEnrollView.as_view(), name='tournament_enroll'),  # Inscribirse en un torneo
]