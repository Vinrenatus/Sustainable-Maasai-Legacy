import uuid
import logging
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from extensions import db
from models import User, News, ContactMessage, WarriorApplication, Product
from decorators import admin_required

# Additional imports for Pesapal integration
import requests
from requests_oauthlib import OAuth1

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS for all API routes
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Initialize Logging
logging.basicConfig(level=logging.DEBUG)

@app.route("/")
def index():
    return "Flask server is running!"

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
jwt = JWTManager(app)

# ------------------------------
# Request Parsers
# ------------------------------
warrior_parser = reqparse.RequestParser()
warrior_parser.add_argument("name", type=str, required=True, help="Name is required")
warrior_parser.add_argument("age", type=int, required=True, help="Age is required")
warrior_parser.add_argument("email", type=str, required=True, help="Email is required")
warrior_parser.add_argument("phone", type=str, required=True, help="Phone number is required")
warrior_parser.add_argument("reason", type=str, required=True, help="Reason is required")

register_parser = reqparse.RequestParser()
register_parser.add_argument("username", type=str, required=True, help="Username is required")
register_parser.add_argument("email", type=str, required=True, help="Email is required")
register_parser.add_argument("password", type=str, required=True, help="Password is required")
register_parser.add_argument("role", type=str, default="user")

login_parser = reqparse.RequestParser()
login_parser.add_argument("username", type=str, required=True, help="Username is required")
login_parser.add_argument("password", type=str, required=True, help="Password is required")

news_parser = reqparse.RequestParser()
news_parser.add_argument("title", type=str, required=True, help="Title is required")
news_parser.add_argument("content", type=str, required=True, help="Content is required")
news_parser.add_argument("image_url", type=str, required=False, help="Image URL is optional")

contact_parser = reqparse.RequestParser()
contact_parser.add_argument("name", type=str, required=True, help="Name is required")
contact_parser.add_argument("email", type=str, required=True, help="Email is required")
contact_parser.add_argument("subject", type=str, required=True, help="Subject is required")
contact_parser.add_argument("message", type=str, required=True, help="Message is required")

# ------------------------------
# Resources
# ------------------------------

class WarriorApplicationResource(Resource):
    def options(self):
        return {}, 200

    def post(self):
        data = warrior_parser.parse_args()
        try:
            application = WarriorApplication(**data)
            db.session.add(application)
            db.session.commit()
            return {"message": "Warrior application submitted successfully!"}, 201
        except Exception as e:
            app.logger.error("Database Error: %s", str(e), exc_info=True)
            return {"error": "Internal Server Error"}, 500

class UserRegister(Resource):
    def options(self):
        return {}, 200

    def post(self):
        data = register_parser.parse_args()
        if User.query.filter((User.username == data["username"]) | (User.email == data["email"])).first():
            return {"message": "User with that username or email already exists"}, 400

        user = User(username=data["username"], email=data["email"], role=data["role"])
        user.set_password(data["password"])

        try:
            db.session.add(user)
            db.session.commit()
            return {"message": "User registered successfully"}, 201
        except Exception as e:
            app.logger.error("Error registering user: %s", str(e), exc_info=True)
            return {"error": "Internal Server Error"}, 500

class UserLogin(Resource):
    def options(self):
        return {}, 200

    def post(self):
        data = login_parser.parse_args()
        user = User.query.filter_by(username=data["username"]).first()
        if not user or not user.check_password(data["password"]):
            return {"message": "Invalid credentials"}, 401
        access_token = create_access_token(identity={"id": user.id, "role": user.role})
        return {"access_token": access_token}, 200

