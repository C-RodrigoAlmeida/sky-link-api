from rest_framework import serializers
from src.backend.airport.models import Gate
from src.backend.airport.serializers.airport import AirportSerializer

class GateSerializer(serializers.ModelSerializer):
    airport = AirportSerializer()
    class Meta:
        model = Gate
        fields = ['id', 'airport', 'code', 'service_fee']
        read_only_fields = ['id'] 