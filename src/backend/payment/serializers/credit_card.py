from rest_framework import serializers
from src.backend.payment.models import CreditCard

class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = ['id', 'user', 'card_number', 'cardholder_name', 'expiration_date', 'cvv']
        read_only_fields = ['id', 'user']

    def create(self, validated_data):
        return CreditCard.objects.create(**validated_data) 