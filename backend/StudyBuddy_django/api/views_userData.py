from django.shortcuts import render
from rest_framework.decorators import  api_view
from rest_framework.response import  Response
from rest_framework import  status
from .models import UserData
from .serializer import UserDataSerializer

@api_view(['GET'])
def get_user_data(request):
    return Response(UserDataSerializer(UserData.objects.all(), many=True).data)

@api_view(['GET'])
def get_user_data_by_email(request, email):
    try:
        obj = UserData.objects.get(email=email)
        return Response(UserDataSerializer(obj).data)
    except UserData.DoesNotExist:
        return Response({'detail': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_user_data(request):
    serializer = UserDataSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_user_data(request, email):
    try:
        obj = UserData.objects.get(email=email)
    except UserData.DoesNotExist:
        return Response({'detail': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = UserDataSerializer(obj, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_user_data(request, email):
    try:
        obj = UserData.objects.get(email=email)
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except UserData.DoesNotExist:
        return Response({'detail': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)