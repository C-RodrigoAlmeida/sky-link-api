import factory
from src.backend.account.models import UserProfile
from .user_factory import UserFactory
from faker import Faker

fake = Faker('pt_BR')

class UserProfileFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = UserProfile

    user = factory.SubFactory(UserFactory)
    phone = factory.LazyAttribute(lambda _: fake.phone_number())
    cpf = factory.LazyAttribute(lambda _: fake.cpf())
    is_system_admin = factory.Faker('boolean', chance_of_getting_true=10)
    birth_date = factory.LazyAttribute(lambda _: fake.date_of_birth(minimum_age=18, maximum_age=90))
    passport_number = factory.LazyAttribute(lambda _: fake.bothify('??######')) 