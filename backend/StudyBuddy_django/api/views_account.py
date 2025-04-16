from django.shortcuts import render
from rest_framework.decorators import  api_view
from rest_framework.response import  Response
from rest_framework import  status
from .models import Account
from .serializer import AccountSerializer
# Create your views here.

# CREATE: Create a new Account
@api_view(['POST'])
def createAccount(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# READ: Get all Accounts
@api_view(['GET'])
def getAccounts(request):
    accounts = Account.objects.all()
    serializer = AccountSerializer(accounts, many=True)
    return Response(serializer.data)

# READ: Get a specific Account by email
@api_view(['GET'])
def getAccount(request, email):
    try:
        account = Account.objects.get(email=email)
        serializer = AccountSerializer(account)
        return Response(serializer.data)
    except Account.DoesNotExist:
        return Response({'detail': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)

# UPDATE: Update an existing Account
@api_view(['PUT'])
def updateAccount(request, email):
    try:
        account = Account.objects.get(email=email)
    except Account.DoesNotExist:
        return Response({'detail': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = AccountSerializer(account, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# DELETE: Delete an Account by email
@api_view(['DELETE'])
def deleteAccount(request, email):
    try:
        account = Account.objects.get(email=email)
        account.delete()
        return Response({'detail': 'Account deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Account.DoesNotExist:
        return Response({'detail': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)