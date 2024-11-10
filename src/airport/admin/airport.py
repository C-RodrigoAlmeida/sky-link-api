from django.contrib import admin
from src.airport.models import Airport
from .gate_inline import GateInline

@admin.register(Airport)
class AirportAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'state', 'country')
    search_fields = ('name', 'city', 'state')
    list_filter = ('country', 'state')
    inlines = [GateInline] 