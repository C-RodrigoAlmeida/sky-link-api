from django.db import models
from .airport import Airport

class Gate(models.Model):
    airport = models.ForeignKey(
        Airport, on_delete=models.CASCADE, related_name="gates"
    )
    code = models.CharField(max_length=10, unique=True)
    service_fee = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self) -> str:
        return f"Gate {self.code} at {self.airport.name}"
