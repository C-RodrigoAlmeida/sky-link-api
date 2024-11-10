import factory
from django.db import models
from django.db.models import Q, F
from datetime import timedelta
from src.airport.models import Itinerary
from src.flight.factories import FlightFactory
from .gate_factory import GateFactory

class ItineraryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Itinerary

    flight = factory.SubFactory(FlightFactory)
    gate = factory.SubFactory(GateFactory)
    expected_departure_time = factory.Faker('future_datetime', end_date='+30d')
    expected_arrival_time = factory.LazyAttribute(
        lambda o: o.expected_departure_time + timedelta(hours=2)
    ) 