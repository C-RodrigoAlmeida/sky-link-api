from django.contrib import admin
from src.backend.airport.models import Itinerary

class ItineraryInline(admin.TabularInline):
    model = Itinerary
    fields = ('is_origin', 'is_destination', 'expected_departure_time', 'expected_arrival_time')