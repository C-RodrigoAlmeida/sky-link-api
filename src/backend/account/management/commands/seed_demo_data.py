from django.core.management.base import BaseCommand
from django.db.models import Q
from src.backend.account.factories import UserFactory, AddressFactory
from src.backend.flight.factories import (
    AirlineCompanyFactory, FlightFactory, ReservationFactory, BaggageFactory, BaggageTypeFactory
)
from src.backend.airport.factories import AirportFactory, GateFactory, ItineraryFactory
from tqdm import tqdm
import random
from datetime import timedelta, datetime
from django.utils.timezone import make_aware

class Command(BaseCommand):
    help = 'Seeds the database with demo data'
    
    def handle(self, *args, **kwargs):
        # Delete existing data
        self.stdout.write('Deleting existing data...')
        ReservationFactory._meta.model.objects.all().delete()
        ItineraryFactory._meta.model.objects.all().delete()
        BaggageFactory._meta.model.objects.all().delete()
        BaggageTypeFactory._meta.model.objects.all().delete()
        FlightFactory._meta.model.objects.all().delete()
        GateFactory._meta.model.objects.all().delete()
        AirportFactory._meta.model.objects.all().delete()
        AirlineCompanyFactory._meta.model.objects.all().delete()
        AddressFactory._meta.model.objects.all().delete()
        UserFactory._meta.model.objects.exclude(Q(is_staff=True) | Q(is_superuser=True)).all().delete()


        self.stdout.write('Creating new demo data...')

        self.stdout.write('Creating users...')
        users = UserFactory.create_batch(15)
        for user in tqdm(users, desc="Creating Users"):
            AddressFactory.create_batch(2, user=user)

        self.stdout.write('Creating airlines...')
        airlines = AirlineCompanyFactory.create_batch(5)

        airports = AirportFactory.create_batch(5)
        for airport in tqdm(airports, desc="Creating Airports and Gates"):
            GateFactory.create_batch(10, airport=airport)

        baggage_types = BaggageTypeFactory.create_batch(3)

        flights = []
        for airline in tqdm(airlines, desc="Creating Flights"):
            flights.extend(FlightFactory.create_batch(5, airline=airline))

        for flight in tqdm(flights, desc="Creating Itineraries"):
            future_departure_time = make_aware(datetime.now() + timedelta(days=random.randint(1, 30)))
            
            origin_itinerary = ItineraryFactory.create(
                flight=flight,
                expected_departure_time=future_departure_time,
                expected_arrival_time=None
            )
            
            num_itineraries = random.randint(1, 5)
            for _ in range(num_itineraries):
                expected_arrival_time = origin_itinerary.expected_departure_time + timedelta(hours=random.randint(1, 12))
                expected_departure_time = expected_arrival_time + timedelta(hours=random.randint(1, 4))

                origin_itinerary = ItineraryFactory.create(
                    flight=flight,
                    expected_departure_time=expected_departure_time,
                    expected_arrival_time=expected_arrival_time
                )
        
            origin_itinerary.expected_departure_time = None
            origin_itinerary.save()

        for _ in tqdm(range(2000), desc="Creating Reservations"):
            reservation = ReservationFactory.create(
                user=random.choice(users), 
                seat=random.choice(flights).seats.filter(reservation__id__isnull=True).order_by('?').first()
            )

            for _ in range(random.randint(0, 4)):
                BaggageFactory(reservation=reservation, baggage_type=random.choice(baggage_types))

        self.stdout.write(self.style.SUCCESS('Successfully seeded demo data')) 