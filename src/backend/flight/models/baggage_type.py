from django.db import models

class BaggageType(models.Model):
    label = models.CharField(max_length=255)
    max_weight = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self) -> str:
        return f"Baggage {self.id}"
