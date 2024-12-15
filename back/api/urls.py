from django.urls import include, path
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
   path('auth/', csrf_exempt(obtain_auth_token)),
   path('tasks/', include('tasks.urls')),
   path('user/', include('user.urls'))
]