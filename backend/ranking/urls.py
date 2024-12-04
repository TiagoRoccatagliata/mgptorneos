from django.urls import path
from . import views

urlpatterns = [
    path('', views.PlayerRankingListCreateView.as_view(), name='ranking_list_create'),
    path('<int:pk>/', views.PlayerRankingDetailView.as_view(), name='ranking_detail'),
]