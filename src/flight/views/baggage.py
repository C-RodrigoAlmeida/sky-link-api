from rest_framework import viewsets
from src.flight.models import Baggage
from src.flight.serializers.baggage import BaggageSerializer
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

@extend_schema(tags=['Baggage'])
class BaggageViewSet(viewsets.ModelViewSet):
    queryset = Baggage.objects.all()
    serializer_class = BaggageSerializer
    permission_classes = [IsAuthenticated] 