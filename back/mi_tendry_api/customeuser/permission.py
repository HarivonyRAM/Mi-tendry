from rest_framework import permissions

class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Autorise l'accès en lecture/écriture uniquement au propriétaire de l'objet
    ou à un utilisateur qui est 'staff' (Admin).
    """
    
    # has_object_permission est la méthode appelée quand on veut vérifier
    # les permissions sur un OBJET spécifique (retrieve, update, destroy).
    def has_object_permission(self, request, view, obj):
        
        # 1. Autoriser la lecture (GET, HEAD, OPTIONS) pour tout le monde.
        # Si vous voulez restreindre la lecture à l'owner/admin, supprimez cette ligne.
        if request.method in permissions.SAFE_METHODS:
            return True 
        
        # 2. Autoriser l'accès si l'utilisateur est un Admin (staff/superuser).
        if request.user and request.user.is_staff:
            return True
            
        # 3. Autoriser l'accès uniquement si l'utilisateur est le propriétaire de l'objet.
        # Dans le cas de votre UtilisateurViewSet, l'objet (obj) est l'instance Utilisateur
        # et on le compare à l'utilisateur faisant la requête (request.user).
        return obj == request.user