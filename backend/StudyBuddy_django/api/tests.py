from django.test import TestCase
from django.urls import reverse

# Create your tests here.
class APITestCase(TestCase):
    def setUp(self):
        # Set up the test client
        self.client = self.client_class()
        self.client.post(path='/api/account_manage/create/', data={'username': 'jack', 'password': 'black', 'email': 'jack@black.com'})
        self.client.post(path='/api/account_manage/create/', data={'username': 'sean', 'password': 'combs', 'email': 'diddy@babyoil.com'})
        self.client.post(path='/api/account_manage/create/', data={'username': 'jordan', 'password': 'cartier', 'email': 'playboi@carti.com'})
        """ self.client.post(path='/api/user_data_manage/create/', data={'email': 'diddy@babyoil.com', 'days': 0, 'streak': 0, 'calendar': {}})
        self.client.post(path='/api/user_data_manage/create/', data={'email': 'jack@black.com', 'days': 13, 'streak': 7, 'calendar': {}}) """

    """ def test_get_accounts(self):
        # Simulate getting all accounts
        response = self.client.get(path='/api/accounts/')
        self.assertEqual(response.status_code, 200)

    def test_get_account_by_email_valid(self):
        # Simulate getting an account by email
        response = self.client.get(path='/api/accounts/jack@black.com/')
        self.assertEqual(response.status_code, 200)
    
    def test_get_account_by_email_invalid(self):
        # Simulate getting an account by invalid email
        response = self.client.get(path='/api/accounts/chicken@jockey.com/')
        self.assertEqual(response.status_code, 404)

    def test_create_account(self):
        # Simulate creating an account
        response = self.client.post(path='/api/account_manage/create/', data={'username': 'chicken', 'password': 'jockey', 'email': 'chicken@jockey.com'})
        self.assertEqual(response.status_code, 201)
    
    def test_create_account_invalid(self):
        # Simulate creating an account with invalid data
        response = self.client.post(path='/api/account_manage/create/', data={'chicken jockey': 'throw popcorn'})
        self.assertEqual(response.status_code, 400)
    
    def test_update_account_valid(self):
        # Simulate updating an account
        response = self.client.put(path='/api/account_manage/update/playboi@carti.com/', data={'username': 'liar', 'password': 'liar', 'email': 'playboi@carti.com'}, content_type='application/json')
        self.assertEqual(response.status_code, 200)
    
    def test_update_account_invalid_404(self):
        # Simulate updating an account with invalid email
        response = self.client.put(path='/api/account_manage/update/chicken@jockey.com/', data={'username': 'Harold', 'password': 'Bryne', 'email': 'chicken@jockey.com'}, content_type='application/json')
        self.assertEqual(response.status_code, 404)
    
    def test_update_account_invalid_400(self):
        # Simulate updating an account with invalid data
        response = self.client.put(path='/api/account_manage/update/diddy@babyoil.com/', data={'felonies': 'three'}, content_type='application/json')
        self.assertEqual(response.status_code, 400)
    
    def test_delete_account_valid(self):
        # Simulate deleting an account
        response = self.client.delete(path='/api/account_manage/delete/jack@black.com/')
        self.assertEqual(response.status_code, 204)
    
    def test_delete_account_invalid(self):
        # Simulate deleting an account with invalid email
        response = self.client.delete(path='/api/account_manage/delete/chicken@jockey.com/')
        self.assertEqual(response.status_code, 404) """
    
    """ def test_create_user_data_valid(self):
        # Simulate creating user data
        response = self.client.post(path='/api/user_data_manage/create/', data={'email': 'playboi@carti.com', 'days': 1000, 'streak': 50, 'calendar': {}})
        self.assertEqual(response.status_code, 201)
    
    def test_create_user_data_invalid(self):
        # Simulate creating user data with invalid data
        response = self.client.post(path='/api/user_data_manage/create/', data={'chicken jockey': 'throw popcorn'})
        self.assertEqual(response.status_code, 400)
    
    def test_create_user_data_exists(self):
        # Simulate creating user data that already exists
        response = self.client.post(path='/api/user_data_manage/create/', data={'email': 'diddy@babyoil.com', 'days': 0, 'streak': 0, 'calendar': {}})
    
    def test_get_user_data(self):
        # Simulate getting all user data
        response = self.client.get(path='/api/user_data/')
        self.assertEqual(response.status_code, 200)
    
    def test_get_user_data_by_email_valid(self):
        # Simulate getting user data by email
        response = self.client.get(path='/api/user_data/diddy@babyoil.com/')
        self.assertEqual(response.status_code, 200)

    def test_get_user_data_by_email_invalid(self):
        # Simulate getting user data by invalid email
        response = self.client.get(path='/api/user_data/chicken@jockey.com/')
        self.assertEqual(response.status_code, 404)
    
    def test_update_user_data_valid(self):
        # Simulate updating user data
        response = self.client.put(path='/api/user_data_manage/update/jack@black.com/', data={'email': 'jack@black.com', 'days': 1000, 'streak': 50, 'calendar': {}}, content_type='application/json')
        self.assertEqual(response.status_code, 200)
    
    def test_update_user_data_invalid_404(self):
        # Simulate updating user data with invalid email
        response = self.client.put(path='/api/user_data_manage/update/chicken@jockey.com/', data={'email': 'chicken@jockey.com', 'days': 1000, 'streak': 50, 'calendar': {}}, content_type='application/json')
        self.assertEqual(response.status_code, 404)
    
    def test_update_user_data_invalid_400(self):
        # Simulate updating user data with invalid data
        response = self.client.put(path='/api/user_data_manage/update/jack@black.com/', data={'chicken jockey': 'throw popcorn'}, content_type='application/json')
        self.assertEqual(response.status_code, 400)
    
    def test_delete_user_data_valid(self):
        # Simulate deleting user data
        response = self.client.delete(path='/api/user_data_manage/delete/jack@black.com/')
        self.assertEqual(response.status_code, 204)
    
    def test_delete_user_data_invalid(self):
        # Simulate deleting user data with invalid email
        response = self.client.delete(path='/api/user_data_manage/delete/chicken@jockey.com/')
        self.assertEqual(response.status_code, 404) """
