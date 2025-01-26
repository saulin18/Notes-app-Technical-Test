
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.middleware.csrf import get_token
from users.models import User
from users.serializers.user_serializer import UserSerializer, LoginSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['get'])
    def csrf(self, request):
        return Response({'csrfToken': get_token(request)})

    @action(detail=False, methods=['post'], serializer_class=LoginSerializer)
    def login(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = authenticate(
            request,
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )
        
        if user is not None:
            login(request, user)
            return Response({
                'message': 'Login exitoso',
                'user': UserSerializer(user).data
            }, status=status.HTTP_200_OK)
        return Response(
            {'message': 'Credenciales inválidas'},
            status=status.HTTP_401_UNAUTHORIZED
        )