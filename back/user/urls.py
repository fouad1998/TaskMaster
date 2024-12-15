from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import user_detail_view

urlpatterns = [
  path('<int:pk>/', user_detail_view)
]
