from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView, 
    LoginView, 
    LogoutAPI, 
    MytokenObtainPairView,
    dashboard,
    ProductViewSet,
    ProductImageViewSet,
    CustomerViewSet,
    RentalOrderViewSet,
)



# API Router Configuration
router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'product-images', ProductImageViewSet)
router.register(r'customers', CustomerViewSet)
router.register(r'rental_orders', RentalOrderViewSet)

# URL Patterns
urlpatterns = [
    # Authentication endpoints
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView, name='login'),
    path('logout/', LogoutAPI, name='logout'),

    # JWT Token endpoints
    path('token/', MytokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Dashboard
    path('dashboard/', dashboard, name='dashboard'),

    # # OAuth2 and Social Login
    # path('auth/google/', GoogleLoginAPI.as_view(), name='google_login'),
    # path('oauth/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    # path('social-auth/', include('social_django.urls', namespace='social')),

    path('', include(router.urls)),
]
