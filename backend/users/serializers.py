from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'document_number', 'email', 'phone_number', 'password')  # Incluye phone_number
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')  # Saca la contraseña del dict
        user = User.objects.create_user(**validated_data)
        user.set_password(password)  # Encripta la contraseña
        user.save()
        return user