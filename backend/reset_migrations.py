import os
import shutil
import subprocess
from app import app, db  # Ensure app and db are correctly imported

# Path to migrations directory inside current folder
MIGRATIONS_DIR = os.path.join(os.path.dirname(__file__), 'migrations')

def reset_migrations():
    # Step 1: Remove migrations folder if it exists
    if os.path.exists(MIGRATIONS_DIR):
        print("Removing old migrations folder...")
        shutil.rmtree(MIGRATIONS_DIR)
    else:
        print("No existing migrations folder found. Skipping delete step.")

    # Step 2–4: Recreate migrations folder, generate migration, apply upgrade
    print("Initializing migration setup...")
    subprocess.run(["flask", "db", "init"], check=True)

    print("Creating initial migration script...")
    subprocess.run(["flask", "db", "migrate", "-m", "Initial migration"], check=True)

    print("Applying migration to database...")
    subprocess.run(["flask", "db", "upgrade"], check=True)

    print("✅ Migration reset complete.")

if __name__ == '__main__':
    reset_migrations