from django.contrib import admin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'document_number', 'is_active', 'is_staff')
    search_fields = ('username', 'email', 'document_number')
    list_filter = ('is_active', 'is_staff')