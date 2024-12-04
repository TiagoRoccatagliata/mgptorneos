from rest_framework import serializers
from .models import Tournament, TournamentRegistration

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ['id', 'name', 'description', 'start_date', 'end_date', 'created_by']

class TournamentRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TournamentRegistration
        fields = ['id', 'tournament', 'player', 'registration_date']