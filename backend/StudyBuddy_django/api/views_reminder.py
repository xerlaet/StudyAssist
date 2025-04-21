from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Reminder
from .serializer import ReminderSerializer

# CREATE: Create a new Reminder
@api_view(['POST'])
def create_reminder(request):
    serializer = ReminderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# READ: Get all Reminders
@api_view(['GET'])
def get_reminders(request):
    reminders = Reminder.objects.all()
    serializer = ReminderSerializer(reminders, many=True)
    return Response(serializer.data)

# READ: Get a specific Reminder by ID
@api_view(['GET'])
def get_reminder(request, reminder_id):
    reminder = get_object_or_404(Reminder, pk=reminder_id)
    serializer = ReminderSerializer(reminder)
    return Response(serializer.data)

# UPDATE: Update an existing Reminder
@api_view(['PUT'])
def update_reminder(request, reminder_id):
    reminder = get_object_or_404(Reminder, pk=reminder_id)
    serializer = ReminderSerializer(reminder, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# DELETE: Delete a Reminder by ID
@api_view(['DELETE'])
def delete_reminder(request, reminder_id):
    reminder = get_object_or_404(Reminder, pk=reminder_id)
    reminder.delete()
    return Response({'detail': 'Reminder deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
