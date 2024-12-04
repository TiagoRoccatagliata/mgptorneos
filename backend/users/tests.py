from django.test import TestCase
from .models import CustomUser

class CustomUserTest(TestCase):
    def setUp(self):
        CustomUser.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="password123",
            document_number="12345678",
            phone_number="1234567890"
        )

    def test_user_creation(self):
        user = CustomUser.objects.get(username="testuser")
        self.assertEqual(user.document_number, "12345678")
        self.assertTrue(user.check_password("password123"))