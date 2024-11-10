from django.db import models

class AirlineCompany(models.Model):
    name = models.CharField(max_length=100)
    legal_name = models.CharField(max_length=150)
    cnpj = models.CharField(max_length=18, unique=True)
    email = models.EmailField(unique=True)

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = 'Airline Company'
        verbose_name_plural = 'Airline Companies'
