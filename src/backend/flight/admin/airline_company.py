from django.contrib import admin
from src.backend.flight.models import AirlineCompany

@admin.register(AirlineCompany)
class AirlineCompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'legal_name', 'cnpj', 'email')
    search_fields = ('name', 'legal_name', 'cnpj') 