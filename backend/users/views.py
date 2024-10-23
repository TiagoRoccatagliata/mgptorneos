from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from .serializers import RegisterSerializer
from rest_framework.response import Response
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer  # Corregido el nombre de la clase serializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)  # Corrección en el nombre del serializer
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)