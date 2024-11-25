from rest_framework import serializers
from src.backend.flight.models import Seat

class BaseSeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ['id', 'flight', 'seat_class', 'price', 'code']
        read_only_fields = ['id']

class SeatSerializer(BaseSeatSerializer):
    is_occupied = serializers.BooleanField(read_only=True)
    class Meta(BaseSeatSerializer.Meta):
        fields = [*BaseSeatSerializer.Meta.fields, 'is_occupied']

class SeatDetailsSerializer(serializers.ModelSerializer):
    class Meta(BaseSeatSerializer.Meta):
        pass