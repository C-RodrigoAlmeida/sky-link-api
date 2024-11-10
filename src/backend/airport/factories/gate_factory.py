import factory
from src.airport.models import Gate
from .airport_factory import AirportFactory

class GateFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Gate

    airport = factory.SubFactory(AirportFactory)
    code = factory.Sequence(lambda n: f"{n + 1:02d}")
    service_fee = factory.Iterator([25.00, 35.00, 45.00]) 