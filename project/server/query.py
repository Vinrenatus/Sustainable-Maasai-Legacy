from app import app
from models import db, User, News

with app.app_context():
    # Query all users
    users = User.query.all()
    for user in users:
        print(f"User: {user.username} ({user.email}) - Role: {user.role}")
    
    # Query all news items
    news_items = News.query.all()
    for news in news_items:
        print(f"News: {news.title} by User ID: {news.user_id}, Image URL: {news.image_url}")
