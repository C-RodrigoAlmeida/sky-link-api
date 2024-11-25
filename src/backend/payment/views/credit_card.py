from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from src.backend.payment.models import CreditCard
from src.backend.payment.serializers import CreditCardSerializer
from drf_spectacular.utils import extend_schema

@extend_schema(tags=['Credit Cards'])
class CreditCardViewSet(viewsets.ModelViewSet):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CreditCard.objects.filter(user=self.request.user) 