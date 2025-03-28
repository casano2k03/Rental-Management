from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
import os
from django.utils.text import slugify

# Trạng thái sản phẩm
PRODUCT_STATUS = [
    ('available', 'Sẵn sàng'),
    ('rented', 'Đang thuê'),
    ('maintenance', 'Bảo trì'),
    ('unavailable', 'Không khả dụng'),
]

# Trạng thái đơn thuê
ORDER_STATUS = [
    ('pending', 'Chờ duyệt'),
    ('active', 'Đang thuê'),
    ('returned', 'Đã trả'),
    ('completed', 'Hoàn tất'),
    ('cancelled', 'Hủy'),
]

PRODUCT_CATEGORIES = [
    ('dress', 'Váy'),
    ('shirt', 'Áo'),
    ('pants', 'Quần'),
    ('shoes', 'Giày'),
    ('suit', 'Bộ vest'),
    ('accessory', 'Phụ kiện'),
]

GENDER_CHOICES = [
    ('male', 'Nam'),
    ('female', 'Nữ'),
    ('unisex', 'Unisex'),
]

from django.db import models

class SizeChoices(models.TextChoices):
    SMALL = "S", "Small"
    MEDIUM = "M", "Medium"
    LARGE = "L", "Large"
    EXTRA_LARGE = "XL", "Extra Large"



# Tài khoản người dùng (khách hàng)
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)

    groups = models.ManyToManyField(
        "auth.Group",
        related_name="customuser_groups",  # Đổi tên tránh xung đột
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="customuser_permissions",  # Đổi tên tránh xung đột
        blank=True,
    )

    def __str__(self):
        return self.username
    

# Thông tin khách hàng (chỉ dành cho người thuê đồ)
class Customer(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    address = models.TextField(blank=True, null=True)
    id_card = models.CharField(max_length=20, unique=True)  # CMND/CCCD
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username



def product_image_upload_path(instance, filename):
    """Tạo đường dẫn lưu ảnh dựa trên tên sản phẩm"""
    product_name_slug = slugify(instance.name)  # Chuyển tên thành slug (vd: "Áo Thun Nam" → "ao-thun-nam")
    return os.path.join("products", product_name_slug, filename)

# Sản phẩm cho thuê
class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2, default=0, null=False, blank=False)
    stock = models.IntegerField(default=0)
    category = models.CharField(max_length=20, choices=PRODUCT_CATEGORIES, null=True, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, null=True, blank=True)
    size = models.CharField(max_length=10, choices=SizeChoices.choices, null=True, blank=True)
    color = models.CharField(max_length=50, blank=True, null=True)
    brand = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=20, choices=PRODUCT_STATUS, default='available')
    thumbnail = models.ImageField(upload_to=product_image_upload_path, null=True, blank=True)
    image = models.ImageField(upload_to=product_image_upload_path, null=True, blank=True)
    created_at = models.DateTimeField(default= timezone.now)
    updated_at = models.DateTimeField(default = timezone.now)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.get_gender_display()} - {self.get_category_display()})"

    @property
    def main_image(self):
        return self.images.first()


# Hình ảnh sản phẩm
class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, 
        on_delete=models.CASCADE, 
        related_name="images"
    )
    image = models.ImageField(upload_to="products/gallery/")
    is_main = models.BooleanField(default=False)
    caption = models.CharField(max_length=200, blank=True)
    upload_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-is_main', '-upload_date']

    def __str__(self):
        return f"Image {self.id} for {self.product.name}"

    def save(self, *args, **kwargs):
        if self.is_main:
            # Set tất cả ảnh khác về is_main=False
            ProductImage.objects.filter(product=self.product, is_main=True).update(is_main=False)
        else:
            # Nếu sản phẩm chưa có ảnh chính, đặt ảnh này làm ảnh chính
            if not ProductImage.objects.filter(product=self.product, is_main=True).exists():
                self.is_main = True
        super().save(*args, **kwargs)


# Đơn thuê đồ
class RentalOrder(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    status = models.CharField(max_length=20, choices=ORDER_STATUS, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        num_days = (self.end_date - self.start_date).days
        self.total_price = num_days * self.product.price_per_day
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Order {self.id} - {self.customer.user.username}"
