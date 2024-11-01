from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
User = get_user_model()

class LoginSerializer(serializers.Serializer):
    document_number = serializers.CharField()
    password = serializers.CharField()

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop('password', None)
        return ret

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'document_number', 'email', 'phone_number', 'password')  # Incluye phone_number
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Extrae la contraseña y crea el usuario sin contraseña primero
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)  # Encripta la contraseña
        user.save()
        return user