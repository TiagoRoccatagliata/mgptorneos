from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('register', RegisterViewset, basename='register')  # Cambia 'users' por 'register'
router.register('login', LoginViewset, basename='login')  # Cambia 'users' por 'register'

urlpatterns = router.urls