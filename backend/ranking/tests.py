from django.test import TestCase
from .models import PlayerRanking

class PlayerRankingModelTest(TestCase):
    def setUp(self):
        PlayerRanking.objects.create(
            player_name="Jugador de Prueba",
            category="5ta",
            matches_played=10,
            matches_won=7,
            points=21
        )

    def test_player_ranking_creation(self):
        player = PlayerRanking.objects.get(player_name="Jugador de Prueba")
        self.assertEqual(player.points, 21)