from rest_framework import serializers
from src.backend.account.models import Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'user', 'street', 'neighborhood', 'city', 
                 'state', 'country', 'zip_code']
        read_only_fields = ['id', 'user']

    def create(self, validated_data):
        # Get the user from the request context
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data) 