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
    ('admin', 'Admin'),
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


# Modelo para estadísticas de jugadores
class PlayerStats(models.Model):
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'player'},
        related_name="player_stats_users"
    )
    matches_played = models.PositiveIntegerField(default=0, verbose_name="Partidos Jugados")
    matches_won = models.PositiveIntegerField(default=0, verbose_name="Partidos Ganados")
    points_scored = models.PositiveIntegerField(default=0, verbose_name="Puntos Obtenidos")
    category = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        verbose_name="Categoría",
        choices=[('4ta', '4ta'), ('5ta', '5ta'), ('6ta', '6ta'), ('7ma', '7ma')]
    )

    def win_rate(self):
        """ Calcula la tasa de victorias como porcentaje. """
        if self.matches_played > 0:
            return round((self.matches_won / self.matches_played) * 100, 2)
        return 0

    class Meta:
        verbose_name = "Estadística de Jugador"
        verbose_name_plural = "Estadísticas de Jugadores"

    def __str__(self):
        return f"Stats for {self.user.document_number} - {self.points_scored} puntos"


# Receiver para el reseteo de contraseña
@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    sitelink = "http://localhost:5173/"  # Cambia esto en producción
    full_link = f"{sitelink}password-reset/{reset_password_token.key}"

    context = {
        'full_link': full_link,
        'email_adress': reset_password_token.user.email,
    }

    html_message = render_to_string("backend/email.html", context=context)
    plain_message = strip_tags(html_message)

    msg = EmailMultiAlternatives(
        subject="Solicitud de restablecimiento de contraseña",
        body=plain_message,
        from_email='no-reply@tu-dominio.com',
        to=[reset_password_token.user.email],
    )
    msg.attach_alternative(html_message, "text/html")
    msg.send()