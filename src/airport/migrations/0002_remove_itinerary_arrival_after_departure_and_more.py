# Generated by Django 5.1.3 on 2024-11-10 03:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("airport", "0001_initial"),
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
                    ("expected_arrival_time__gt", models.F("expected_departure_time")),
                    ("expected_arrival_time__isnull", True),
                    _connector="OR",
                ),
                name="arrival_after_departure",
            ),
        ),
        migrations.AddConstraint(
            model_name="itinerary",
            constraint=models.CheckConstraint(
                condition=models.Q(
                    ("expected_departure_time__isnull", False),
                    ("expected_arrival_time__isnull", False),
                    _connector="OR",
                ),
                name="departure_or_arrival_not_null",
            ),
        ),
    ]
