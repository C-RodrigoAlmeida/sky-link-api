import factory
from src.backend.flight.models import AirlineCompany
from faker import Faker

fake = Faker('pt_BR')

class AirlineCompanyFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = AirlineCompany

    name = factory.LazyAttribute(lambda _: f"{fake.company()} Airlines")
    legal_name = factory.LazyAttribute(lambda _: f"{fake.company()} AIRLINES LTDA")
    cnpj = factory.LazyAttribute(lambda _: fake.cnpj())
    email = factory.LazyAttribute(lambda _: fake.company_email()) 