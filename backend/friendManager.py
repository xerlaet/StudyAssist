# @author: Sai Abhinav Pydimarry
# @description: FriendManager class to simulate friend requests and friendships

class FriendManager:
    def __init__(self):
        # Structure: {'user_email': {'friends': set(), 'requests': set()}}
        self.users = {}

    def add_user(self, email):

        if email not in self.users:
            self.users[email] = {'friends': set(), 'requests': set()}

    def send_friend_request(self, from_email, to_email):

        if from_email not in self.users or to_email not in self.users:
            return "Error: One or both users do not exist."
        
        if from_email == to_email:
            return "Error: Cannot friend yourself."
        
        if to_email in self.users[from_email]['friends']:
            return "Error: Already friends."
        
        if from_email in self.users[to_email]['requests']:
            return "Error: Request already sent."
        
        self.users[to_email]['requests'].add(from_email)
        return "Friend request sent."

    def accept_friend_request(self, to_email, from_email):

        if from_email not in self.users[to_email]['requests']:
            return "Error: No pending request from this user."
        
        self.users[to_email]['requests'].remove(from_email)
        self.users[to_email]['friends'].add(from_email)
        self.users[from_email]['friends'].add(to_email)
        return "Friend request accepted."

    def view_friends(self, email):

        if email not in self.users:
            return "Error: User does not exist."
        
        return f"Friends of {email}: {list(self.users[email]['friends'])}"


# Create an instance of FriendManager
friend_manager = FriendManager()

# Add users
friend_manager.add_user("abhi@example.com")
friend_manager.add_user("harsh@example.com")
friend_manager.add_user("robert@example.com")
friend_manager.add_user("nick@example.com")

# Test 1: Valid friend request
print(friend_manager.send_friend_request("abhi@example.com", "harsh@example.com"))
# Expected: Friend request sent.

# Test 2: Accepting a valid friend request
print(friend_manager.accept_friend_request("harsh@example.com", "abhi@example.com"))
# Expected: Friend request accepted.

# Test 3: Viewing a user's friends list
print(friend_manager.view_friends("harsh@example.com"))
# Expected: Friends of harsh@example.com: ['abhi@example.com']

# Test 4: Sending a friend request to self
print(friend_manager.send_friend_request("nick@example.com", "nick@example.com"))
# Expected: Error: Cannot friend yourself.

# Test 5: Sending a duplicate friend request
print(friend_manager.send_friend_request("abhi@example.com", "harsh@example.com"))
# Expected: Error: Already friends.

# Test 6: Accepting a non-existent request
print(friend_manager.accept_friend_request("robert@example.com", "abhi@example.com"))
# Expected: Error: No pending request from this user.

# Test 7: Sending a request to a non-existent user
print(friend_manager.send_friend_request("nick@example.com", "nobody@example.com"))
# Expected: Error: One or both users do not exist.

# Test 8: Viewing friends for a non-existent user
print(friend_manager.view_friends("nonuser@example.com"))
# Expected: Error: User does not exist.