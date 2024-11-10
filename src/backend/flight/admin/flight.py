from django.contrib import admin
from src.backend.flight.models import Flight
from .seat_inline import SeatInline

@admin.register(Flight)
class FlightAdmin(admin.ModelAdmin):
    list_display = ('id', 'airline', 'origin', 'destination', 'duration')
    list_filter = ('airline',)
    search_fields = ('airline__name',)
    inlines = [SeatInline,] 