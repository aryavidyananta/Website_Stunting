"""Small apps to demonstrate endpoints with basic feature - CRUD"""

from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from extensions import jwt
from api.auth.endpoints import auth_endpoints
from api.data_protected.endpoints import protected_endpoints

from config import Config
from static.static_file_server import static_file_server
from api.blog.endpoints import blog_endpoints
from api.medis.endpoints import medis_endpoints
from api.playlist.endpoints import playlist_endpoints
from api.user.endpoints import user_endpoints


# Load environment variables from the .env file
load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)

# ✅ Aktifkan CORS hanya untuk API dan React origin
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
        "supports_credentials": True,
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

jwt.init_app(app)

# Register blueprints
app.register_blueprint(auth_endpoints, url_prefix='/api/v1/auth')
app.register_blueprint(protected_endpoints, url_prefix='/api/v1/protected')
app.register_blueprint(blog_endpoints, url_prefix='/api/v1/blog')
app.register_blueprint(medis_endpoints, url_prefix='/api/v1/medis')
app.register_blueprint(playlist_endpoints, url_prefix='/api/v1/playlist')
app.register_blueprint(user_endpoints, url_prefix='/api/v1/user')
app.register_blueprint(static_file_server, url_prefix='/static/')

if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True, port=5000)
