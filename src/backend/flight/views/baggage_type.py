from rest_framework import viewsets
from src.backend.flight.models import BaggageType
from src.backend.flight.serializers.baggage_type import BaggageTypeSerializer
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

@extend_schema(tags=['BaggageType'])
class BaggageTypeViewSet(viewsets.ModelViewSet):
    queryset = BaggageType.objects.all()
    serializer_class = BaggageTypeSerializer
    permission_classes = [IsAuthenticated] 