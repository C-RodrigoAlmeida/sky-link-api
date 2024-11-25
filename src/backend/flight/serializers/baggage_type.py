from rest_framework import serializers
from src.backend.flight.models.baggage_type import BaggageType

class BaggageTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaggageType
        fields = ['id', 'label', 'max_weight', 'price']
        read_only_fields = ['id']