from rest_framework import serializers
from src.backend.account.models import User
from .address import AddressSerializer

class UserDetailSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 
                 'phone', 'cpf', 'birth_date', 'passport_number', 'addresses']
        read_only_fields = ['id'] 