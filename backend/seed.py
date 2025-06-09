from faker import Faker
from app import app, db
from models import User, Group, Membership, Transaction, Savings, FAQ, Notification
import random
from datetime import datetime

fake = Faker()

with app.app_context():
    print("🔄 Clearing old data...")
    db.session.query(Transaction).delete()
    db.session.query(Membership).delete()
    db.session.query(Savings).delete()
    db.session.query(Notification).delete()
    db.session.query(FAQ).delete()
    db.session.query(Group).delete()
    db.session.query(User).delete()

    print("🌱 Creating users...")
    users = []
    for _ in range(20):
        user = User(
            name=fake.name(),
            email=fake.unique.email(),
            password="hashed_dummy_password"
        )
        users.append(user)
        db.session.add(user)

    print("🌱 Creating groups...")
    groups = []
    for _ in range(10):
        group = Group(name=fake.bs().capitalize())
        groups.append(group)
        db.session.add(group)

    db.session.commit()

    print("🔗 Creating memberships...")
    for user in users:
        selected_groups = random.sample(groups, k=random.randint(1, 3))
        for group in selected_groups:
            membership = Membership(
                user=user,
                group=group,
                role='admin' if random.random() < 0.2 else 'member'
            )
            db.session.add(membership)

    print("💰 Creating savings...")
    for _ in range(50):
        saving = Savings(
            user=random.choice(users),
            group=random.choice(groups),
            amount=round(random.uniform(1000, 10000), 2),
            interest=round(random.uniform(0, 500), 2),
            dividends=round(random.uniform(0, 200), 2)
        )
        db.session.add(saving)

    print("💳 Creating transactions...")
    for _ in range(100):
        transaction = Transaction(
            type=random.choice(["deposit", "withdrawal", "service_charge"]),
            amount=round(random.uniform(50, 5000), 2),
            user=random.choice(users),
            group=random.choice(groups),
            date=fake.date_time_between(start_date='-1y', end_date='now')
        )
        db.session.add(transaction)

    print("📩 Creating notifications...")
    for _ in range(30):
        notification = Notification(
            user=random.choice(users),
            message=fake.sentence(nb_words=6),
            timestamp=fake.date_time_this_year()
        )
        db.session.add(notification)

    print("❓ Creating FAQs...")
    for _ in range(10):
        faq = FAQ(
            question=fake.sentence(nb_words=8) + "?",
            answer=fake.paragraph(nb_sentences=2)
        )
        db.session.add(faq)

    db.session.commit()
    print("✅ Full dummy data seeding complete.")