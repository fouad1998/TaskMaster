from django.contrib.auth.models import User
from rest_framework import serializers
from tasks.models import Task


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