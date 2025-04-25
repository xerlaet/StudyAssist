from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def firebase_test(request):
    """Test view for Firebase authentication."""
    # Debug print to see what's happening
    print(f"DEBUG - User authenticated: {request.user.is_authenticated}")
    print(f"DEBUG - Firebase user: {getattr(request, 'firebase_user', None) is not None}")
    
    # Check if we have both a Firebase user and an authenticated Django user
    if hasattr(request, 'firebase_user') and request.user.is_authenticated:
        uid = request.firebase_user.get("uid", "unknown")
        email = request.firebase_user.get("email", "unknown")
        email_verified = request.firebase_user.get("email_verified", False)
        
        print(f"DEBUG - Access granted to user: {uid}")
        
        return JsonResponse({
            "status": "Authorized",
            "data": {
                "uid": uid,
                "email": email,
                "email_verified": email_verified,
                "django_username": request.user.username,
                "django_id": request.user.id,
                "is_authenticated": True,
            }
        }, status=200)
    
    # If not authenticated, return unauthorized
    return JsonResponse({
        "status": "Unauthorized",
        "data": {
            "uid": "anonymous",
            "email": "anonymous",
            "email_verified": False,
            "is_authenticated": False,
            "message": "Authentication required to access this resource"
        }
    }, status=401)
