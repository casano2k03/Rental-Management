from django.contrib.auth.models import AbstractUser
from django.db import models

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


# Sản phẩm cho thuê
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=PRODUCT_STATUS, default='available')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# Hình ảnh sản phẩm
class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="products/")

    def __str__(self):
        return f"Image for {self.product.name}"


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
