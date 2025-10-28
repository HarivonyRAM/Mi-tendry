from rest_framework import viewsets, permissions
from .models import CustomUser
from .serializers import CustomUserSerializer
from .permission import IsOwnerOrAdmin

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()   
    serializer_class = CustomUserSerializer

    def get_permissions(self):
        if self.action == 'create':
            # ACTION 'create' (Inscription) : Tout le monde est autorisé.
            self.permission_classes = [permissions.AllowAny]

        elif self.action == 'list':
            # ACTION 'list' (Voir la liste des utilisateurs) : Seuls les admins.

#################################################################################################
            #self.permission_classes = [permissions.IsAdminUser]
            self.permission_classes = [permissions.AllowAny]

        elif self.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            # ACTIONS sur un utilisateur spécifique :
            # 1. L'utilisateur peut lire/modifier son propre profil.
            # 2. L'Admin peut tout modifier.
#################################################################################################
            #self.permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]
            self.permission_classes = [permissions.AllowAny] 

        else:
#################################################################################################
            #self.permission_classes = [permissions.IsAuthenticated]
            self.permission_classes = [permissions.AllowAny]
            
        return [permission() for permission in self.permission_classes]

