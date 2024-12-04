from django.urls import path
from . import views

urlpatterns = [
    path('', views.TournamentListCreateView.as_view(), name='tournament_list_create'),
    path('<int:pk>/', views.TournamentDetailView.as_view(), name='tournament_detail'),
    path('<int:pk>/enroll/', views.EnrollInTournamentView.as_view(), name='tournament_enroll'),
]