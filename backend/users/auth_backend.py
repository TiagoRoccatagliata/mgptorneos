from django.contrib.auth import get_user_model
User = get_user_model()

class DocumentAuthBackend:
    def authenticate(self, request, document_number=None, password=None, **kwargs):
        try:
            user = User.objects.get(document_number=document_number)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None