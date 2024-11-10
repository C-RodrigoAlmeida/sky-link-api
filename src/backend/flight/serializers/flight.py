from rest_framework import serializers
from src.backend.flight.models import Flight

class FlightSerializer(serializers.ModelSerializer):
    origin = serializers.CharField(read_only=True)
    destination = serializers.CharField(read_only=True)
    duration = serializers.IntegerField(read_only=True)

    class Meta:
        model = Flight
        fields = ['id', 'airline', 'origin', 'destination', 'duration']
        read_only_fields = ['id'] 