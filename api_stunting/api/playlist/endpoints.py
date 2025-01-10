"""Routes for module playlist"""
import os
from flask import Blueprint, jsonify, request
from helper.db_helper import get_connection
from helper.form_validation import get_form_data

playlist_endpoints = Blueprint('playlist', __name__)
UPLOAD_FOLDER = "uploads"

@playlist_endpoints.route('/read', methods=['GET'])
def read():
    """Routes for fetching the list of playlists"""
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)
    select_query = "SELECT * FROM playlist"
    cursor.execute(select_query)
    results = cursor.fetchall()
    cursor.close() 
    connection.close() # Close the cursor after query execution
    return jsonify({"message": "OK", "datas": results}), 200


@playlist_endpoints.route('/create', methods=['POST'])
def create():
    """Routes for creating a new playlist"""
    required = get_form_data(["play_name", "play_genre", "play_url", "play_description", "play_thumbnail"])  # Required fields
    play_name = required["play_name"]
    play_genre = required["play_genre"]
    play_url = required["play_url"]
    play_description = required["play_description"]
    play_thumbnail = required["play_thumbnail"]

    connection = get_connection()
    cursor = connection.cursor()
    insert_query = """
        INSERT INTO playlist (play_name, play_genre, play_url, play_description, play_thumbnail)
        VALUES (%s, %s, %s, %s, %s)
    """
    request_insert = (play_name, play_genre, play_url, play_description, play_thumbnail)
    cursor.execute(insert_query, request_insert)
    connection.commit()  # Commit changes to the database
    new_id = cursor.lastrowid  # Get the newly inserted playlist's ID
    cursor.close()
    connection.close()
    if new_id:
        return jsonify({"play_name": play_name, "message": "Inserted", "id_play": new_id}), 201
    return jsonify({"message": "Can't Insert Data"}), 500


@playlist_endpoints.route('/update/<playlist_id>', methods=['PUT'])
def update(playlist_id):
    """Routes for updating a playlist"""
    play_name = request.form['play_name']
    play_genre = request.form['play_genre']
    play_url = request.form['play_url']
    play_description = request.form['play_description']
    play_thumbnail = request.form['play_thumbnail']

    connection = get_connection()
    cursor = connection.cursor()

    update_query = """
        UPDATE playlist
        SET play_name=%s, play_genre=%s, play_url=%s, play_description=%s, play_thumbnail=%s
        WHERE id_play=%s
    """
    update_request = (play_name, play_genre, play_url, play_description, play_thumbnail, playlist_id)
    cursor.execute(update_query, update_request)
    connection.commit()
    cursor.close()
    connection.close()
    data = {"message": "Updated", "id_play": playlist_id}
    return jsonify(data), 200


@playlist_endpoints.route('/delete/<playlist_id>', methods=['DELETE'])
def delete(playlist_id):
    """Routes for deleting a playlist"""
    connection = get_connection()
    cursor = connection.cursor()

    delete_query = "DELETE FROM playlist WHERE id_play = %s"
    delete_id = (playlist_id,)
    cursor.execute(delete_query, delete_id)
    connection.commit()
    cursor.close()
    connection.close()
    data = {"message": "Data deleted", "id_play": playlist_id}
    return jsonify(data)


@playlist_endpoints.route("/upload", methods=["POST"])
def upload():
    """Routes for uploading a file"""
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        file_path = os.path.join(UPLOAD_FOLDER, uploaded_file.filename)
        uploaded_file.save(file_path)
        return jsonify({"message": "ok", "data": "uploaded", "file_path": file_path}), 200
    return jsonify({"err_message": "Can't upload data"}), 400

@playlist_endpoints.route('/count', methods=['GET'])
def count_playlists():
    """Route to count the number of playlists in the table"""
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)
    count_query = "SELECT COUNT(*) AS total_playlists FROM playlist"
    cursor.execute(count_query)
    result = cursor.fetchone()
    cursor.close()
    connection.close()
    return jsonify({"message": "OK", "total_playlists": result['total_playlists']}), 200