from django.urls import path, include
from .views import RegisterView, LoginView, LogoutAPI

urlpatterns = [

    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView, name='login'),
    path('logout/', LogoutAPI, name='logout'),


    ## API GOOGLE LOGIN
    path('auth/', include('dj_rest_auth.urls')),  # API login/logout
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  # API đăng ký tài khoản
    path('auth/social/', include('allauth.socialaccount.urls')),  # API OAuth2
]
