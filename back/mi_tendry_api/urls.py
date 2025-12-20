from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView # Token JWT
# from rest_framework.authtoken.views import obtain_auth_token # Token DRF
from django.conf import settings  # <-- Import manquant
from django.conf.urls.static import static  # <-- nécessaire pour servir les fichiers media en dev

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/play/', include('ml.urls')),
    
    # JWT ROUTES
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/token/', obtain_auth_token, name='api_token_auth'),
]

# Servir les fichiers media uniquement en mode DEBUG
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
