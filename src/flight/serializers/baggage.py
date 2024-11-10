from rest_framework import serializers
from src.flight.models import Baggage

class BaggageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Baggage
        fields = ['id', 'reservation', 'max_weight', 'price']
        read_only_fields = ['id'] 