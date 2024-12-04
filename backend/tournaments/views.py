from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Tournament
from .serializers import TournamentSerializer

class TournamentListCreateView(generics.ListCreateAPIView):
    queryset = Tournament.objects.all().order_by('-start_date')
    serializer_class = TournamentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

class TournamentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    permission_classes = [IsAuthenticated]

class EnrollInTournamentView(generics.GenericAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            tournament = Tournament.objects.get(pk=pk)
            if tournament.is_private and tournament.access_code != request.data.get('access_code'):
                return Response({"error": "Código de acceso incorrecto."}, status=status.HTTP_403_FORBIDDEN)
            # Aquí podrías registrar al usuario en el torneo
            return Response({"message": "Inscripción exitosa al torneo."}, status=status.HTTP_200_OK)
        except Tournament.DoesNotExist:
            return Response({"error": "Torneo no encontrado."}, status=status.HTTP_404_NOT_FOUND)