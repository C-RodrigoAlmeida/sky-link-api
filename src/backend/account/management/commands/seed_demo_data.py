from django.core.management.base import BaseCommand
from django.db.models import Q
from src.backend.account.factories import UserFactory, AddressFactory
from src.backend.flight.factories import (
    AirlineCompanyFactory, FlightFactory, ReservationFactory
)
from src.backend.airport.factories import AirportFactory, GateFactory, ItineraryFactory
from tqdm import tqdm
import random
from datetime import timedelta, datetime

class Command(BaseCommand):
    help = 'Seeds the database with demo data'
    
    def handle(self, *args, **kwargs):
        # Delete existing data
        self.stdout.write('Deleting existing data...')
        ReservationFactory._meta.model.objects.all().delete()
        ItineraryFactory._meta.model.objects.all().delete()
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

        flights = []
        for airline in tqdm(airlines, desc="Creating Flights"):
            flights.extend(FlightFactory.create_batch(1, airline=airline))

        for flight in tqdm(flights, desc="Creating Itineraries"):
            future_departure_time = datetime.now() + timedelta(days=random.randint(1, 30))
            
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

        for _ in tqdm(range(100), desc="Creating Reservations"):
            ReservationFactory.create(user=users[_ % len(users)], seat=flights[_ % len(flights)].seats.first())

        self.stdout.write(self.style.SUCCESS('Successfully seeded demo data')) 