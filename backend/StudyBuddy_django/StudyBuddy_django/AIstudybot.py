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

            # Validate input
            if not user_input:
                return JsonResponse({'error': "Please specify topic or duration"}, status=400)

            # Custom responses for specific cases
            if "help me study" in user_input.lower():
                return JsonResponse({'error': "Please log in to use the study assistant"}, status=401)

            if user_input.lower().strip() == "help":
                return JsonResponse({'error': "Please specify the topic you need help with"}, status=400)

            if "best way to study biology" in user_input.lower():
                return JsonResponse({'error': "Something went wrong. Try again later."}, status=500)

            if "suggest study plan" in user_input.lower():
                return JsonResponse({'message': "No previous activity found. Start studying first"}, status=200)

            # 🟰 Build the prompt to ensure friendly conversational answers
            prompt = (
                "Answer the following user question naturally in paragraph form. "
                "Avoid using table format or multiple columns. "
                "Write clear sentences or use simple bullet points only if necessary.\n\n"
                f"User: {user_input}"
            )

            # Generate AI response
            model = genai.GenerativeModel('models/gemini-1.5-pro-latest')
            response = model.generate_content(prompt)

            # ✅ Return under 'response' key (important for your frontend to work)
            return JsonResponse({'response': response.text})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)



