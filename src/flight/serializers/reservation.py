from rest_framework import serializers
from src.flight.models import Reservation

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id', 'user', 'seat', 'insurance']
        read_only_fields = ['id'] 