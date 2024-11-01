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