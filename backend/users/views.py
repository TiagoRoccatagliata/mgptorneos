from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from .serializers import *
from rest_framework.response import Response
from django.contrib.auth import get_user_model, authenticate
from knox.models import AuthToken


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
    queryset = User.objects.all()
    serializer_class = RegisterSerializer  # Corregido el nombre de la clase serializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)  # Corrección en el nombre del serializer
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class UserViewset(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer  # Corregido el nombre de la clase serializer

    def list(self, request):
        queryset = User.objects.all()
        serializer = self.serializer_class(queryset, many = True)
        return Response(serializer.data)