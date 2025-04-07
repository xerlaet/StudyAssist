import re
import uuid

"""
Basic user object for testing
This will be replaced when authentication is implemented
"""
class User:
    def __init__(self, email):
        self.email = email
        self.is_authenticated = True
    
    def logout(self):
        self.is_authenticated = False

class CollaborateSession:
    def __init__(self):
        self.invitations = {}

    def join_session(self, user, invitation_id):
        """Join a study session using the invitation ID"""

        # Check if user is logged in
        if not user.is_authenticated:
            return False, "Please log in to join this session"

        # Check if invitation is valid UUIDv4
        isValid = re.compile(r"[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}", re.I).match(invitation_id)
        if not isinstance(invitation_id, str) or not isValid:
            return False, "Invalid invitation ID"

        # Check if invitation exists
        if invitation_id not in self.invitations:
            return False, "Session doesn't exist"

        # Check if user is invited to session
        if self.invitations[invitation_id]["email"] != user.email:
            return False, "You are not invited to this session"

        # Success
        return True, "Successfully joined session"

    def invite_user(self, user, email, session_id, has_permission):
        """Invites a user to a study session"""

        # Check if user is logged in
        if not user.is_authenticated:
            return False, "You must be logged in to invite a user"

        # Check if session_id exists and if user has permission to invite
        # Will be implemented later, for now just check valid UUIDv4
        session_id_exists = re.compile(r"[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}", re.I).match(session_id)
        if not session_id_exists:
            return False, "Invalid session"
        if not has_permission:
            return False, "You do not have permission to invite to this session"

        # Check if email is valid
        if not re.compile(r"[^@]+@[^@]+\.[^@]+", re.I).match(email):
            return False, "Invalid email"

        # Create invitation
        invitation_id = str(uuid.uuid4())
        self.invitations[invitation_id] = {"email": email, "session_id": session_id}
        return True, invitation_id


def test_join():
    """Test cases for joining a session"""

    print("\n========== Testing join_session ==========")

    collab = CollaborateSession()
    pass_num = 0
    total = 0

    """TC1: Valid login status + Valid invitation"""
    user1 = User("user1@example.com")
    user2 = User("user2@example.com")
    success, invitation = collab.invite_user(user2, "user1@example.com", str(uuid.uuid4()), True)

    success, message = collab.join_session(user1, invitation)
    if success:
        print(f"TC1 success: {message}")
        pass_num += 1 # expected result
    else:
        print(f"TC1 error: {message}")
    total += 1

    """TC2: Valid login status + Invalid invitation"""
    user3 = User("user3@example.com")
    # Attempt to join invitation for another user
    success, message = collab.join_session(user3, invitation)
    if success:
        print(f"TC2 success: {message}")
    else:
        print(f"TC2 error: {message}")
        pass_num += 1 # expected result
    total += 1

    """TC3: Valid login status + Exceptional invitation"""
    # Attempt to join invitation with invalid format
    success, message = collab.join_session(user3, "12345")
    if success:
        print(f"TC3 success: {message}")
    else:
        print(f"TC3 error: {message}")
        pass_num += 1 # expected result
    total += 1

    """TC4: Invalid login status"""
    user1.logout()
    # Attempt to join invitation while logged out
    success, message = collab.join_session(user1, invitation)
    if success:
        print(f"TC4 success: {message}")
    else:
        print(f"TC4 error: {message}")
        pass_num += 1 # expected result
    total += 1

    print(f"{pass_num} / {total} test cases passed ({int(pass_num * 100 / total)}%)") 
    

def test_invite():
    """Test cases for inviting to a session"""

    print("\n========== Testing invite_user ==========")

    collab = CollaborateSession()
    pass_num = 0
    total = 0

    """TC1: Valid Login Status + Valid Email + Valid session"""
    user1 = User("user1@example.com")
    success, message = collab.invite_user(user1, "user2@example.com", str(uuid.uuid4()), True)
    if success:
        print(f"TC1 success: {message}")
        pass_num += 1
    else:
        print(f"TC1 error: {message}")
    total += 1

    """TC2: Valid Login Status + Invalid email"""
    success, message = collab.invite_user(user1, "user2@example", str(uuid.uuid4()), True)
    if success:
        print(f"TC2 success: {message}")
    else:
        print(f"TC2 error: {message}")
        pass_num += 1
    total += 1

    """TC3: Valid Login Status + Valid Email + Invalid session"""
    success, message = collab.invite_user(user1, "user2@example.com", str(uuid.uuid4()), False)
    if success:
        print(f"TC3 success: {message}")
    else:
        print(f"TC3 error: {message}")
        pass_num += 1
    total += 1

    """TC4: Valid Login Status + Valid Email + Exceptional session"""
    user1 = User("user1@example.com")
    success, message = collab.invite_user(user1, "user2@example.com", "1234", True)
    if success:
        print(f"TC4 success: {message}")
    else:
        print(f"TC4 error: {message}")
        pass_num += 1
    total += 1

    """TC5: Invalid Login Status"""
    user1.logout()
    success, message = collab.invite_user(user1, "user2@example.com", str(uuid.uuid4()), True)
    if success:
        print(f"TC5 success: {message}")
    else:
        print(f"TC5 error: {message}")
        pass_num += 1
    total += 1

    print(f"{pass_num} / {total} test cases passed ({int(pass_num * 100 / total)}%)")

if __name__ == "__main__":
    test_join()
    test_invite()