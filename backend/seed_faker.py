# seed_faker.py
from faker import Faker
import random
from datetime import datetime
from app import app, db
from models import User, Group, Membership, Transaction, Savings, Notification, FAQ

fake = Faker()

with app.app_context():
    print("🔄 Clearing old data...")
    db.session.query(Transaction).delete()
    db.session.query(Membership).delete()
    db.session.query(Savings).delete()
    db.session.query(Notification).delete()
    db.session.query(Group).delete()
    db.session.query(User).delete()
    db.session.query(FAQ).delete()

    print("🌱 Generating dummy data...")

    users = [User(name=fake.name(), email=fake.unique.email(), password="hashed_password") for _ in range(50)]
    groups = [Group(name=fake.bs().title()) for _ in range(10)]

    db.session.add_all(users + groups)
    db.session.commit()

    memberships, savings, transactions, notifications = [], [], [], []

    for user in users:
        for group in random.sample(groups, random.randint(1, 3)):
            memberships.append(Membership(user=user, group=group, role=random.choice(['member', 'admin'])))
            savings.append(Savings(user=user, group=group,
                                   amount=round(random.uniform(1000, 10000), 2),
                                   interest=round(random.uniform(0, 500), 2),
                                   dividends=round(random.uniform(0, 200), 2)))
            transactions.append(Transaction(user=user, group=group,
                                            type=random.choice(['deposit', 'withdrawal', 'service_charge']),
                                            amount=round(random.uniform(100, 5000), 2)))

        notifications.append(Notification(user=user, message=fake.sentence()))

    faqs = [FAQ(question=fake.sentence(), answer=fake.paragraph()) for _ in range(10)]

    db.session.add_all(memberships + savings + transactions + notifications + faqs)
    db.session.commit()

    print("✅ Seeding with Faker complete.")