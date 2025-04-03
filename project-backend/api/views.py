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
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import action
from django.db import transaction



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

class ProductCreateAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser, JSONParser)  # Ensure JSONParser is included

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        # Get product data and images from request
        product_data = {
            'name': request.data.get('name'),
            'description': request.data.get('description'),
            'price_per_day': request.data.get('price_per_day'),
            'stock': request.data.get('stock'),
            'category': request.data.get('category'),
            'gender': request.data.get('gender'),
            'size': request.data.get('size'),
            'color': request.data.get('color'),
            'brand': request.data.get('brand'),
        }

        # Create product using serializer
        serializer = self.get_serializer(data=product_data)
        serializer.is_valid(raise_exception=True)
        product = serializer.save()

        # Handle thumbnail
        if 'thumbnail' in request.FILES:
            product.thumbnail = request.FILES['thumbnail']
            product.save()

        # Handle multiple images
        images = request.FILES.getlist('images')
        for index, image in enumerate(images):
            ProductImage.objects.create(
                product=product,
                image=image,
                is_main=index == 0  # First image will be main image
            )

        # Return response with product data including images
        return Response({
            'message': 'Product created successfully',
            'product': ProductSerializer(product).data
        }, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def add_images(self, request, pk=None):
        """Add additional images to existing product"""
        product = self.get_object()
        images = request.FILES.getlist('images')
        
        added_images = []
        for image in images:
            product_image = ProductImage.objects.create(
                product=product,
                image=image
            )
            added_images.append(ProductImageSerializer(product_image).data)

        return Response({
            'message': 'Images added successfully',
            'images': added_images
        }, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['post'], url_path='delete-multiple')
    def delete_multiple(self, request):
        """
        Delete multiple products by their IDs.
        """
        ids = request.data.get('ids', [])
        if not ids:
            return Response({'error': 'No IDs provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Filter and delete products
        products_to_delete = Product.objects.filter(id__in=ids)
        if not products_to_delete.exists():
            return Response({'error': 'No matching products found'}, status=status.HTTP_404_NOT_FOUND)

        count = products_to_delete.count()
        products_to_delete.delete()

        return Response({'message': f'{count} products deleted successfully'}, status=status.HTTP_200_OK)

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