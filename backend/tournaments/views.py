from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Tournament
from .serializers import TournamentSerializer, TournamentDetailSerializer

class TournamentListView(APIView):
    def get(self, request):
        tournaments = Tournament.objects.all()
        serializer = TournamentSerializer(tournaments, many=True)
        return Response(serializer.data)

class TournamentDetailView(APIView):
    def get(self, request, id):
        try:
            tournament = Tournament.objects.get(id=id)
            serializer = TournamentDetailSerializer(tournament)
            return Response(serializer.data)
        except Tournament.DoesNotExist:
            return Response({'error': 'Tournament not found'}, status=status.HTTP_404_NOT_FOUND)

class TournamentEnrollView(APIView):
    def post(self, request, id):
        try:
            tournament = Tournament.objects.get(id=id)
            # Lógica para inscribir al jugador
            tournament.players.add(request.user)
            return Response({'message': 'Successfully enrolled'}, status=status.HTTP_200_OK)
        except Tournament.DoesNotExist:
            return Response({'error': 'Tournament not found'}, status=status.HTTP_404_NOT_FOUND)