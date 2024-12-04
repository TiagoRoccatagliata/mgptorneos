# Generated by Django 5.1.3 on 2024-12-03 14:40

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('tournaments', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='club',
            name='user',
            field=models.OneToOneField(limit_choices_to={'role': 'club'}, on_delete=django.db.models.deletion.CASCADE, related_name='club_info', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='playerstats',
            name='user',
            field=models.OneToOneField(limit_choices_to={'role': 'player'}, on_delete=django.db.models.deletion.CASCADE, related_name='player_stats_tournaments', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='tournament',
            name='created_by',
            field=models.ForeignKey(limit_choices_to={'role__in': ['club', 'admin']}, on_delete=django.db.models.deletion.CASCADE, related_name='tournaments_created', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='tournamentregistration',
            name='player',
            field=models.ForeignKey(limit_choices_to={'role': 'player'}, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='tournamentregistration',
            name='tournament',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tournaments.tournament'),
        ),
    ]