from rest_framework import serializers
from .models import CustomUser, PlayerStats

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'name', 'email', 'document_number', 'phone_number']

class PlayerRankingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerStats
        fields = ['player', 'points', 'matches_played', 'matches_won']