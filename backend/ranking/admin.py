from django.contrib import admin
from .models import PlayerRanking

@admin.register(PlayerRanking)
class PlayerRankingAdmin(admin.ModelAdmin):
    list_display = ('player_name', 'category', 'points', 'matches_played', 'matches_won')
    search_fields = ('player_name', 'category')