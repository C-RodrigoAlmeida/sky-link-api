from django.contrib import admin
from src.airport.models import Itinerary

@admin.register(Itinerary)
class ItineraryAdmin(admin.ModelAdmin):
    list_display = ('flight', 'gate', 'expected_departure_time', 'expected_arrival_time', 'is_origin', 'is_destination')
    list_filter = ('gate__airport',)
    search_fields = ('flight__airline__name', 'gate__airport__name') 