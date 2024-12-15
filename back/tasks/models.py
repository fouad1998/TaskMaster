import re

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=200, blank=False,null=False)
    description = models.TextField()
    comlexity = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    duration = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(60*8)])
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id} - {self.title}"
    
    @property
    def points(self):
        complexity_points =  float (self.comlexity) * 0.5
        duration_points  =  float(self.duration) * 0.2
        return int (complexity_points + duration_points)