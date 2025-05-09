from django.urls import path
from .views import LogListCreateView

urlpatterns = [
    path('logs/', LogListCreateView.as_view(), name='log-list'),
]
