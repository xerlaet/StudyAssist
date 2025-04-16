from django.shortcuts import render
from rest_framework.decorators import  api_view
from rest_framework.response import  Response
from rest_framework import  status
from .models import Account
from .serializer import AccountSerializer
# Create your views here.

@api_view(['GET'])
def getAccount(request):
    return Response(AccountSerializer({'account_id': 0, 'email': "test@email.com", 'username': "Abhi", 'password': "xyz"}).data)