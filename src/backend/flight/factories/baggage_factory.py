import factory
from src.backend.flight.factories.reservation_factory import ReservationFactory

from src.backend.flight.factories.baggage_type_factory import BaggageTypeFactory
from src.backend.flight.models import Baggage


class BaggageFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Baggage

    reservation = factory.SubFactory(ReservationFactory)
    baggage_type = factory.SubFactory(BaggageTypeFactory)