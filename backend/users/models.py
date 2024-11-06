from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django_rest_passwordreset.signals import reset_password_token_created
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags

# Manager personalizado para el modelo de usuario
class CustomUserManager(BaseUserManager):
    def create_user(self, document_number, email, phone_number, password=None, **extra_fields):
        if not document_number:
            raise ValueError('Se requiere el Documento')
        if not email:
            raise ValueError('Se requiere el Email')

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


# Definición de roles de usuario
USER_ROLES = (
    ('player', 'Player'),
    ('club', 'Club'),
    ('admin', 'Admin'),  # Aseguramos que exista el rol de admin
)


# Modelo de usuario personalizado
class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(max_length=200, unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    document_number = models.CharField(max_length=20, unique=True)
    role = models.CharField(max_length=10, choices=USER_ROLES, default='player')

    USERNAME_FIELD = 'document_number'
    REQUIRED_FIELDS = ['email', 'phone_number']

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.document_number} - {self.role}"


# Receiver para el reseteo de contraseña
@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    # Enlace al frontend (ajusta este enlace si tu frontend está en producción)
    sitelink = "http://localhost:5173/"
    # Modificamos el enlace para que incluya el token en la URL
    full_link = f"{sitelink}password-reset/{reset_password_token.key}"

    # Contexto para el email
    context = {
        'full_link': full_link,
        'email_adress': reset_password_token.user.email,
    }

    # Renderizado del contenido HTML y texto plano del mensaje
    html_message = render_to_string("backend/email.html", context=context)
    plain_message = strip_tags(html_message)

    # Configuración y envío del correo electrónico
    msg = EmailMultiAlternatives(
        subject="Solicitud de restablecimiento de contraseña",
        body=plain_message,
        from_email='no-reply@tu-dominio.com',  # Asegúrate de configurar correctamente el email
        to=[reset_password_token.user.email],
    )
    msg.attach_alternative(html_message, "text/html")
    msg.send()