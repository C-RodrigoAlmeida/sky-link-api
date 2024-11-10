from django.utils.functional import cached_property
from django.db import models
from django.db.models import F, Q
from src.flight.models import Flight
from .gate import Gate

class Itinerary(models.Model):
    flight = models.ForeignKey(
        Flight, on_delete=models.CASCADE, related_name="itineraries"
    )
    gate = models.ForeignKey(
        Gate, on_delete=models.CASCADE, related_name="itineraries"
    )

    expected_departure_time = models.DateTimeField(null=True, blank=True)
    expected_arrival_time = models.DateTimeField(null=True, blank=True)

    @cached_property
    def is_destination(self):
        return self.expected_arrival_time is not None and self.expected_departure_time is None

    @cached_property
    def is_origin(self):
        return self.expected_departure_time is not None and self.expected_arrival_time is None
    

    def __str__(self) -> str:
        return f"Itinerary for Flight {self.flight.id}"

    class Meta:
        verbose_name = 'Itinerary'
        verbose_name_plural = 'Itineraries'
        constraints = [
            models.CheckConstraint(
                check=Q(expected_departure_time__gt=F("expected_arrival_time")) | Q(expected_departure_time__isnull=True),
                name="departure_after_arrival"
            ),
            models.CheckConstraint(
                check=Q(expected_departure_time__isnull=False) | Q(expected_arrival_time__isnull=False),
                name="departure_or_arrival_not_null"
            ),
        ]