class NewsResource(Resource):
    def options(self, news_id=None):
        return {}, 200

    def get(self, news_id=None):
        try:
            if news_id:
                news = News.query.get(news_id)
                if not news:
                    return {"message": "News article not found"}, 404
                return {
                    "id": news.id,
                    "title": news.title,
                    "content": news.content,
                    "image_url": news.image_url,
                    "created_at": news.created_at.strftime("%Y-%m-%d %H:%M:%S")
                }, 200

            news_list = News.query.all()
            return {
                "news": [{
                    "id": n.id,
                    "title": n.title,
                    "content": n.content,
                    "image_url": n.image_url,
                    "created_at": n.created_at.strftime("%Y-%m-%d %H:%M:%S")
                } for n in news_list]
            }, 200
        except Exception as e:
            app.logger.error("Error fetching news: %s", str(e), exc_info=True)
            return {"error": "Internal Server Error"}, 500

    @admin_required
    def post(self):
        data = news_parser.parse_args()
        if not data["title"] or not data["content"]:
            return {"message": "Title and content are required"}, 400

        try:
            new_news = News(
                title=data["title"],
                content=data["content"],
                image_url=data["image_url"] if data["image_url"] else None
            )
            db.session.add(new_news)
            db.session.commit()
            return {"message": "News article created successfully!"}, 201
        except Exception as e:
            app.logger.error("Error creating news: %s", str(e), exc_info=True)
            return {"error": "Internal Server Error"}, 500

    @admin_required
    def put(self, news_id):
        data = news_parser.parse_args()
        news = News.query.get(news_id)
        if not news:
            return {"message": "News article not found"}, 404

        if not data["title"] or not data["content"]:
            return {"message": "Title and content are required"}, 400

        try:
            news.title = data["title"]
            news.content = data["content"]
            news.image_url = data["image_url"] if data["image_url"] else news.image_url
            db.session.commit()
            return {"message": "News article updated successfully!"}, 200
        except Exception as e:
            app.logger.error("Error updating news: %s", str(e), exc_info=True)
            return {"error": "Internal Server Error"}, 500

    @admin_required
    def delete(self, news_id):
        news = News.query.get(news_id)
        if not news:
            return {"message": "News article not found"}, 404

        try:
            db.session.delete(news)
            db.session.commit()
            return {"message": "News article deleted successfully!"}, 200
        except Exception as e:
            app.logger.error("Error deleting news: %s", str(e), exc_info=True)
            return {"error": "Internal Server Error"}, 500

class ProductResource(Resource):
    def options(self):
        return {}, 200

    def get(self):
        try:
            products = Product.query.all()
            result = [{"id": p.id, "name": p.name, "price": p.price, "description": p.description, "image_url": p.image_url} for p in products]
            return {"products": result}, 200
        except Exception as e:
            app.logger.error("Error fetching products: %s", str(e), exc_info=True)
            return {"error": "Internal Server Error"}, 500

    @admin_required
    def post(self):
        data = request.get_json()
        try:
            product = Product(**data)
            db.session.add(product)
            db.session.commit()
            return {"message": "Product created successfully!"}, 201
        except Exception as e:
            app.logger.error("Error creating product: %s", str(e), exc_info=True)
            return {"error": "Internal Server Error"}, 500

    @admin_required
    def put(self, product_id):
        data = request.get_json()
        product = Product.query.get(product_id)
        if not product:
            return {"message": "Product not found"}, 404
        try:
            product.name = data.get("name", product.name)
            product.price = data.get("price", product.price)
            product.description = data.get("description", product.description)
            product.image_url = data.get("image_url", product.image_url)
            db.session.commit()
            return {"message": "Product updated successfully!"}, 200
        except Exception as e:
            app.logger.error("Error updating product: %s", str(e), exc_info=True)
            return {"error": "Internal Server Error"}, 500

    @admin_required
    def delete(self, product_id):
        product = Product.query.get(product_id)
        if not product:
            return {"message": "Product not found"}, 404
        try:
            db.session.delete(product)
            db.session.commit()
            return {"message": "Product deleted successfully!"}, 200
        except Exception as e:
            app.logger.error("Error deleting product: %s", str(e), exc_info=True)
            return {"error": "Internal Server Error"}, 500

