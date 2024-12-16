from django.contrib.auth.models import User
from rest_framework import serializers
from tasks.models import Task


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
        )
        return user


class UserSerializer(serializers.ModelSerializer):
   xp = serializers.SerializerMethodField()
   level = serializers.SerializerMethodField()
   
   class Meta:
      model = User
      fields = ['id', 'username', 'email', 'first_name', 'last_name', 'xp', 'level']
      
   def get_xp(self, obj):
      tasks = Task.objects.filter(user=obj, completed=True)
      return sum([task.points for task in tasks]) or 0
   
   def get_level(self, obj):
      level = 1
      xp = self.get_xp(obj)
      while xp >= level * 50:
         xp -= level * 50
         level += 1
         
      return level