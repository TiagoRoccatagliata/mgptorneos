from rest_framework import serializers
from django.contrib.auth import authenticate
from users.models import CustomUser

class LoginSerializer(serializers.Serializer):
    document_number = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(
            document_number=data.get('document_number'),
            password=data.get('password')
        )
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Credenciales inválidas o usuario inactivo.")

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'document_number', 'phone_number']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            document_number=validated_data['document_number'],
            phone_number=validated_data.get('phone_number', '')
        )
        return user