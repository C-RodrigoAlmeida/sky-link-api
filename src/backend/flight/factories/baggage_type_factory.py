import factory
from src.backend.flight.factories.reservation_factory import ReservationFactory
from src.backend.flight.models import BaggageType


class BaggageTypeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = BaggageType

    label = factory.Iterator(['Small', 'Medium', 'Large'])
    max_weight = factory.Iterator([10, 23, 32])
    price = factory.Iterator([50.00, 100.00, 150.00]) 