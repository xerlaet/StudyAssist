from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Event
from .serializer import EventSerializer

# GET all events
@api_view(['GET'])
def get_events(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)

# GET a single event by ID
@api_view(['GET'])
def get_event(request, event_id):
    try:
        event = Event.objects.get(event_id=event_id)
        serializer = EventSerializer(event)
        return Response(serializer.data)
    except Event.DoesNotExist:
        return Response({'detail': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

# CREATE a new event
@api_view(['POST'])
def create_event(request):
    serializer = EventSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# UPDATE an event
@api_view(['PUT'])
def update_event(request, event_id):
    try:
        event = Event.objects.get(event_id=event_id)
    except Event.DoesNotExist:
        return Response({'detail': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = EventSerializer(event, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# DELETE an event
@api_view(['DELETE'])
def delete_event(request, event_id):
    try:
        event = Event.objects.get(event_id=event_id)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Event.DoesNotExist:
        return Response({'detail': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)