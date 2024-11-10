import factory
from src.backend.flight.models import Seat
from src.backend.flight.factories.flight_factory import FlightFactory

class SeatFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Seat

    flight = factory.SubFactory(FlightFactory)
    seat_class = factory.Iterator(['First', 'Business', 'Economy'])
    price = factory.Iterator([1200.00, 800.00, 400.00])
    code = factory.Sequence(lambda n: f"{n//6 + 1}{chr(65 + n%6)}") 