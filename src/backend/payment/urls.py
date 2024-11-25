from django.urls import path, include
from rest_framework.routers import DefaultRouter
from src.backend.payment.views import CreditCardViewSet

router = DefaultRouter()
router.register(r'credit_card', CreditCardViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 