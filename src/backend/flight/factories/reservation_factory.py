import factory
from src.backend.flight.models import Reservation
from src.backend.account.factories import UserFactory
from .seat_factory import SeatFactory
import random

class ReservationFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Reservation

    user = factory.SubFactory(UserFactory)
    seat = factory.SubFactory(SeatFactory)
    insurance = factory.Faker('boolean', chance_of_getting_true=30)
