from django.urls import path
from .views_account import getAccount

urlpatterns = [
    path('accounts/', getAccount, name='getAccount')
]