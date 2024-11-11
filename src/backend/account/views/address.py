from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from src.backend.account.models import Address
from src.backend.account.serializers.address import AddressSerializer

class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]
    queryset = Address.objects.all()

    def get_queryset(self):
        """
        Filter addresses to return only those belonging to the current user
        """
        return Address.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Set the user automatically when creating an address
        """
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'], url_path='user/(?P<user_id>[^/.]+)')
    def get_user_address(self, request, user_id=None):
        """
        Get addresses for a specific user
        """
        addresses = Address.objects.filter(user_id=user_id)
        serializer = self.get_serializer(addresses, many=True)
        return Response(serializer.data) 