from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Tournament

User = get_user_model()

class TournamentModelTest(TestCase):
    def setUp(self):
        user = User.objects.create_user(username="testuser", password="password123")
        Tournament.objects.create(
            name="Torneo de Prueba",
            start_date="2024-12-01",
            end_date="2024-12-05",
            creator=user,
            is_private=False
        )

    def test_tournament_creation(self):
        tournament = Tournament.objects.get(name="Torneo de Prueba")
        self.assertEqual(tournament.creator.username, "testuser")
        self.assertFalse(tournament.is_private)