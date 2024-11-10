from django.contrib import admin
from src.flight.models import Seat

class SeatInline(admin.TabularInline):
    model = Seat
    fields = ('seat_class', 'price') 