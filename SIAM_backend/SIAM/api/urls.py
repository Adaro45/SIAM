from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

from .views import (
    ProjectView,
    ProjectDetailView,
    MeasuresView,
    MeasuresDetailView,
    MeasuresDeleteView,
    ResourcesView,
    ResourcesDetailView,
    ResourcesDeleteView,
    InvestigadorsDetailView,
    InvestigatorView,
    EntityView,
    UserRegistrationAPIView,
    UserLoginAPIView,
    UserLogoutAPIView,
    UserInfoAPIView,
    UserUpdateAPIView,
    UserDeleteAPIView,
    UserListAPIView,
    AdminUserUpdateAPIView,
    EntityDetailView,
)

urlpatterns = [ 
    path('projects/', ProjectView.as_view()),
    path('projects/<int:pk>/', ProjectDetailView.as_view()),
    path('projects/<int:pk>/measures/', MeasuresView.as_view()),
    path('projects/<int:pk>/resources/', ResourcesView.as_view()),
    
    path('investigadors/<int:pk>/', InvestigadorsDetailView.as_view()),
    path('investigadors/', InvestigatorView.as_view()),
    path('entitys/', EntityView.as_view()),
    path('entitys/<int:pk>/', EntityDetailView.as_view()),
    
    path('measures/', MeasuresView.as_view()),
    path('measures/<int:pk>/', MeasuresDetailView.as_view()),
    path('measures/<int:pk>/delete/', MeasuresDeleteView.as_view()),
    
    path('resources/', ResourcesView.as_view()),
    path('resources/<int:pk>/', ResourcesDetailView.as_view()),
    path('resources/<int:pk>/delete/', ResourcesDeleteView.as_view()),
    
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('user/', UserListAPIView.as_view(), name='user_info'),
    path('user/<str:username>/', UserInfoAPIView.as_view(), name='user_info'),
    path('user/<str:username>/update/', AdminUserUpdateAPIView.as_view(), name='user_update'),
    path('user/<str:username>/<str:password>/update/', UserUpdateAPIView.as_view(), name='user_update'),
    path('user/<str:username>/delete/', UserDeleteAPIView.as_view(), name='user_delete'),
    
    path('register/', UserRegistrationAPIView.as_view(), name='register'),
    path('login/', UserLoginAPIView.as_view(), name='login'),
    path('logout/',UserLogoutAPIView.as_view(), name='logout')
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
