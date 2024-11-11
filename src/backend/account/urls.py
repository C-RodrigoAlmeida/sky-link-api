from django.urls import path, include
from rest_framework.routers import DefaultRouter
from src.backend.account.views.user import UserViewSet
from src.backend.account.views.address import AddressViewSet
from src.backend.account.views.auth import LoginView, LogoutView, SessionView, get_csrf_token

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'addresses', AddressViewSet)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('session/', SessionView.as_view(), name='session'),
    path('csrf/', get_csrf_token, name='csrf'),
    path('', include(router.urls)),
] 