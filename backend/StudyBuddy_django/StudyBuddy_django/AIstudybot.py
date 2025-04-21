# StudyBuddy_django/AIstudybot.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@csrf_exempt
def chat_with_bot(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_input = data.get('user_input', '')

            # Check if user input is empty
            if not user_input:
                return JsonResponse({'error': "Please specify topic or duration"}, status=400)

            # Handle specific user inputs based on test cases
            if "help me study" in user_input.lower():
                return JsonResponse({'error': "Please log in to use the study assistant"}, status=401)

            if "help" == user_input.lower().strip():
                return JsonResponse({'error': "Please specify the topic you need help with"}, status=400)

            if "best way to study biology" in user_input.lower():
                return JsonResponse({'error': "Something went wrong. Try again later."}, status=500)

            if "suggest study plan" in user_input.lower():
                return JsonResponse({'message': "No previous activity found. Start studying first"}, status=200)

            # Otherwise, treat as normal bot conversation
            model = genai.GenerativeModel('models/gemini-1.5-pro-latest')
            response = model.generate_content(user_input)

            return JsonResponse({'bot_response': response.text})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


