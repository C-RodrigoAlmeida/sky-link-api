from django.urls import path, include
from rest_framework.routers import DefaultRouter
from src.account.views.user import UserViewSet
from src.account.views.address import AddressViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'addresses', AddressViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 