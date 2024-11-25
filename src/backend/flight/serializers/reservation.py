from rest_framework import serializers
from src.backend.flight.serializers.seat import SeatDetailsSerializer
from src.backend.flight.models import Reservation

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['id', 'user', 'seat', 'insurance']
        read_only_fields = ['id', 'user']    

class RetrieveReservationSerializer(ReservationSerializer):
    seat = SeatDetailsSerializer()
    class Meta(ReservationSerializer.Meta):
        pass

