import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

# Load environment variables from .env
load_dotenv()

# Initialize app and config
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "dev")
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL", "sqlite:///app.db")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
from extensions import db
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

# Import models after initializing db
from models import User, Group, Membership, Transaction, Savings, Notification, FAQ

@app.route('/')
def home():
    return jsonify({"message": "Welcome to Proxima Centauri API"})

# ---------------- AUTH ----------------
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = generate_password_hash(data.get("password"))

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 409

    new_user = User(name=name, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created", "user": {"id": new_user.id, "name": name}}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get("email")).first()

    if user and check_password_hash(user.password, data.get("password")):
        return jsonify({"user": {"id": user.id, "name": user.name, "email": user.email}})
    return jsonify({"error": "Invalid email or password"}), 401

# ---------------- GROUPS ----------------
@app.route('/api/groups', methods=['GET'])
def get_groups():
    groups = Group.query.all()
    return jsonify([{ "id": group.id, "name": group.name, "members": [m.user.name for m in group.members] } for group in groups])

@app.route('/api/groups', methods=['POST'])
def create_group():
    data = request.get_json()
    name = data.get("name")
    user_id = data.get("user_id")

    group = Group(name=name)
    db.session.add(group)
    db.session.commit()

    membership = Membership(user_id=user_id, group_id=group.id, role='admin')
    db.session.add(membership)
    db.session.commit()

    return jsonify({"message": "Group created", "group_id": group.id}), 201

# ---------------- TRANSACTIONS ----------------
@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    transactions = Transaction.query.all()
    return jsonify([{
        "id": t.id,
        "type": t.type,
        "amount": t.amount,
        "date": t.date.isoformat(),
        "user": t.user.name,
        "group": t.group.name
    } for t in transactions])

@app.route('/api/transactions', methods=['POST'])
def add_transaction():
    data = request.get_json()
    transaction = Transaction(
        type=data.get("type"),
        amount=data.get("amount"),
        user_id=data.get("user_id"),
        group_id=data.get("group_id"),
        date=datetime.utcnow()
    )
    db.session.add(transaction)
    db.session.commit()
    return jsonify({"message": "Transaction added", "id": transaction.id}), 201

# ---------------- SAVINGS ----------------
@app.route('/api/savings', methods=['GET'])
def view_savings():
    # TODO: Implement real savings logic
    return jsonify({"message": "Savings view not yet implemented"})

# ---------------- REMINDERS ----------------
@app.route('/api/reminders', methods=['GET'])
def get_reminders():
    # TODO: Implement reminders/notifications retrieval
    return jsonify({"message": "Reminders not yet implemented"})

# ---------------- FAQ / HELP ----------------
@app.route('/api/help', methods=['GET'])
def get_help():
    faqs = FAQ.query.all()
    return jsonify([{"question": f.question, "answer": f.answer} for f in faqs])

# ---------------- CLI Entrypoint ----------------
if __name__ == '__main__':
    app.run(debug=True)