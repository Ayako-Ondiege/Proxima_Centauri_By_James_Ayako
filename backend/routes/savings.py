from flask import Blueprint, request, jsonify
from models import Savings, User, Group
from extensions import db

savings_bp = Blueprint('savings_bp', __name__)

# Get all savings
@savings_bp.route('/api/savings', methods=['GET'])
def get_all_savings():
    savings = Savings.query.all()
    result = [{
        "id": s.id,
        "amount": s.amount,
        "interest": s.interest,
        "dividends": s.dividends,
        "user": s.user.name if s.user else None,
        "group": s.group.name if s.group else None
    } for s in savings]
    return jsonify(result), 200

# Add a new saving
@savings_bp.route('/api/savings', methods=['POST'])
def create_saving():
    data = request.get_json()
    try:
        saving = Savings(
            user_id=data["user_id"],
            group_id=data["group_id"],
            amount=data["amount"],
            interest=data.get("interest", 0.0),
            dividends=data.get("dividends", 0.0)
        )
        db.session.add(saving)
        db.session.commit()
        return jsonify({"message": "Saving added", "saving_id": saving.id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400