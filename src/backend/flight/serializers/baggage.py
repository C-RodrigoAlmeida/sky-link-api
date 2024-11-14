from rest_framework import serializers
from src.backend.flight.models import Baggage
from src.backend.flight.serializers.baggage_type import BaggageTypeSerializer

class BaggageSerializer(serializers.ModelSerializer):
    type = BaggageTypeSerializer(source='baggage_type')
    class Meta:
        model = Baggage
        fields = ['id', 'reservation', 'type']
        read_only_fields = ['id'] 