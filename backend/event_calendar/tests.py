from django.test import TestCase
from .models import CalendarEvent

class CalendarEventModelTest(TestCase):
    def setUp(self):
        CalendarEvent.objects.create(
            name="Prueba de Evento",
            description="Este es un evento de prueba.",
            start_date="2024-12-04 10:00:00",
            end_date="2024-12-04 12:00:00"
        )

    def test_calendar_event_creation(self):
        event = CalendarEvent.objects.get(name="Prueba de Evento")
        self.assertEqual(event.description, "Este es un evento de prueba.")