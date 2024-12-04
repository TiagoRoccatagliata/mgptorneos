from django.urls import path
from . import views

urlpatterns = [
    path('', views.CalendarEventListCreateView.as_view(), name='calendar_list_create'),
    path('<int:pk>/', views.CalendarEventDetailView.as_view(), name='calendar_detail'),
]