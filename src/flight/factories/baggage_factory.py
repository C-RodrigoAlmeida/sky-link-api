import factory
from src.flight.factories.reservation_factory import ReservationFactory
from src.flight.models import Baggage


class BaggageFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Baggage

    reservation = factory.SubFactory(ReservationFactory)
    max_weight = factory.Iterator([10, 23, 32])
    price = factory.Iterator([50.00, 100.00, 150.00]) 