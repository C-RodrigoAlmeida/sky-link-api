from django.contrib import admin
from src.flight.admin.baggage_inline import BaggageInline
from src.flight.models import Reservation

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('user', 'seat', 'insurance')
    list_filter = ('insurance', 'seat__flight__airline')
    search_fields = ('user__user__username', 'seat__flight__airline__name') 
    inlines = [BaggageInline,]