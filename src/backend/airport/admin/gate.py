from django.contrib import admin
from src.backend.airport.models import Gate
from .itinerary_inline import ItineraryInline

@admin.register(Gate)
class GateAdmin(admin.ModelAdmin):
    list_display = ('code', 'airport', 'service_fee')
    search_fields = ('code', 'airport__name')
    list_filter = ('airport__country',)
    inlines = [ItineraryInline] 