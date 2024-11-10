# Generated by Django 5.1.3 on 2024-11-10 03:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("airport", "0002_remove_itinerary_arrival_after_departure_and_more"),
        ("flight", "0001_initial"),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name="itinerary",
            name="arrival_after_departure",
        ),
        migrations.AddConstraint(
            model_name="itinerary",
            constraint=models.CheckConstraint(
                condition=models.Q(
                    ("expected_departure_time__gt", models.F("expected_arrival_time")),
                    ("expected_departure_time__isnull", True),
                    _connector="OR",
                ),
                name="departure_after_arrival",
            ),
        ),
    ]