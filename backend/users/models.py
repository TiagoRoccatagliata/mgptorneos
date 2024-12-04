from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class CustomUser(AbstractUser):
    """
    Modelo de usuario personalizado que extiende el modelo predeterminado de Django.
    Incluye campos adicionales como 'document_number' y 'phone_number'.
    """
    document_number = models.CharField(
        max_length=20,
        unique=True,
        verbose_name=_("Número de Documento"),
        help_text=_("Número único de identificación del usuario."),
    )
    phone_number = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        verbose_name=_("Número de Teléfono"),
        help_text=_("Número de teléfono opcional."),
    )

    class Meta:
        verbose_name = _("Usuario")
        verbose_name_plural = _("Usuarios")

    def __str__(self):
        return f"{self.username} ({self.document_number})"

    def full_name(self):
        """
        Retorna el nombre completo del usuario (first_name + last_name).
        """
        return f"{self.first_name} {self.last_name}".strip()

    @property
    def is_staff_member(self):
        """
        Verifica si el usuario pertenece al personal administrativo.
        """
        return self.is_staff