from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Tournament(models.Model):
    name = models.CharField(max_length=255, verbose_name="Nombre del Torneo")
    description = models.TextField(blank=True, verbose_name="Descripción")
    start_date = models.DateField(verbose_name="Fecha de Inicio")
    end_date = models.DateField(verbose_name="Fecha de Fin")
    creator = models.CharField(max_length=255, default='admin')  # Ajusta el valor según tu necesidad
    is_private = models.BooleanField(default=False, verbose_name="¿Es Privado?")
    club_name = models.CharField(max_length=255, blank=True, null=True, verbose_name="Nombre del Club")
    access_code = models.CharField(max_length=20, blank=True, null=True, verbose_name="Código de Acceso para Privados")

    def __str__(self):
        return self.name