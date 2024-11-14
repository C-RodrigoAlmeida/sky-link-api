from django.db import models
from src.backend.account.models import User
from .seat import Seat

class Reservation(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="reservations"
    )
    seat = models.OneToOneField(
        Seat, on_delete=models.CASCADE, related_name="reservation"
    )
    insurance = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"Reservation {self.id} for {self.user} on {self.seat}"
