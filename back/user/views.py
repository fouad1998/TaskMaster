from django.contrib.auth.models import User
from rest_framework import authentication, generics
from rest_framework.permissions import IsAuthenticated

from .serializers import UserRegistrationSerializer, UserSerializer


class UserDetailAPIView(generics.RetrieveAPIView):
   queryset = User.objects.all()
   serializer_class = UserSerializer
   lookup_field = 'pk'  # Or 'username' if you want to use username as the lookup field
   
   def get_object(self):
      return User.objects.get(pk=self.request.user.pk)


user_detail_view = UserDetailAPIView.as_view()
   
   
class UserListAPIView(generics.ListAPIView):
   queryset = User.objects.all()
   serializer_class = UserSerializer

user_list_view = UserListAPIView.as_view()


class UserRegistrationAPIView(generics.CreateAPIView):
   queryset = User.objects.all()
   serializer_class = UserRegistrationSerializer
   authentication_classes = []
   permission_classes = []
   
user_registration_view = UserRegistrationAPIView.as_view()