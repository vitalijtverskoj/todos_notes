from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(blank=True, verbose_name="email address", unique=True)

    def __str__(self):
        return f'{self.last_name} {self.first_name}'
