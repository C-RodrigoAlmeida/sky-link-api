from rest_framework import viewsets
from src.backend.airport.models import Airport
from src.backend.airport.serializers.airport import AirportSerializer
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

@extend_schema(tags=['Airports'])
class AirportViewSet(viewsets.ModelViewSet):
    queryset = Airport.objects.all()
    serializer_class = AirportSerializer
    permission_classes = [IsAuthenticated] 