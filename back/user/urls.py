from django.urls import path

from .views import user_detail_view, user_list_view

urlpatterns = [
  path('', user_detail_view),
  path('list/', user_list_view),
]
