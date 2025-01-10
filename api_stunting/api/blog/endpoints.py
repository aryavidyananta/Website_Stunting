"""Routes for module blog"""
import os
from flask import Blueprint, jsonify, request
from helper.db_helper import get_connection
from helper.form_validation import get_form_data

blog_endpoints = Blueprint('blog', __name__)
UPLOAD_FOLDER = "img"


@blog_endpoints.route('/read', methods=['GET'])
def read():
    """Routes for module get list blogs"""
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)
    select_query = "SELECT * FROM blog"
    cursor.execute(select_query)
    results = cursor.fetchall()
    cursor.close()
    connection.close()  # Close the cursor after query execution
    return jsonify({"message": "OK", "datas": results}), 200


@blog_endpoints.route('/read/<Id_Blog>', methods=['GET'])
def read_by_id(Id_Blog):
    """Routes for module get blog by Id_Blog"""
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)
    select_query = "SELECT * FROM blog WHERE Id_Blog = %s"
    cursor.execute(select_query, (Id_Blog,))
    result = cursor.fetchone()
    cursor.close()
    connection.close()
    if result:
        return jsonify({"message": "OK", "data": result}), 200
    return jsonify({"message": "Blog not found", "Id_Blog": Id_Blog}), 404


@blog_endpoints.route('/create', methods=['POST'])
def create():
    """Routes for module create a blog"""
    required = get_form_data(["Judul"])  # Use only if the field is required
    Judul = required["Judul"]
    Deskripsi = request.form['Deskripsi']
    Gambar = request.files.get('Gambar', None)

    # Handle Gambar upload if exists
    Gambar_path = None
    if Gambar and Gambar.filename != '':
        Gambar_path = os.path.join(UPLOAD_FOLDER, Gambar.filename)
        Gambar.save(Gambar_path)

    connection = get_connection()
    cursor = connection.cursor()
    insert_query = """
        INSERT INTO blog (Judul, Deskripsi, Gambar) 
        VALUES (%s, %s, %s)
    """
    request_insert = (Judul, Deskripsi, Gambar_path)
    cursor.execute(insert_query, request_insert)
    connection.commit()  # Commit changes to the database
    new_id = cursor.lastrowid  # Get the newly inserted blog's ID
    cursor.close()
    connection.close()
    
    if new_id:
        return jsonify({"Judul": Judul, "message": "Inserted", "Id_Blog": new_id, "Gambar": Gambar_path}), 201
    return jsonify({"message": "Cannot Insert Data"}), 500


@blog_endpoints.route('/update/<int:Id_Blog>', methods=['PUT'])
def update(Id_Blog):
    """Routes for module update a blog"""

    # Mengambil data yang dikirimkan dalam form
    Judul = request.form.get("Judul", None)
    Deskripsi = request.form.get("Deskripsi", None)
    Gambar = request.files.get('Gambar', None)

    # Menyiapkan variabel untuk query
    update_values = []
    update_set = []

    # Hanya memperbarui field yang diberikan
    if Judul:
        update_set.append("Judul = %s")
        update_values.append(Judul)
    if Deskripsi is not None:
        update_set.append("Deskripsi = %s")
        update_values.append(Deskripsi)
    if Gambar and Gambar.filename != '':
        # Jika Gambar disertakan, simpan gambar dan tambahkan ke query
        Gambar_path = os.path.join(UPLOAD_FOLDER, Gambar.filename)
        Gambar.save(Gambar_path)
        update_set.append("Gambar = %s")
        update_values.append(Gambar_path)

    # Jika tidak ada data yang diberikan untuk diupdate, return error
    if not update_set:
        return jsonify({"err_message": "No valid fields to update"}), 400

    # Menambahkan Id_Blog di akhir update_values untuk query
    update_values.append(Id_Blog)

    # Menyusun query update dinamis
    update_query = f"""
        UPDATE blog
        SET {', '.join(update_set)}
        WHERE Id_Blog = %s
    """

    # Menjalankan query
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(update_query, tuple(update_values))
    connection.commit()
    rows_affected = cursor.rowcount  # Mengecek apakah ada baris yang diubah
    cursor.close()
    connection.close()

    # Jika tidak ada baris yang terpengaruh, berarti tidak ada yang berubah
    if rows_affected == 0:
        return jsonify({"err_message": "Data not found or no changes made", "Id_Blog": Id_Blog}), 404

    return jsonify({"message": "Updated", "Id_Blog": Id_Blog}), 200



@blog_endpoints.route('/delete/<Id_Blog>', methods=['DELETE'])
def delete(Id_Blog):
    """Routes for module to delete a blog"""
    connection = get_connection()
    cursor = connection.cursor()

    delete_query = "DELETE FROM blog WHERE Id_Blog = %s"
    delete_id = (Id_Blog,)
    cursor.execute(delete_query, delete_id)
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({"message": "Data deleted", "Id_Blog": Id_Blog})


@blog_endpoints.route("/upload", methods=["POST"])
def upload():
    """Routes for upload file"""
    uploaded_file = request.files.get('file', None)
    if uploaded_file and uploaded_file.filename != '':
        file_path = os.path.join(UPLOAD_FOLDER, uploaded_file.filename)
        uploaded_file.save(file_path)
        return jsonify({"message": "ok", "data": "uploaded", "file_path": file_path}), 200
    return jsonify({"err_message": "Cannot upload file"}), 400

@blog_endpoints.route('/count', methods=['GET'])
def count_blogs():
    """Route to count the number of blogs in the table"""
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)
    count_query = "SELECT COUNT(*) AS total_blogs FROM blog"
    cursor.execute(count_query)
    result = cursor.fetchone()
    cursor.close()
    connection.close()
    return jsonify({"message": "OK", "total_blogs": result['total_blogs']}), 200