# ------------------------------
# Live Pesapal Checkout Integration
# ------------------------------

class CheckoutResource(Resource):
    def options(self):
        return {}, 200

    def post(self):
        data = request.get_json()
        total = data.get("total")
        if total is None:
            return {"message": "Invalid checkout data"}, 400

        # Generate a unique reference for the order
        reference = str(uuid.uuid4())

        # Prepare order data as required by Pesapal
        order_data = {
            "amount": total,
            "currency": "USD",  # Change if necessary
            "description": "Purchase from Maasai Legacy",
            "type": "MERCHANT",
            "reference": reference,
            "callback_url": app.config.get("PESAPAL_CALLBACK_URL")
        }

        # Pesapal live endpoint
        pesapal_url = "https://www.pesapal.com/API/PostPesapalDirectOrderV4"

        # Setup OAuth1 credentials using Pesapal consumer key and secret
        oauth = OAuth1(
            client_key=app.config.get("PESAPAL_CONSUMER_KEY"),
            client_secret=app.config.get("PESAPAL_CONSUMER_SECRET"),
            signature_method='HMAC-SHA1'
        )

        try:
            response = requests.post(pesapal_url, data=order_data, auth=oauth)
            if response.status_code == 200:
                redirect_url = response.text.strip()
                return {"redirectUrl": redirect_url}, 200
            else:
                app.logger.error("Pesapal Checkout Error: %s", response.text)
                return {"error": "Pesapal Checkout Error"}, 500
        except Exception as e:
            app.logger.error("Pesapal Exception: %s", str(e), exc_info=True)
            return {"error": "Pesapal Checkout Exception"}, 500

class AdminDashboardResource(Resource):
    @admin_required
    def get(self):
        try:
            contacts = ContactMessage.query.all()
            applications = WarriorApplication.query.all()
            users = User.query.all()
            contacts_data = [{
                "id": c.id,
                "name": c.name,
                "email": c.email,
                "subject": c.subject,
                "message": c.message,
                "submitted_at": c.submitted_at.strftime("%Y-%m-%d %H:%M:%S")
            } for c in contacts]
            applications_data = [{
                "id": a.id,
                "name": a.name,
                "age": a.age,
                "email": a.email,
                "phone": a.phone,
                "reason": a.reason
            } for a in applications]
            users_data = [{
                "id": u.id,
                "username": u.username,
                "email": u.email,
                "role": u.role
            } for u in users]
            return {
                "contacts": contacts_data,
                "applications": applications_data,
                "users": users_data
            }, 200
        except Exception as e:
            app.logger.error("Error fetching admin dashboard data: %s", str(e), exc_info=True)
            return {"error": "Internal Server Error"}, 500

# ------------------------------
# New Contact Resource
# ------------------------------

class ContactResource(Resource):
    def options(self):
        return {}, 200

    def post(self):
        data = contact_parser.parse_args()
        try:
            contact_msg = ContactMessage(**data)
            db.session.add(contact_msg)
            db.session.commit()
            return {"message": "Contact message submitted successfully!"}, 201
        except Exception as e:
            app.logger.error("Error submitting contact message: %s", str(e), exc_info=True)
            return {"error": "Internal Server Error"}, 500

# ------------------------------
# Endpoint Registrations
# ------------------------------
api.add_resource(WarriorApplicationResource, "/api/warrior-application")
api.add_resource(UserRegister, "/api/signup")
api.add_resource(UserLogin, "/api/login")
api.add_resource(ProductResource, "/api/product", "/api/product/<int:product_id>")
api.add_resource(CheckoutResource, "/api/checkout")
api.add_resource(NewsResource, "/api/news", "/api/news/<int:news_id>")
api.add_resource(AdminDashboardResource, "/api/admin/dashboard")
api.add_resource(ContactResource, "/api/contact")  # New Contact endpoint

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
