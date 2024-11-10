from django.urls import path, include
from rest_framework.routers import DefaultRouter
from src.backend.airport.views.airport import AirportViewSet
from src.backend.airport.views.gate import GateViewSet
from src.backend.airport.views.itinerary import ItineraryViewSet

router = DefaultRouter()
router.register(r'airports', AirportViewSet)
router.register(r'gates', GateViewSet)
router.register(r'itineraries', ItineraryViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 