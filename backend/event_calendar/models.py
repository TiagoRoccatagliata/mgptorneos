from django.db import models

class CalendarEvent(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nombre del Evento")
    description = models.TextField(blank=True, verbose_name="Descripción")
    start_date = models.DateTimeField(verbose_name="Fecha de Inicio")
    end_date = models.DateTimeField(verbose_name="Fecha de Fin")

    def __str__(self):
        return self.name