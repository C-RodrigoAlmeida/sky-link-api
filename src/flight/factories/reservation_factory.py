import factory
from src.flight.models import Reservation
from src.account.factories import UserFactory
from .seat_factory import SeatFactory
import random

class ReservationFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Reservation

    user = factory.SubFactory(UserFactory)
    seat = factory.SubFactory(SeatFactory)
    insurance = factory.Faker('boolean', chance_of_getting_true=30)

    @factory.post_generation
    def baggages(self, create, extracted, **kwargs):
        from .baggage_factory import BaggageFactory
        
        if not create:
            return  # Simple build, do nothing

        # Generate a random number of baggages (0 to 5)
        baggage_count = random.randint(0, 5)
        for _ in range(baggage_count):
            BaggageFactory(reservation=self) 