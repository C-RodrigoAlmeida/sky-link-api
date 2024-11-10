from rest_framework import serializers
from src.airport.models import Itinerary

class ItinerarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Itinerary
        fields = ['id', 'flight', 'gate', 'expected_departure_time', 
                 'expected_arrival_time', 'is_origin', 'is_destination']
        read_only_fields = ['id', 'is_origin', 'is_destination'] 