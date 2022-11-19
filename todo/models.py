from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(max_length=50)
    link = models.URLField(max_length=200)
    users = models.ManyToManyField(User)


class Todo(models.Model):
    project =