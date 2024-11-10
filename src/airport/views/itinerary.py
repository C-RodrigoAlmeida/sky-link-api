from rest_framework import viewsets
from src.airport.models import Itinerary
from src.airport.serializers.itinerary import ItinerarySerializer
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

@extend_schema(tags=['Itineraries'])
class ItineraryViewSet(viewsets.ModelViewSet):
    queryset = Itinerary.objects.all()
    serializer_class = ItinerarySerializer
    permission_classes = [IsAuthenticated] 