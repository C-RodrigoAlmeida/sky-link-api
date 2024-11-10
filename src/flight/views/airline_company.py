from rest_framework import viewsets
from src.flight.models import AirlineCompany
from src.flight.serializers.airline_company import AirlineCompanySerializer
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

@extend_schema(tags=['Airlines'])
class AirlineCompanyViewSet(viewsets.ModelViewSet):
    queryset = AirlineCompany.objects.all()
    serializer_class = AirlineCompanySerializer
    permission_classes = [IsAuthenticated] 