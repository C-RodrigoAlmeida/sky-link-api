from django.db import models
from django_countries.fields import CountryField
from .user import User

class Address(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="addresses"
    )
    street = models.CharField(max_length=100)
    neighborhood = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    country = CountryField()
    zip_code = models.CharField(max_length=10)


    def __str__(self) -> str:
        return f"{self.street}, {self.city}, {self.state}"


    class Meta:
        verbose_name = 'Address'
        verbose_name_plural = 'Addresses'