from django.db import models
from src.account.models import User
from .seat import Seat

class Reservation(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="reservations"
    )
    seat = models.ForeignKey(
        Seat, on_delete=models.CASCADE, related_name="reservations"
    )
    insurance = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"Reservation {self.id} for {self.user}"
