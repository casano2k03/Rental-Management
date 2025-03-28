from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Product, Customer, RentalOrder, ProductImage

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role')

    def get_role(self, obj):
        return "admin" if obj.is_superuser else "user"

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'phone']

class CustomerSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Customer
        fields = '__all__'

class ProductImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = '__all__'
        read_only_fields = ['id', 'upload_date', 'image_url']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request and obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

class ProductSerializer(serializers.ModelSerializer):
    price_per_day = serializers.DecimalField(max_digits=10, decimal_places=2, required=True)

    images = ProductImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(max_length=1000000, allow_empty_file=False, use_url=False),
        write_only=True,
        required=False
    )

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'price_per_day', 
            'stock', 'category', 'gender', 'size', 
            'color', 'images', 'uploaded_images',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def update(self, instance, validated_data):
        images_data = validated_data.pop('images', None)  # Lấy danh sách ảnh

        # Cập nhật các trường khác
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Nếu có ảnh mới, cập nhật ảnh
        if images_data:
            for img_data in images_data:
                img_instance, created = ProductImage.objects.update_or_create(
                    product=instance,
                    id=img_data.get("id"),
                    defaults=img_data
                )

        return instance

    def validate_price_per_day(self, value):
        if value is None:
            raise serializers.ValidationError("Price per day is required and cannot be null.")
        if value <= 0:
            raise serializers.ValidationError("Price per day must be greater than 0.")
        return value

    def validate_stock(self, value):
        if value < 0:
            raise serializers.ValidationError("Stock must be greater than or equal to 0")
        return value

class RentalOrderSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer()
    product = ProductSerializer()

    class Meta:
        model = RentalOrder
        fields = '__all__'