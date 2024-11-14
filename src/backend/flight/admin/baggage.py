from django.contrib import admin
from src.backend.flight.models import Baggage

@admin.register(Baggage)
class BaggageAdmin(admin.ModelAdmin):
    list_display = ('id', 'reservation__seat__code', 'reservation__seat__flight__id', 'baggage_type__label')