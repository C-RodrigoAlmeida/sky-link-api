from rest_framework import serializers
from src.backend.airport.models import Gate

class GateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gate
        fields = ['id', 'airport', 'code', 'service_fee']
        read_only_fields = ['id'] 