from rest_framework import viewsets
from src.backend.airport.models.itinerary import Itinerary
from src.backend.flight.models.seat import Seat
from src.backend.flight.models import Flight
from src.backend.flight.serializers.flight import FlightSerializer, RetrieveFlightSerializer
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema
from django.db.models import Prefetch, F

@extend_schema(tags=['Flights'])
class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    permission_classes = [IsAuthenticated] 



    def get_serializer_class(self) -> RetrieveFlightSerializer | FlightSerializer:
        if self.action == 'retrieve':
            return RetrieveFlightSerializer
        
        return FlightSerializer


    def get_queryset(self):
        queryset = Flight.objects.annotate_departure_time().annotate_arrival_time()

        if self.action == 'retrieve':
            queryset = queryset.prefetch_related(
                Prefetch('seats', queryset=Seat.objects.order_by('id').all()), 
                Prefetch('itineraries', queryset=Itinerary.objects.order_by(F('expected_departure_time').asc(nulls_last=True)).all())
            )
        
        return queryset.order_by('annotated_expected_departure_time')
