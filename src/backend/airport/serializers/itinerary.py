from rest_framework import serializers
from src.backend.airport.serializers.gate import GateSerializer
from src.backend.airport.models import Itinerary

class ItinerarySerializer(serializers.ModelSerializer):
    gate = GateSerializer()
    class Meta:
        model = Itinerary
        fields = ['id', 'flight', 'gate', 'expected_departure_time', 
                 'expected_arrival_time', 'is_origin', 'is_destination']
        read_only_fields = ['id', 'is_origin', 'is_destination'] 