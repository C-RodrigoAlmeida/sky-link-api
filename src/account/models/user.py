from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    phone = models.CharField(max_length=15, null=True, blank=True)
    cpf = models.CharField(max_length=14, unique=True, null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    passport_number = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}"
