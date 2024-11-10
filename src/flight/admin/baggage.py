from django.contrib import admin
from src.flight.models import Baggage

@admin.register(Baggage)
class BaggageAdmin(admin.ModelAdmin):
    list_display = ('reservation', 'max_weight', 'price')
    list_filter = ('max_weight',)