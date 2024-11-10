import factory
from src.backend.flight.models import Flight
from src.backend.flight.models import AirlineCompany
from faker import Faker
from datetime import timedelta

fake = Faker('pt_BR')

class FlightFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Flight

    airline = factory.Iterator(AirlineCompany.objects.all())

    @factory.post_generation
    def create_seats(self, create, extracted, **kwargs):
        from src.backend.flight.factories import SeatFactory
        
        if not create:
            return

        seat_classes = ['First', 'Business', 'Economy']
        seat_prices = [1200.00, 800.00, 400.00]
        seat_letters = ['A', 'B', 'C', 'D', 'E', 'F']

        for seat_class, price in zip(seat_classes, seat_prices):
            # Define the number of rows for each class
            if seat_class == 'First':
                rows = range(1, 3)  # 2 rows for First Class
            elif seat_class == 'Business':
                rows = range(3, 7)  # 4 rows for Business Class
            else:
                rows = range(7, 33)  # 26 rows for Economy Class

            for row in rows:
                for letter in seat_letters:
                    SeatFactory(
                        flight=self,
                        seat_class=seat_class,
                        price=price,
                        code=f"{row}{letter}"
                    )