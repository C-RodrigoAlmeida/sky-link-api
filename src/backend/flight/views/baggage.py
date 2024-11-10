from rest_framework import viewsets
from src.backend.flight.models import Baggage
from src.backend.flight.serializers.baggage import BaggageSerializer
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

@extend_schema(tags=['Baggage'])
class BaggageViewSet(viewsets.ModelViewSet):
    queryset = Baggage.objects.all()
    serializer_class = BaggageSerializer
    permission_classes = [IsAuthenticated] 