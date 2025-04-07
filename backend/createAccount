# @author: sanahsp (Sanah Singh)
# @description: AccountManager class to create a new account and handle user validation

import re

"""
AccountManager class handles user account creation and validation.
"""
class AccountManager:
    def __init__(self):
        """
        Initializes the accounts dictionary to store user data.
        Format: {email: {'full_name': str, 'password': str}}
        """
        self.accounts = {}

    def is_valid_email(self, email):
        """
        Validates the format of the email using a regex pattern.

        Args:
            email (str): The user's email address

        Returns:
            bool: True if valid, False otherwise
        """
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.fullmatch(pattern, email) is not None

    def create_account(self, full_name, email, password, retype_password):
        """
        Creates a new account after validating all fields.

        Args:
            full_name (str): The full name of the user
            email (str): The user's email
            password (str): The chosen password
            retype_password (str): Re-entered password for confirmation

        Returns:
            str: Success or error message
        """
        if not isinstance(full_name, str) or not all(c.isalpha() or c.isspace() for c in full_name):
            return "Error: Full name must contain only letters and spaces."

        if email in self.accounts:
            return "Error: Email already exists."

        if not self.is_valid_email(email):
            return "Error: Invalid email format."

        if len(password) >= 15:
            return "Error: Password must be less than 15 characters."

        self.accounts[email] = {'full_name': full_name, 'password': password}
        return "Account created successfully!"

"""
Create an instance of AccountManager 
"""
account_manager = AccountManager()

print(account_manager.create_account("Izzie Stevens", "izziestevens@example.com", "password123", "password123"))
print(account_manager.create_account("Meredith Grey", "meredithgrey@example.com", "thisisaverylongpassword", "thisisaverylongpassword"))
print(account_manager.create_account(123, "derekshepherd@example.com", "password456", "password456"))
print(account_manager.create_account("April Kepner", "invalid-email", "password456", "password456"))
print(account_manager.create_account("New User", "izziestevens@example.com", "password789", "password789"))
