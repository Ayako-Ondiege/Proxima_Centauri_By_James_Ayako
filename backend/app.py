import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

# Load environment variables
load_dotenv()

# Initialize app and config
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "dev")
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL", "sqlite:///instance/app.db")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
from extensions import db
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

# Import models
from models import User, Group, Membership, Transaction, Savings, Notification, FAQ

# ---------------- ROOT ----------------
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
    return jsonify([
        {
            "id": group.id,
            "name": group.name,
            "members": [m.user.name for m in group.members]
        } for group in groups
    ])

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

@app.route('/api/groups/summary', methods=['GET'])
def group_summary():
    groups = Group.query.all()
    return jsonify([
        {
            "id": g.id,
            "name": g.name,
            "member_count": len(g.members)
        } for g in groups
    ])

# ---------------- TRANSACTIONS ----------------
@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    transactions = Transaction.query.all()
    return jsonify([
        {
            "id": t.id,
            "type": t.type,
            "amount": t.amount,
            "date": t.date.isoformat(),
            "user": t.user.name,
            "group": t.group.name
        } for t in transactions
    ])

@app.route('/api/transactions/recent', methods=['GET'])
def recent_transactions():
    transactions = Transaction.query.order_by(Transaction.date.desc()).limit(5).all()
    return jsonify([
        {
            "id": t.id,
            "type": t.type,
            "amount": t.amount,
            "date": t.date.isoformat(),
            "user": t.user.name,
            "group": t.group.name
        } for t in transactions
    ])

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
    savings = Savings.query.all()
    return jsonify([
        {
            "id": s.id,
            "amount": s.amount,
            "interest": s.interest,
            "dividends": s.dividends,
            "user": s.user.name,
            "group": s.group.name
        } for s in savings
    ])

@app.route('/api/savings', methods=['POST'])
def add_savings():
    data = request.get_json()
    saving = Savings(
        user_id=data.get("user_id"),
        group_id=data.get("group_id"),
        amount=data.get("amount"),
        interest=data.get("interest", 0.0),
        dividends=data.get("dividends", 0.0)
    )
    db.session.add(saving)
    db.session.commit()
    return jsonify({"message": "Saving record added", "id": saving.id}), 201

@app.route('/api/finance/overview', methods=['GET'])
def finance_overview():
    total_savings = sum(s.amount for s in Savings.query.all())
    total_transactions = sum(t.amount for t in Transaction.query.all())

    return jsonify({
        "total_savings": total_savings,
        "total_transactions": total_transactions,
        "net_balance": total_savings - total_transactions
    })

# ---------------- MEMBERS ----------------
@app.route('/api/members', methods=['GET'])
def get_members():
    members = Membership.query.all()
    return jsonify([
        {
            "id": m.id,
            "user": m.user.name,
            "group": m.group.name,
            "role": m.role
        } for m in members
    ])

# ---------------- REMINDERS ----------------
@app.route('/api/reminders', methods=['GET'])
def get_reminders():
    return jsonify([
        {"id": 1, "text": "Weekly contribution due"},
        {"id": 2, "text": "Loan repayment deadline"}
    ])

# ---------------- FAQ / HELP ----------------
@app.route('/api/help', methods=['GET'])
def get_help():
    faqs = FAQ.query.all()
    return jsonify([{"question": f.question, "answer": f.answer} for f in faqs])

# ---------------- ENTRYPOINT ----------------
if __name__ == '__main__':
    app.run(debug=True)