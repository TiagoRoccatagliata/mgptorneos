from django.test import TestCase
from users.models import CustomUser

class AuthTest(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="password123",
            document_number="12345678",
        )

    def test_user_login(self):
        response = self.client.post('/auth/login/', {
            'document_number': '12345678',
            'password': 'password123'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('token', response.data)

    def test_user_register(self):
        response = self.client.post('/auth/register/', {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'newpassword123',
            'document_number': '87654321',
            'phone_number': '1234567890'
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn('token', response.data)