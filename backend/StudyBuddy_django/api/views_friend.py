from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Friend
from .serializer import FriendSerializer

# GET all friendships
@api_view(['GET'])
def get_friends(request):
    friends = Friend.objects.all()
    serializer = FriendSerializer(friends, many=True)
    return Response(serializer.data)

# GET a specific friendship by ID
@api_view(['GET'])
def get_friend(request, friend_id):
    try:
        friend = Friend.objects.get(friend_id=friend_id)
        serializer = FriendSerializer(friend)
        return Response(serializer.data)
    except Friend.DoesNotExist:
        return Response({'detail': 'Friend not found'}, status=status.HTTP_404_NOT_FOUND)

# CREATE a new friendship
@api_view(['POST'])
def create_friend(request):
    serializer = FriendSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# UPDATE a friendship
@api_view(['PUT'])
def update_friend(request, friend_id):
    try:
        friend = Friend.objects.get(friend_id=friend_id)
    except Friend.DoesNotExist:
        return Response({'detail': 'Friend not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = FriendSerializer(friend, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# DELETE a friendship
@api_view(['DELETE'])
def delete_friend(request, friend_id):
    try:
        friend = Friend.objects.get(friend_id=friend_id)
        friend.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Friend.DoesNotExist:
        return Response({'detail': 'Friend not found'}, status=status.HTTP_404_NOT_FOUND)