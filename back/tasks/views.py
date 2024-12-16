# from django.http import Http404

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer


class TaskListCreateAPIView(generics.ListCreateAPIView):
   queryset = Task.objects.all()
   serializer_class = TaskSerializer
  
   def list(self, request, *args, **kwargs):
      queryset = Task.objects.all().filter(user=request.user)
      serializer = self.get_serializer(queryset, many=True, context={'request': request})
      return Response(serializer.data)
   
   def perform_create(self, serializer):
      return serializer.save(user=self.request.user)

task_list_create_view = TaskListCreateAPIView.as_view()

class TaskDetailAPIView(generics.RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

task_detail_view = TaskDetailAPIView.as_view()

class TaskUpdateAPIView(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    lookup_field = 'pk'

    def perform_update(self, serializer):
      super().perform_update(serializer)

task_update_view = TaskUpdateAPIView.as_view()


class TaskDestroyAPIView(generics.DestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    lookup_field = 'pk'

    def perform_destroy(self, instance):
        # instance 
        super().perform_destroy(instance)

task_destroy_view = TaskDestroyAPIView.as_view()


class TaskCompleteAPIView(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    lookup_field = 'pk'

    def perform_update(self, serializer):
        serializer.save(completed=True)
        
task_complete_view = TaskCompleteAPIView.as_view()