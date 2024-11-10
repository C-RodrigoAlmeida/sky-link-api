from rest_framework import viewsets
from src.backend.airport.models import Gate
from src.backend.airport.serializers.gate import GateSerializer
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

@extend_schema(tags=['Gates'])
class GateViewSet(viewsets.ModelViewSet):
    queryset = Gate.objects.all()
    serializer_class = GateSerializer
    permission_classes = [IsAuthenticated] 