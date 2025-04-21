from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
import google.generativeai as genai
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

# Configure Gemini API
api_key = os.getenv("GEMINI_API_KEY")  # Key should come from .env
genai.configure(api_key=api_key)

@csrf_exempt
def chat_with_bot(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_input = data.get('user_input', '')

            if not user_input:
                return JsonResponse({'error': 'Message cannot be empty'}, status=400)

            # Correct model
            model = genai.GenerativeModel(model_name="models/gemini-1.5-pro")

            # Use **generate_content** properly
            response = model.generate_content(user_input)

            # Note: response.text doesn't exist directly, you have to access parts
            result_text = response.candidates[0].content.parts[0].text

            return JsonResponse({'response': result_text})
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


