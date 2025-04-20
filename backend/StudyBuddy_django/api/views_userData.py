from django.shortcuts import render
from rest_framework.decorators import  api_view
from rest_framework.response import  Response
from rest_framework import  status
from .models import UserData, Account
from .serializer import UserDataSerializer
from django.utils.datastructures import MultiValueDictKeyError

@api_view(['GET'])
def get_user_data(request):
    return Response(UserDataSerializer(UserData.objects.all(), many=True).data)

@api_view(['GET'])
def get_user_data_by_email(request, email):
    try:
        obj = UserData.objects.get(email=Account.objects.get(email=email).pk)
        return Response(UserDataSerializer(obj).data)
    except UserData.DoesNotExist:
        return Response({'detail': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)
    except Account.DoesNotExist:
        return Response({'detail': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_user_data(request):
    data_copy = request.data.copy() # Convert Django QueryDict to a regular dict
    try:
        data_copy['email'] = Account.objects.get(email=request.data['email']).pk
    except MultiValueDictKeyError:
        return Response({'detail': 'Invalid data in request'}, status=status.HTTP_400_BAD_REQUEST)
    serializer = UserDataSerializer(data=data_copy)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_user_data(request, email):
    try:
        obj = UserData.objects.get(email=Account.objects.get(email=email).pk) # Get UserData by email
    except UserData.DoesNotExist:
        return Response({'detail': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)
    except Account.DoesNotExist:
        return Response({'detail': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)
    data_copy = request.data.copy() # Convert Django QueryDict to a regular dict
    try:
        data_copy['email'] = Account.objects.get(email=request.data['email']).pk # Get the email from the request data
    except MultiValueDictKeyError:
        return Response({'detail': 'Invalid data in request'}, status=status.HTTP_400_BAD_REQUEST)
    except KeyError:
        return Response({'detail': 'Invalid data in request'}, status=status.HTTP_400_BAD_REQUEST)
    serializer = UserDataSerializer(obj, data=data_copy)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_user_data(request, email):
    try:
        obj = UserData.objects.get(email=Account.objects.get(email=email).pk)
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except UserData.DoesNotExist:
        return Response({'detail': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)
    except Account.DoesNotExist:
        return Response({'detail': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)