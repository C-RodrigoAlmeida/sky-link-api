from django.contrib import admin
from src.backend.payment.models import CreditCard

@admin.register(CreditCard)
class CreditCardAdmin(admin.ModelAdmin):
    list_display = ('cardholder_name', 'card_number', 'expiration_date', 'user')
    search_fields = ('cardholder_name', 'card_number', 'user__username')
    list_filter = ('expiration_date', 'user') 