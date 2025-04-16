from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Quiz
from .serializer import QuizSerializer

# GET all quizzes
@api_view(['GET'])
def get_quizzes(request):
    quizzes = Quiz.objects.all()
    serializer = QuizSerializer(quizzes, many=True)
    return Response(serializer.data)

# GET a single quiz by ID
@api_view(['GET'])
def get_quiz(request, quiz_id):
    try:
        quiz = Quiz.objects.get(quiz_id=quiz_id)
        serializer = QuizSerializer(quiz)
        return Response(serializer.data)
    except Quiz.DoesNotExist:
        return Response({'detail': 'Quiz not found'}, status=status.HTTP_404_NOT_FOUND)

# CREATE a new quiz
@api_view(['POST'])
def create_quiz(request):
    serializer = QuizSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# UPDATE an existing quiz
@api_view(['PUT'])
def update_quiz(request, quiz_id):
    try:
        quiz = Quiz.objects.get(quiz_id=quiz_id)
    except Quiz.DoesNotExist:
        return Response({'detail': 'Quiz not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = QuizSerializer(quiz, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# DELETE a quiz
@api_view(['DELETE'])
def delete_quiz(request, quiz_id):
    try:
        quiz = Quiz.objects.get(quiz_id=quiz_id)
        quiz.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Quiz.DoesNotExist:
        return Response({'detail': 'Quiz not found'}, status=status.HTTP_404_NOT_FOUND)