from rest_framework import serializers
from src.backend.account.models import Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'user', 'street', 'neighborhood', 'city', 
                 'state', 'country', 'zip_code']
        read_only_fields = ['id'] 