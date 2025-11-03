from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .serializer import UserSerializer

# Imports pour l'authentification
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# get tout les users - PROTÉGÉ
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getUsers(request):
    try:
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            "error": "Erreur lors de la récupération des utilisateurs",
            "details": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# get a un seul user - PROTÉGÉ
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getUser(request, pk):
    try:
        user = get_object_or_404(User, id=pk)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            "error": "Erreur lors de la récupération de l'utilisateur",
            "details": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# add user - PUBLIC (pour permettre l'inscription)
@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def addUser(request):
    try:
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            
            # Récupérer le token créé automatiquement par le signal
            token = Token.objects.get(user=user)
            
            return Response({
                "user": serializer.data,
                "token": token.key,
                "message": "Utilisateur créé avec succès"
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
            
    except Exception as e:
        return Response({
            "error": "Erreur interne du serveur",
            "details": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# update user - PROTÉGÉ
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    try:
        user = get_object_or_404(User, id=pk)
        serializer = UserSerializer(instance=user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
            
    except Exception as e:
        return Response({
            "error": "Erreur lors de la mise à jour de l'utilisateur",
            "details": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# delete user - PROTÉGÉ
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def deleteUser(request, pk):
    try:
        user = get_object_or_404(User, id=pk)
        user.delete()
        return Response({
            "message": "Utilisateur supprimé avec succès!"
        }, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({
            "error": "Erreur lors de la suppression de l'utilisateur",
            "details": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Login pour récupérer le token
@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def login(request):
    from django.contrib.auth import authenticate
    
    email = request.data.get('email')
    password = request.data.get('password')
    
    user = authenticate(email=email, password=password)
    
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "token": token.key,
            "user_id": user.id,
            "email": user.email,
            "message": "Connexion réussie"
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            "error": "Identifiants invalides"
        }, status=status.HTTP_400_BAD_REQUEST)