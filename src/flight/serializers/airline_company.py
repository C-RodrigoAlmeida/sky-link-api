from rest_framework import serializers
from src.flight.models import AirlineCompany

class AirlineCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = AirlineCompany
        fields = ['id', 'name', 'legal_name', 'cnpj', 'email']
        read_only_fields = ['id'] 