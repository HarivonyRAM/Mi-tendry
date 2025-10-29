from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User
from .serializer import UserSerializer

# Create your views here.

# get all the users
@api_view(['GET'])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

# get a single user
@api_view(['GET'])
def getUser(request, pk):
    user = User.objects.get(id=pk) # pk is primary key
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

# add user
@api_view(['POST'])
def addUser(request):
    serializer = UserSerializer(data=request.data)

    # if it is valid, we save it on the database
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

# update user
@api_view(['PUT'])
def updateUser(request, pk):
    user = User.objects.get(id=pk) # pk is primary key
    serializer = UserSerializer(instance=user, data=request.data)

    # if it is valid, we save it on the database
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

# delete user
@api_view(['DELETE'])
def deleteUser(request, pk):
    user = User.objects.get(id=pk)
    user.delete()

    return Response("User deleted successfully!")