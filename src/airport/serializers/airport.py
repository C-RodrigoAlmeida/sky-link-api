from rest_framework import serializers
from src.airport.models import Airport

class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airport
        fields = ['id', 'name', 'city', 'state', 'country']
        read_only_fields = ['id'] 