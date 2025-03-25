from django.urls import path, include
from .views import RegisterView, LoginView, LogoutAPI, MytokenObtainPairView, dashboard
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [

    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView, name='login'),
    path('logout/', LogoutAPI, name='logout'),


    ##dashboard api
    path('token/', MytokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('dashboard/', dashboard, name='dashboard'),

    ## API GOOGLE LOGIN
 # API OAuth2
]
