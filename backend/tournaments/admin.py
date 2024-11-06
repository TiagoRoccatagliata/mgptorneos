from django.contrib import admin
from .models import Club, PlayerStats, Tournament, TournamentRegistration

admin.site.register(Club)
admin.site.register(PlayerStats)
admin.site.register(Tournament)
admin.site.register(TournamentRegistration)