from django.contrib import admin
from .models import CustomUser, PlayerStats

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('document_number', 'email', 'role')
    list_filter = ('role',)

@admin.register(PlayerStats)
class PlayerStatsAdmin(admin.ModelAdmin):
    list_display = ('user', 'matches_played', 'matches_won', 'points_scored', 'category')
    search_fields = ('user__document_number', 'user__email')