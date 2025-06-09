# routes/_init_.py
from flask import Blueprint
from routes.savings import savings_bp

def register_blueprints(app):
    app.register_blueprint(savings_bp)


