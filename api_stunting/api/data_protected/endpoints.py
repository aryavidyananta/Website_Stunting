"""Routes for module protected endpoints"""
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from helper.jwt_helper import get_roles

protected_endpoints = Blueprint('data_protected', __name__)

@protected_endpoints.route('/data', methods=['GET'])
@jwt_required()
def get_data():
    """Protected endpoint — memerlukan JWT"""
    print("[DEBUG] Accessing /data endpoint")

    # get_jwt_identity() sekarang mengembalikan string, bukan dict
    current_user = get_jwt_identity()
    print(f"[DEBUG] Current user identity: {current_user}")

    roles = get_roles()
    print(f"[DEBUG] Roles fetched: {roles}")

    response = {
        "message": "OK",
        "user_logged": current_user,   # ← cukup pakai string-nya langsung
        "roles": roles
    }
    print(f"[DEBUG] Response prepared: {response}")

    return jsonify(response), 200
