from django.db import models

class PlayerRanking(models.Model):
    player_name = models.CharField(max_length=100, verbose_name="Nombre del Jugador")
    category = models.CharField(max_length=50, verbose_name="Categoría")
    matches_played = models.PositiveIntegerField(verbose_name="Partidos Jugados")
    matches_won = models.PositiveIntegerField(verbose_name="Partidos Ganados")
    points = models.PositiveIntegerField(verbose_name="Puntos")

    def __str__(self):
        return f"{self.player_name} - {self.category}"