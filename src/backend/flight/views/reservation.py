from rest_framework import viewsets
from src.backend.flight.models import Reservation
from src.backend.flight.serializers.reservation import ReservationSerializer, RetrieveReservationSerializer
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

@extend_schema(tags=['Reservations'])
class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self) -> ReservationSerializer | RetrieveReservationSerializer:
        if self.action in ['retrieve', 'list']:
            return RetrieveReservationSerializer

        return ReservationSerializer

    def get_queryset(self) -> Reservation:
        return Reservation.objects.filter(user=self.request.user) 

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)