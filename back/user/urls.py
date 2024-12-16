from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from .views import user_detail_view, user_list_view, user_registration_view

urlpatterns = [
  path('', user_detail_view),
  path('list/', user_list_view),
  path("register/", csrf_exempt(user_registration_view))
]
