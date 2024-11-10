from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from src.account.models import User
from .address_inline import AddressInline

@admin.register(User)
class UserAdmin(UserAdmin):
    list_display = ('first_name', 'phone', 'cpf',)
    search_fields = ('username', 'email', 'cpf')
    list_filter = ('is_active', 'is_staff')
    inlines = [AddressInline]
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {'fields': ('phone', 'cpf',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Custom Fields', {'fields': ('phone', 'cpf',)}),
    ) 