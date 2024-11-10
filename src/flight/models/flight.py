from django.db import models
from .airline_company import AirlineCompany
from django.utils.functional import cached_property

class Flight(models.Model):
    airline = models.ForeignKey(
        AirlineCompany, on_delete=models.CASCADE, related_name="flights"
    )

    @cached_property
    def destination(self):
        last_itinerary = self.itineraries.get(expected_departure_time__isnull=True)
        return last_itinerary.gate.airport.city if last_itinerary else None

    @cached_property
    def origin(self):
        first_itinerary = self.itineraries.get(expected_arrival_time__isnull=True)
        return first_itinerary.gate.airport.city if first_itinerary else None

    @cached_property
    def duration(self):
        first_itinerary = self.itineraries.get(expected_arrival_time__isnull=True)
        last_itinerary = self.itineraries.get(expected_departure_time__isnull=True)
        if first_itinerary and last_itinerary and first_itinerary.expected_departure_time and last_itinerary.expected_arrival_time:
            return (last_itinerary.expected_arrival_time - first_itinerary.expected_departure_time).total_seconds() / 60
        
        return None

    def __str__(self) -> str:
        return f"Flight {self.id} by {self.airline.name}"
