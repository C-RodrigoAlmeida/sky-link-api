from django.contrib import admin
from src.backend.flight.models import BaggageType

@admin.register(BaggageType)
class BaggageTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'label', 'max_weight', 'price')
    list_filter = ('max_weight', 'price')