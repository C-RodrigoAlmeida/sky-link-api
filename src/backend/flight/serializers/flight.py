from rest_framework import serializers
from src.backend.flight.serializers.baggage import BaggageSerializer
from src.backend.airport.serializers.itinerary import ItinerarySerializer
from src.backend.flight.models import Flight
from src.backend.flight.serializers.seat import SeatSerializer

class FlightSerializer(serializers.ModelSerializer):
    origin = serializers.CharField(read_only=True)
    destination = serializers.CharField(read_only=True)
    duration = serializers.IntegerField(read_only=True)
    departure = serializers.DateTimeField(read_only=True, source='annotated_expected_departure_time')
    arrival = serializers.DateTimeField(read_only=True, source='annotated_expected_arrival_time')

    class Meta:
        model = Flight
        fields = ['id', 'airline', 'origin', 'destination', 'duration', 'departure', 'arrival']
        read_only_fields = ['id'] 

class RetrieveFlightSerializer(FlightSerializer):
    seats = SeatSerializer(read_only=True, many=True)
    itineraries = ItinerarySerializer(read_only=True, many=True)
    class Meta(FlightSerializer.Meta):
        fields = [*FlightSerializer.Meta.fields, 'seats', 'itineraries']