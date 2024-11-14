from django.db import models
from .flight import Flight
from django.utils.functional import cached_property

class Seat(models.Model):
    flight = models.ForeignKey(
        Flight, on_delete=models.CASCADE, related_name="seats"
    )
    seat_class = models.CharField(max_length=20)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    code = models.CharField(max_length=4)

    class Meta:
        ordering = ['code']
        unique_together = ['flight', 'code']

    def __str__(self) -> str:
        return f"{self.code} ({self.seat_class}) - ${self.price}"

    @cached_property
    def is_occupied(self) -> bool:
        return bool(getattr(self, 'reservation', None))
