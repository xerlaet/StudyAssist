#author: Harsh Patel
# @description: ResetPassword class to handle password resets for existing user accounts

import re

# This class handles password reset functionality
class ResetPasswordManager:
    def __init__(self, accounts):
        # The constructor takes an existing dictionary of accounts to update passwords
        self.accounts = accounts

    # This method checks if an email exists in the accounts
    def email_exists(self, email):
        return email in self.accounts

    # This method resets the password for a given account after checking conditions
    def reset_password(self, email, new_password, confirm_password):
        
        # Check if email exists in system
        if not self.email_exists(email):
            return "Error: Email not found."

        # Check if password fields are empty
        if not new_password or not confirm_password:
            return "Error: Password fields cannot be empty."

        # Check if passwords match
        if new_password != confirm_password:
            return "Error: Passwords do not match."

        # Check if new password meets length requirements
        if len(new_password) < 6:
            return "Error: Password must be at least 6 characters."
        if len(new_password) > 15:
            return "Error: Password must be less than 15 characters."

        # Update the user's password
        self.accounts[email]['password'] = new_password
        return "Password reset successful!"


# Sample account data from create_account step
accounts = {
    "harshpatel@example.com": {"full_name": "Harsh Patel", "password": "oldpassword"},
    "JohnCole@example.com": {"full_name": "John Cole", "password": "password123"},
}

# Create instance of ResetPasswordManager with existing users
reset_manager = ResetPasswordManager(accounts)

# Test Cases for validation
print(reset_manager.reset_password("JohnCole@example.com", "newpass123", "newpass123"))  # valid reset
print(reset_manager.reset_password("HarshPatel@example.com", "newpass", "newpass"))  # email not found
print(reset_manager.reset_password("meredithgrey@example.com", "short", "short"))  # too short
print(reset_manager.reset_password("meredithgrey@example.com", "toolongpasswordtoolong", "toolongpasswordtoolong"))  # too long
print(reset_manager.reset_password("meredithgrey@example.com", "secure123", "secure456"))  # Incorrect confirmation
print(reset_manager.reset_password("meredithgrey@example.com", "", ""))  # empty fields
