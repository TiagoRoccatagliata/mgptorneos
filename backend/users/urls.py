from django.urls import path
from .views import UserProfileView, PlayerRankingView

urlpatterns = [
    path('', UserProfileView.as_view(), name='user_profile'),  # Perfil del usuario
    path('rankings/', PlayerRankingView.as_view(), name='player_rankings'),  # Rankings de jugadores
]