from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from .serializers import *
from django.contrib.auth import get_user_model, authenticate
from knox.models import AuthToken
from rest_framework import status
from .models import PlayerStats
from .serializers import PlayerStatsSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CustomUser
from .serializers import UserProfileSerializer, PlayerRankingSerializer



User = get_user_model()

class LoginViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer


    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            document_number = serializer.validated_data['document_number']
            password = serializer.validated_data['password']

            user = authenticate(request, document_number=document_number, password=password)

            if user:
                _, token = AuthToken.objects.create(user)
                return Response({
                    "user": self.serializer_class(user).data,
                    "token": token,
                })
            else:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


        else:
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


class RegisterViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                return Response(serializer.data)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewset(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RegisterSerializer

    def list(self, request):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data)


# En views.py
class PlayerStatsViewset(viewsets.ModelViewSet):
    queryset = PlayerStats.objects.all()
    serializer_class = PlayerStatsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Solo los jugadores pueden ver sus estadísticas
        if self.request.user.role == 'player':
            return PlayerStats.objects.filter(user=self.request.user)
        return super().get_queryset()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserProfileView(APIView):
    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)

class PlayerRankingView(APIView):
    def get(self, request):
        rankings = CustomUser.objects.filter(is_player=True).order_by('-points')  # Suponiendo que tienes un campo `points`
        serializer = PlayerRankingSerializer(rankings, many=True)
        return Response(serializer.data)