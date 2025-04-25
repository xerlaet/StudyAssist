import os
import firebase_admin
from firebase_admin import credentials, initialize_app

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cred_path = os.path.join(BASE_DIR, "firebase_service_account.json")

if not firebase_admin._apps:
    cred = credentials.Certificate(cred_path)
    initialize_app(cred)
