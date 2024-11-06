from django.db import models
from django.conf import settings

# Modelo para Torneos
class Tournament(models.Model):
    TOURNAMENT_TYPES = (
        ('public', 'Public'),
        ('club', 'Club'),
        ('private', 'Private')
    )

    name = models.CharField(max_length=100)
    description = models.TextField()
    tournament_type = models.CharField(max_length=10, choices=TOURNAMENT_TYPES, default='public')
    start_date = models.DateField()
    end_date = models.DateField()
    location = models.CharField(max_length=200)

    # Relación con el creador del torneo (Club o Admin)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={'role__in': ['club', 'admin']}
    )

    def __str__(self):
        return f"{self.name} - {self.tournament_type}"

# Modelo para Estadísticas de Jugador
class PlayerStats(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'player'}
    )
    matches_played = models.PositiveIntegerField(default=0)
    matches_won = models.PositiveIntegerField(default=0)
    points_scored = models.PositiveIntegerField(default=0)

    def win_rate(self):
        if self.matches_played > 0:
            return (self.matches_won / self.matches_played) * 100
        return 0

    def __str__(self):
        return f"Stats for {self.user.document_number}"

# Modelo para Clubes
class Club(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'club'}
    )
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    established_date = models.DateField()

    def __str__(self):
        return self.name

# Modelo para Registro de Torneos
class TournamentRegistration(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    player = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'player'}
    )
    registration_date = models.DateTimeField(auto_now_add=True)
    score = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.player.document_number} in {self.tournament.name}"