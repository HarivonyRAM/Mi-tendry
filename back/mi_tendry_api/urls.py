from django.contrib import admin
from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token
from django.conf import settings  # <-- Import manquant
from django.conf.urls.static import static  # <-- nécessaire pour servir les fichiers media en dev

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/ml/', include('ml.urls')),
    path('api/token/', obtain_auth_token, name='api_token_auth'),
]

# Servir les fichiers media uniquement en mode DEBUG
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
