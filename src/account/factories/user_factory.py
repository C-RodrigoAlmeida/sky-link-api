import factory
from src.account.models import User
from faker import Faker

fake = Faker('pt_BR')

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.LazyAttribute(lambda _: fake.user_name())
    email = factory.LazyAttribute(lambda _: fake.email())
    first_name = factory.LazyAttribute(lambda _: fake.first_name())
    last_name = factory.LazyAttribute(lambda _: fake.last_name())
    phone = factory.LazyAttribute(lambda _: fake.phone_number())
    cpf = factory.LazyAttribute(lambda _: fake.cpf())
    birth_date = factory.LazyAttribute(lambda _: fake.date_of_birth(minimum_age=18, maximum_age=90))
    passport_number = factory.LazyAttribute(lambda _: fake.bothify('??######')) 