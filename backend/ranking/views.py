from rest_framework import generics
from .models import PlayerRanking
from .serializers import PlayerRankingSerializer

class PlayerRankingListCreateView(generics.ListCreateAPIView):
    queryset = PlayerRanking.objects.all().order_by('-points')  # Ordenar por puntos de mayor a menor
    serializer_class = PlayerRankingSerializer

class PlayerRankingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PlayerRanking.objects.all()
    serializer_class = PlayerRankingSerializer