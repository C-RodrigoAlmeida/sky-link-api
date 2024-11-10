from django.urls import path, include
from rest_framework.routers import DefaultRouter
from src.flight.views.airline_company import AirlineCompanyViewSet
from src.flight.views.flight import FlightViewSet
from src.flight.views.seat import SeatViewSet
from src.flight.views.baggage import BaggageViewSet
from src.flight.views.reservation import ReservationViewSet

router = DefaultRouter()
router.register(r'airlines', AirlineCompanyViewSet)
router.register(r'flights', FlightViewSet)
router.register(r'seats', SeatViewSet)
router.register(r'baggage', BaggageViewSet)
router.register(r'reservations', ReservationViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 