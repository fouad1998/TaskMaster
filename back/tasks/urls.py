from django.urls import path

from . import views

# /api/products/
urlpatterns = [
    path('', views.task_list_create_view),
    path('<int:pk>/update/', views.task_update_view),
    path('<int:pk>/delete/', views.task_destroy_view),
    path('<int:pk>/complete/', views.task_complete_view),
    path('<int:pk>/', views.task_detail_view)
]