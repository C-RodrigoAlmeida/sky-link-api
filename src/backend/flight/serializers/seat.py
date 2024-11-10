from rest_framework import serializers
from src.backend.flight.models import Seat

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ['id', 'flight', 'seat_class', 'price', 'code']
        read_only_fields = ['id'] 