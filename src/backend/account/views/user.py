from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from src.backend.account.models import User
from src.backend.account.serializers.user import UserSerializer
from src.backend.account.serializers.user_detail import UserDetailSerializer
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, OpenApiResponse

@extend_schema(tags=['Users'])
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'me':
            return UserDetailSerializer
        return super().get_serializer_class()

    @extend_schema(
        responses={
            200: UserDetailSerializer,
            401: OpenApiResponse(description='Unauthorized')
        }
    )
    @action(detail=False, methods=['get'])
    def me(self, request):
        """Get the current user's details including their addresses."""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data) 