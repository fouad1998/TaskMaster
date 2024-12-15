from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
   path('auth/', obtain_auth_token),
   path('tasks/', include('tasks.urls')),
   path('user/', include('user.urls'))
]