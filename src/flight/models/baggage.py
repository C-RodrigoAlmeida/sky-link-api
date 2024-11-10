from django.db import models
from src.flight.models.reservation import Reservation


class Baggage(models.Model):
    reservation = models.ForeignKey(
        Reservation, on_delete=models.CASCADE, related_name="baggages"
    )
    max_weight = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self) -> str:
        return f"Baggage {self.id}"
