
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from customeuser.views import CustomUserViewSet

# Importation des vues de Simple JWT
from rest_framework_simplejwt.views import (
    TokenObtainPairView, # Pour obtenir les tokens (access et refresh)
    TokenRefreshView,    # Pour renouveler le token d'accès
)

# Crée un routeur pour gérer les URLs du ViewSet
router = DefaultRouter()
router.register(r'users', CustomUserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API pour la gestion des utilisateurs et l'inscription
    path('api/v1/', include(router.urls)),
    
    # ----------------------------------------------------
    # API pour la CONNEXION (Simple JWT)
    # ----------------------------------------------------
    # Endpoint de Connexion : Récupère les tokens 'access' et 'refresh'
    path('api/v1/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Endpoint de Rafraîchissement : Utilise le 'refresh' token pour obtenir un nouveau 'access' token
    path('api/v1/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


""" from django.urls import path, include
from rest_framework.routers import DefaultRouter
from login.views import UtilisateurViewSet

router= DefaultRouter()
router.register(r'utilisateur', UtilisateurViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), #gestion utilisateurs et inscription   
    path('api/utilisateur/login/', include('login.api.urls')),
]
 """