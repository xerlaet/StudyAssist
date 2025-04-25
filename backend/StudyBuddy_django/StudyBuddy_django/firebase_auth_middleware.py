from firebase_admin import auth
from django.http import JsonResponse
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model, login
from django.contrib.auth.backends import ModelBackend
import StudyBuddy_django.firebase_config  # Make sure Firebase is initialized

class FirebaseAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Set default user as anonymous
        request.firebase_user = None
        request.user = AnonymousUser()
        
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header.split("Bearer ")[1]
            
            try:
                # Verify Firebase token
                decoded_token = auth.verify_id_token(token)
                
                # Store firebase user data on request
                request.firebase_user = decoded_token
                
                # Get user details from token
                User = get_user_model()
                uid = decoded_token["uid"]
                email = decoded_token.get("email", "")
                
                # Find or create user
                try:
                    user = User.objects.get(username=uid)
                    # Update email if it has changed
                    if user.email != email and email:
                        user.email = email
                        user.save()
                except User.DoesNotExist:
                    # Create new user if not exists
                    user = User.objects.create_user(
                        username=uid,
                        email=email,
                        password=None  # No password since using Firebase auth
                    )
                
                # Set Django user on the request
                request.user = user
                
                # This is the key change - authenticate and login the user
                # This ensures that is_authenticated will be True
                if not hasattr(user, 'backend'):
                    user.backend = 'django.contrib.auth.backends.ModelBackend'
                login(request, user)
                
                print(f"[Middleware] Authenticated user: {user.username}, Auth Status: {user.is_authenticated}")
                
            except Exception as e:
                print(f"[Middleware] Firebase auth error: {str(e)}")
            
        # Process the request
        response = self.get_response(request)
        return response
