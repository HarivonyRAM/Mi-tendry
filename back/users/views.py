from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate # <-- Importé pour la fonction login
from .serializer import UserSerializer

# JWT
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

# ---- PROTECTED ROUTES (AUCUN CHANGEMENT) ----

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def getUser(request, pk):
    user = get_object_or_404(User, id=pk)
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = get_object_or_404(User, id=pk)
    serializer = UserSerializer(instance=user, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def deleteUser(request, pk):
    user = get_object_or_404(User, id=pk)
    user.delete()
    return Response({"message": "Utilisateur supprimé"}, status=status.HTTP_204_NO_CONTENT)


# --- PUBLIC ROUTES (ENREGISTREMENT & CONNEXION) ----

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def register(request): # <-- Renommée de 'addUser' à 'register' pour la clarté
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)

        return Response({
            "user": serializer.data,
            "refresh": str(refresh),
            "access": access,
            "token": access,
            "message": "Utilisateur créé avec succès"
        }, status=status.HTTP_201_CREATED)

    return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    # 1. Tente de trouver l'utilisateur par email
    try:
        # Tente de trouver l'utilisateur dans la DB par l'email
        user_to_auth = User.objects.get(email=email)
        
        # Extrait le username de cet utilisateur pour l'utiliser dans authenticate
        username = user_to_auth.username 
    except User.DoesNotExist:
        # Si l'email n'existe pas, renvoie l'erreur 401
        return Response({
            "errors": "Identifiants invalides (email ou mot de passe incorrect)"
        }, status=status.HTTP_401_UNAUTHORIZED)
        
    # 2. Authentifie avec le vrai username et le mot de passe
    # La fonction authenticate va comparer le mot de passe haché
    user = authenticate(username=username, password=password)

    if user is not None:
        # L'utilisateur est valide : Génère les tokens JWT
        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)

        serializer = UserSerializer(user)

        return Response({
            "user": serializer.data,
            "refresh": str(refresh),
            "access": access,
            "token": access,
            "message": "Connexion réussie"
        }, status=status.HTTP_200_OK)
    else:
        # Si authenticate retourne None, le mot de passe est incorrect
        return Response({
            "errors": "Identifiants invalides (email ou mot de passe incorrect)"
        }, status=status.HTTP_401_UNAUTHORIZED)