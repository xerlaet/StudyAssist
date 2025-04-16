from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Setting
from .serializer import SettingSerializer

# GET all settings
@api_view(['GET'])
def get_settings(request):
    settings = Setting.objects.all()
    serializer = SettingSerializer(settings, many=True)
    return Response(serializer.data)

# GET settings for a specific user (by email)
@api_view(['GET'])
def get_setting(request, email):
    try:
        setting = Setting.objects.get(email=email)
        serializer = SettingSerializer(setting)
        return Response(serializer.data)
    except Setting.DoesNotExist:
        return Response({'detail': 'Setting not found'}, status=status.HTTP_404_NOT_FOUND)

# CREATE settings
@api_view(['POST'])
def create_setting(request):
    serializer = SettingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# UPDATE settings
@api_view(['PUT'])
def update_setting(request, email):
    try:
        setting = Setting.objects.get(email=email)
    except Setting.DoesNotExist:
        return Response({'detail': 'Setting not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = SettingSerializer(setting, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# DELETE settings
@api_view(['DELETE'])
def delete_setting(request, email):
    try:
        setting = Setting.objects.get(email=email)
        setting.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Setting.DoesNotExist:
        return Response({'detail': 'Setting not found'}, status=status.HTTP_404_NOT_FOUND)