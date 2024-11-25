from django.urls import path, include
from rest_framework.routers import DefaultRouter
from src.backend.flight.views.airline_company import AirlineCompanyViewSet
from src.backend.flight.views.flight import FlightViewSet
from src.backend.flight.views.seat import SeatViewSet
from src.backend.flight.views.baggage import BaggageViewSet
from src.backend.flight.views.reservation import ReservationViewSet
from src.backend.flight.views.baggage_type import BaggageTypeViewSet

router = DefaultRouter()
router.register(r'airlines', AirlineCompanyViewSet)
router.register(r'flights', FlightViewSet)
router.register(r'seats', SeatViewSet)
router.register(r'baggage', BaggageViewSet)
router.register(r'baggage_type', BaggageTypeViewSet)
router.register(r'reservations', ReservationViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 