from django.contrib import admin
from src.backend.account.models import Address

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('street', 'city', 'state', 'country', 'user')
    search_fields = ('street', 'city', 'state')
    list_filter = ('country', 'state') 