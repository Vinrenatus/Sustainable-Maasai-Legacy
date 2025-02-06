from app import app
from models import db, User

with app.app_context():
    db.drop_all()
    db.create_all()

    admin = User(username='admin', email='admin@example.com', role='admin')
    admin.set_password('adminpass')
    
    user1 = User(username='john', email='john@example.com', role='user')
    user1.set_password('johnpass')
    
    user2 = User(username='alice', email='alice@example.com', role='user')
    user2.set_password('alicepass')
    
    user3 = User(username='bob', email='bob@example.com', role='user')
    user3.set_password('bobpass')
    
    user4 = User(username='eve', email='eve@example.com', role='user')
    user4.set_password('evepass')
    
    db.session.add_all([admin, user1, user2, user3, user4])
    db.session.commit()

    print("Database seeded successfully!")
