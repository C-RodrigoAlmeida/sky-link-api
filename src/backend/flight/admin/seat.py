from django.contrib import admin
from src.backend.flight.models import Seat

@admin.register(Seat)
class SeatAdmin(admin.ModelAdmin):
    list_display = ('flight', 'seat_class', 'price')
    list_filter = ('seat_class', 'flight__airline')
    search_fields = ('flight__airline__name',) 