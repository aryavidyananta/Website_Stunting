"""Routes for module protected endpoints"""
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from helper.jwt_helper import get_roles

# Define blueprint for protected endpoints
protected_endpoints = Blueprint('data_protected', __name__)

@protected_endpoints.route('/data', methods=['GET'])
@jwt_required()
def get_data():
    """
    Routes for demonstrate protected data endpoints, 
    need jwt to visit this endpoint
    """
    print("[DEBUG] Accessing /data endpoint")
    
    # Get the current user identity from JWT
    current_user = get_jwt_identity()
    print(f"[DEBUG] Current user identity: {current_user}")

    # Fetch roles using helper function
    roles = get_roles()
    print(f"[DEBUG] Roles fetched: {roles}")

    # Prepare response
    response = {
        "message": "OK",
        "user_logged": current_user['username'],
        "roles": roles
    }
    print(f"[DEBUG] Response prepared: {response}")

    # Return JSON response
    return jsonify(response), 200
