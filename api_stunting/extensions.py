"""Add bcrypt and jwt extensions"""
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

# Inisialisasi ekstensi global
bcrypt = Bcrypt()
jwt = JWTManager()
