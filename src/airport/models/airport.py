from django.db import models
from django_countries.fields import CountryField

class Airport(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    country = CountryField()

    def __str__(self) -> str:
        return f"{self.name} Airport"
