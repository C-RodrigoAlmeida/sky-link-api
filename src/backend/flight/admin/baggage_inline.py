from django.contrib import admin
from src.backend.flight.models import Baggage

class BaggageInline(admin.TabularInline):
    model = Baggage
    fields = ('max_weight', 'price') 