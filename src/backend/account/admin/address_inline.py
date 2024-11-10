from django.contrib import admin
from src.backend.account.models import Address

class AddressInline(admin.TabularInline):
    model = Address
    fields = ('street', 'neighborhood', 'city', 'state', 'country', 'zip_code') 