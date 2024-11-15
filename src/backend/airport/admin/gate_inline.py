from django.contrib import admin
from src.backend.airport.models import Gate

class GateInline(admin.TabularInline):
    model = Gate
    fields = ('code', 'service_fee') 