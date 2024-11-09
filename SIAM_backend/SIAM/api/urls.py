from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView

from .views import (
    ProjectView,
    ProjectDetailView,
    MeasuresView,
    ResourcesView,
    InvestigadorsDetailView,
    InvestigatorView,
    EntityView
)

urlpatterns = [ 
    path('projects/', ProjectView.as_view()),
    path('projects/<int:pk>/', ProjectDetailView.as_view()),
    path('projects/<int:pk>/measures/', MeasuresView.as_view()),
    path('projects/<int:pk>/resources/', ResourcesView.as_view()),
    path('investigadors/<int:pk>/', InvestigadorsDetailView.as_view()),
    path('investigadors/', InvestigatorView.as_view()),
    path('entitys/', EntityView.as_view()),
    path('measures/', MeasuresView.as_view()),
    path('resources/', ResourcesView.as_view()),
    
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
