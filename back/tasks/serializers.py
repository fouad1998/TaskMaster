
from os import read

from rest_framework import serializers

from .models import Task


class TaskSerializer(serializers.ModelSerializer):
   points = serializers.SerializerMethodField()

   class Meta:
      model = Task
      fields = '__all__'  # or specify the fields manually
      read_only_fields = ['points', 'created_at', 'updated_at' ,'user', 'completed']
      
   def get_points(self, obj):
      return obj.points
   
   def create(self, validated_data):
      user = self.context['request'].user
      validated_data['user'] = user
      return super().create(validated_data)

