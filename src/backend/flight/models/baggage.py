from django.db import models
from src.backend.flight.models.reservation import Reservation
from src.backend.flight.models.baggage_type import BaggageType

class Baggage(models.Model):
    baggage_type = models.ForeignKey(
        BaggageType, on_delete=models.CASCADE, related_name="entries"
    )
    reservation = models.ForeignKey(
        Reservation, on_delete=models.CASCADE, related_name="baggages"
    )

    def __str__(self) -> str:
        return f"Baggage {self.id}"
