from django.urls import path
from .views_account import getAccounts, getAccount, createAccount, updateAccount, deleteAccount

urlpatterns = [
    path('accounts/', getAccounts, name='getAccounts'),  # Get all accounts
    path('accounts/create/', createAccount, name='createAccount'),  # Create a new account
    path('accounts/<str:email>/', getAccount, name='getAccount'),  # Get a specific account by email
    path('accounts/update/<str:email>/', updateAccount, name='updateAccount'),  # Update an account by email
    path('accounts/delete/<str:email>/', deleteAccount, name='deleteAccount'),  # Delete an account by email
]