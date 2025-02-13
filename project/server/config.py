import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL', 
        'postgresql://rugundu:vincent@localhost:5432/maasaidb'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'super-secret-key')
    
    # Pesapal Config (Sandbox)
    PESAPAL_CONSUMER_KEY = os.getenv("PESAPAL_CONSUMER_KEY")
    PESAPAL_CONSUMER_SECRET = os.getenv("PESAPAL_CONSUMER_SECRET")
    PESAPAL_CALLBACK_URL = os.getenv("PESAPAL_CALLBACK_URL").strip()
    # Use a dummy notification ID for sandbox testing if none is set.
    PESAPAL_NOTIFICATION_ID = os.getenv("PESAPAL_NOTIFICATION_ID", "00000000-0000-0000-0000-000000000000")
    # Base URL for Pesapal sandbox endpoints
    PESAPAL_BASE_URL = "https://cybqa.pesapal.com/pesapalv3"
