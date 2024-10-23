from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


# Custom manager for handling user creation
class CustomUserManager(BaseUserManager):
    def create_user(self, document_number, email, phone_number, password=None, **extra_fields):
        if not document_number:
            raise ValueError('The Document Number is required')
        if not email:
            raise ValueError('The Email is required')

        email = self.normalize_email(email)
        user = self.model(document_number=document_number, email=email, phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, document_number, email, phone_number, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(document_number, email, phone_number, password, **extra_fields)


# Roles posibles para los usuarios
USER_ROLES = (
    ('player', 'Player'),
    ('club', 'Club'),
)


class CustomUser(AbstractUser):
    username = None  # We don't need the username field
    email = models.EmailField(max_length=200, unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    document_number = models.CharField(max_length=20, unique=True)
    role = models.CharField(max_length=10, choices=USER_ROLES, default='player')

    USERNAME_FIELD = 'document_number'
    REQUIRED_FIELDS = ['email', 'phone_number']

    objects = CustomUserManager()

    def __str__(self):
        return self.document_number