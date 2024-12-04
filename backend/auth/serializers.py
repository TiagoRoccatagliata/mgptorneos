from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework import serializers
from users.models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, required=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, min_length=8, required=True, style={'input_type': 'password'})

    class Meta:
        model = CustomUser
        fields = ['id', 'name', 'email', 'document_number', 'phone_number', 'password', 'password2']
        extra_kwargs = {
            'email': {'required': True},
            'name': {'required': True},
            'document_number': {'required': True},
            'phone_number': {'required': True},
        }

    def validate(self, data):
        """
        Validación para asegurarse de que las contraseñas coincidan.
        """
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})
        return data

    def create(self, validated_data):
        """
        Crea un nuevo usuario con los datos validados y encripta la contraseña.
        """
        validated_data.pop('password2')  # Eliminamos password2 porque no está en el modelo
        user = CustomUser.objects.create_user(
            document_number=validated_data['document_number'],
            email=validated_data['email'],
            name=validated_data['name'],
            phone_number=validated_data['phone_number'],
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    document_number = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(
            document_number=data.get("document_number"),
            password=data.get("password")
        )
        if user and user.is_active:
            return {
                'document_number': user.document_number,
                'email': user.email,
                'name': user.name,
                'token': user.auth_token.key  # Si estás usando Django REST Framework Tokens
            }
        raise serializers.ValidationError("Credenciales incorrectas o usuario inactivo.")