from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Request
from .serializer import RequestSerializer

# GET all requests
@api_view(['GET'])
def get_requests(request):
    requests = Request.objects.all()
    serializer = RequestSerializer(requests, many=True)
    return Response(serializer.data)

# GET a specific request by ID
@api_view(['GET'])
def get_request(request, request_id):
    try:
        req = Request.objects.get(request_id=request_id)
        serializer = RequestSerializer(req)
        return Response(serializer.data)
    except Request.DoesNotExist:
        return Response({'detail': 'Request not found'}, status=status.HTTP_404_NOT_FOUND)

# CREATE a new request
@api_view(['POST'])
def create_request(request):
    serializer = RequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# UPDATE a request
@api_view(['PUT'])
def update_request(request, request_id):
    try:
        req = Request.objects.get(request_id=request_id)
    except Request.DoesNotExist:
        return Response({'detail': 'Request not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = RequestSerializer(req, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# DELETE a request
@api_view(['DELETE'])
def delete_request(request, request_id):
    try:
        req = Request.objects.get(request_id=request_id)
        req.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Request.DoesNotExist:
        return Response({'detail': 'Request not found'}, status=status.HTTP_404_NOT_FOUND)