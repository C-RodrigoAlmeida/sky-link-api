from rest_framework import serializers
from src.backend.flight.models import Seat
from .reservation import ReservationSerializer

class SeatSerializer(serializers.ModelSerializer):
    is_occupied = serializers.BooleanField(read_only=True)
    class Meta:
        model = Seat
        fields = ['id', 'flight', 'seat_class', 'price', 'code', 'is_occupied']
        read_only_fields = ['id']