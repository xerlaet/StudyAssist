from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .firebase_config import db  # Make sure firebase_config.py exists and is working


# GET all settings (from Firestore)
@api_view(['GET'])
def get_settings(request):
    docs = db.collection('userSettings').stream()
    settings = [doc.to_dict() for doc in docs]
    return Response(settings)


# GET settings for a specific user by email
@api_view(['GET'])
def get_setting(request, email):
    doc = db.collection('userSettings').document(email).get()
    if doc.exists:
        return Response(doc.to_dict())
    else:
        return Response({'detail': 'Setting not found'}, status=status.HTTP_404_NOT_FOUND)


# CREATE settings (email = document ID)
@api_view(['POST'])
def create_setting(request):
    data = request.data
    email = data.get('email')

    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

    db.collection('userSettings').document(email).set(data)
    return Response({'message': 'Setting created successfully'}, status=status.HTTP_201_CREATED)


# UPDATE settings
@api_view(['PUT'])
def update_setting(request, email):
    doc_ref = db.collection('userSettings').document(email)
    doc = doc_ref.get()

    if not doc.exists:
        return Response({'detail': 'Setting not found'}, status=status.HTTP_404_NOT_FOUND)

    doc_ref.update(request.data)
    return Response({'message': 'Setting updated successfully'})


# DELETE settings
@api_view(['DELETE'])
def delete_setting(request, email):
    doc_ref = db.collection('userSettings').document(email)
    if not doc_ref.get().exists:
        return Response({'detail': 'Setting not found'}, status=status.HTTP_404_NOT_FOUND)

    doc_ref.delete()
    return Response({'message': 'Setting deleted'}, status=status.HTTP_204_NO_CONTENT)
