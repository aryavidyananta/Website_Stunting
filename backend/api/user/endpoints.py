"""Routes for module authors"""
import os
from flask import Blueprint, jsonify, request
from helper.db_helper import get_connection
from helper.form_validation import get_form_data
from flask_jwt_extended import jwt_required

user_endpoints = Blueprint('authors', __name__)
UPLOAD_FOLDER = "img"


@user_endpoints.route('/read', methods=['GET'])
@jwt_required()
def read():
    """Routes for module get list authors"""
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)
    select_query = "SELECT * FROM user"
    cursor.execute(select_query)
    results = cursor.fetchall()
    cursor.close() 
    connection.close() # Close the cursor after query execution
    return jsonify({"message": "OK", "datas": results}), 200


@user_endpoints.route('/create', methods=['POST'])
@jwt_required()
def create():
    """Routes for module create a book"""
    required = get_form_data(["first_name"])  # use only if the field required
    first_name = required["first_name"]
    last_name = request.form['last_name']

    connection = get_connection()
    cursor = connection.cursor()
    insert_query = "INSERT INTO user (first_name, last_name) VALUES (%s, %s)"
    request_insert = (first_name, last_name)
    cursor.execute(insert_query, request_insert)
    connection.commit()  # Commit changes to the database
    cursor.close()
    connection.close()
    new_id = cursor.lastrowid  # Get the newly inserted book's ID\
    if new_id:
        return jsonify({"first_name": first_name, "message": "Inserted", "author_id": new_id}), 201
    return jsonify({"message": "Cant Insert Data"}), 500


@user_endpoints.route('/update/<author_id>', methods=['PUT'])
@jwt_required()
def update(author_id):
    """Routes for module update a book"""
    first_name = request.form['first_name']
    last_name = request.form['last_name']

    connection = get_connection()
    cursor = connection.cursor()

    update_query = "UPDATE user SET first_name=%s, last_name=%s WHERE author_id=%s"
    update_request = (first_name, last_name, author_id)
    cursor.execute(update_query, update_request)
    connection.commit()
    cursor.close()
    connection.close()
    data = {"message": "updated", "author_id": author_id}
    return jsonify(data), 200


@user_endpoints.route('/delete/<author_id>', methods=['DELETE'])
@jwt_required()
def delete(author_id):
    """Routes for module to delete a book"""
    connection = get_connection()
    cursor = connection.cursor()

    delete_query = "DELETE FROM user WHERE author_id = %s"
    delete_id = (author_id,)
    cursor.execute(delete_query, delete_id)
    connection.commit()
    cursor.close()
    connection.close()
    data = {"message": "Data deleted", "author_id": author_id}
    return jsonify(data)


@user_endpoints.route("/upload", methods=["POST"])
def upload():
    """Routes for upload file"""
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        file_path = os.path.join(UPLOAD_FOLDER, uploaded_file.filename)
        uploaded_file.save(file_path)
        return jsonify({"message": "ok", "data": "uploaded", "file_path": file_path}), 200
    return jsonify({"err_message": "Can't upload data"}), 400


@user_endpoints.route('/read_by_role/<role>', methods=['GET'])
def read_by_role(role):
    """Routes for module get list authors by role"""
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)
    select_query = "SELECT Id_User, username, email, roles FROM user WHERE roles = %s"
    cursor.execute(select_query, (role,))
    results = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify({"message": "OK", "datas": results}), 200

@user_endpoints.route('/count_by_role/<role>', methods=['GET'])
def count_users_by_role(role):
    """Route to count the number of users by role"""
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)
    count_query = "SELECT COUNT(*) AS total_users FROM user WHERE roles = %s"
    cursor.execute(count_query, (role,))
    result = cursor.fetchone()
    cursor.close()
    connection.close()
    return jsonify({"message": "OK", "role": role, "total_users": result['total_users']}), 200

