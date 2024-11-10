import factory
from src.backend.account.models import Address
from .user_factory import UserFactory
from faker import Faker

fake = Faker('pt_BR')

class AddressFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Address

    user = factory.SubFactory(UserFactory)
    street = factory.LazyAttribute(lambda _: fake.street_address())
    neighborhood = factory.LazyAttribute(lambda _: fake.bairro())
    city = factory.LazyAttribute(lambda _: fake.city())
    state = factory.LazyAttribute(lambda _: fake.state())
    country = factory.LazyAttribute(lambda _: 'BR')
    zip_code = factory.LazyAttribute(lambda _: fake.postcode()) 