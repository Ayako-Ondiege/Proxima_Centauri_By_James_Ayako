from extensions import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    memberships = db.relationship('Membership', back_populates='user', cascade='all, delete-orphan')
    transactions = db.relationship('Transaction', back_populates='user', cascade='all, delete-orphan')
    savings = db.relationship('Savings', back_populates='user', cascade='all, delete-orphan')
    notifications = db.relationship('Notification', back_populates='user', cascade='all, delete-orphan')

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    members = db.relationship('Membership', back_populates='group', cascade='all, delete-orphan')
    transactions = db.relationship('Transaction', back_populates='group', cascade='all, delete-orphan')
    savings = db.relationship('Savings', back_populates='group', cascade='all, delete-orphan')

class Membership(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'))
    role = db.Column(db.String(50), default='member')

    user = db.relationship('User', back_populates='memberships')
    group = db.relationship('Group', back_populates='members')

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'))

    user = db.relationship('User', back_populates='transactions')
    group = db.relationship('Group', back_populates='transactions')

class Savings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    interest = db.Column(db.Float, default=0.0)
    dividends = db.Column(db.Float, default=0.0)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'))

    user = db.relationship('User', back_populates='savings')
    group = db.relationship('Group', back_populates='savings')

class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', back_populates='notifications')

class FAQ(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(255), nullable=False)
    answer = db.Column(db.Text, nullable=False)

