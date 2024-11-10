import factory
from src.airport.models import Airport
from faker import Faker

fake = Faker('pt_BR')

MAJOR_AIRPORTS = [
    ('GRU', 'São Paulo', 'SP'),
    ('CGH', 'São Paulo', 'SP'),
    ('BSB', 'Brasília', 'DF'),
    ('GIG', 'Rio de Janeiro', 'RJ'),
    ('CNF', 'Confins', 'MG'),
]

class AirportFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Airport

    name = factory.Iterator([f"{city} International Airport" for _, city, _ in MAJOR_AIRPORTS])
    city = factory.Iterator([city for _, city, _ in MAJOR_AIRPORTS])
    state = factory.Iterator([state for _, _, state in MAJOR_AIRPORTS])
    country = 'BR' 