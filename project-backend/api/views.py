from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer
from .serializers import ProductSerializer, ProductImageSerializer, CustomerSerializer, RentalOrderSerializer
from .models import Product, ProductImage, Customer, RentalOrder
from rest_framework import viewsets



User = get_user_model()

class RegisterView(APIView):
    permission_classes = [AllowAny]  # Cho phép truy cập API này mà không cần đăng nhập

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)  # Cấp token sau khi đăng ký thành công
            return Response({'token': token.key, 'user_id': user.id, 'username': user.username}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def LoginView(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Missing username or password'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)

    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
            'role': "admin" if user.is_superuser else "user"  # Thêm role       
        })
    else:
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['POST'])
def LogoutAPI(request):
    request.auth.delete()
    return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)


class MytokenObtainPairView(TokenObtainPairView):
    pass

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    return Response({'message': 'You are authenticated', "user": request.user.username}, status=status.HTTP_200_OK)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = [AllowAny]

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

class RentalOrderViewSet(viewsets.ModelViewSet):
    queryset = RentalOrder.objects.all()
    serializer_class = RentalOrderSerializer
    permission_classes = [IsAuthenticated]