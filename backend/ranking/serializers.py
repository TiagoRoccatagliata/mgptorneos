from rest_framework import serializers
from .models import PlayerRanking

class PlayerRankingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerRanking
        fields = ['id', 'player_name', 'category', 'matches_played', 'matches_won', 'points']