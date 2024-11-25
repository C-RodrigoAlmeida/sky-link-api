from django.db import models
from src.backend.account.models import User

class CreditCard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='credit_cards')
    card_number = models.CharField(max_length=16, unique=True)
    cardholder_name = models.CharField(max_length=100)
    expiration_date = models.DateField()
    cvv = models.CharField(max_length=3)

    def __str__(self):
        return f"{self.cardholder_name} - {self.card_number[-4:]}" 