from rest_framework import viewsets
from src.backend.flight.models import Flight
from src.backend.flight.serializers.flight import FlightSerializer
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

@extend_schema(tags=['Flights'])
class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    permission_classes = [IsAuthenticated] 