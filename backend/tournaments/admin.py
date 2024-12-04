from django.contrib import admin
from .models import Tournament

@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = ('name', 'start_date', 'end_date', 'creator', 'is_private', 'club_name')
    search_fields = ('name', 'creator', 'club_name')
    list_filter = ('is_private',)