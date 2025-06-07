from app import app, db
from models import User, Group, Membership, Transaction, Savings

with app.app_context():
    print("Clearing old data...")
    db.session.query(Transaction).delete()
    db.session.query(Membership).delete()
    db.session.query(Savings).delete()
    db.session.query(Group).delete()
    db.session.query(User).delete()

    # Create users
    alice = User(name="Alice", email="alice@example.com", password="hashedpass1")
    bob = User(name="Bob", email="bob@example.com", password="hashedpass2")

    # Create groups
    home_group = Group(name="Household")
    trip_group = Group(name="Trip to Mombasa")

    # Add memberships
    m1 = Membership(user=alice, group=home_group, role='admin')
    m2 = Membership(user=bob, group=home_group)
    m3 = Membership(user=alice, group=trip_group)

    # Add savings
    s1 = Savings(user=alice, group=home_group, amount=5000, interest=100, dividends=50)
    s2 = Savings(user=bob, group=home_group, amount=3000)

    # Add transactions
    t1 = Transaction(type="deposit", amount=1000, user=alice, group=home_group)
    t2 = Transaction(type="service_charge", amount=200, user=bob, group=home_group)

    db.session.add_all([alice, bob, home_group, trip_group, m1, m2, m3, s1, s2, t1, t2])
    db.session.commit()
    print("✅ Seeding complete.")