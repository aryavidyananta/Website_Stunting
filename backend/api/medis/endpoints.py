import os
from flask import Blueprint, jsonify, request
from helper.db_helper import get_connection
from helper.form_validation import get_form_data

medis_endpoints = Blueprint('medis', __name__)
UPLOAD_FOLDER = "img"
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}  # Add your allowed extensions
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16MB file size limit

def allowed_file(filename):
    """Check if file extension is allowed."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@medis_endpoints.route('/read', methods=['GET'])
def read():
    """Routes for module get list medis"""
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)
    select_query = "SELECT * FROM medis"
    cursor.execute(select_query)
    results = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify({"message": "OK", "datas": results}), 200

@medis_endpoints.route('/read/<int:Id_Medis>', methods=['GET'])
def read_by_id(Id_Medis):
    """Routes for module get medis by Id_Medis"""
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)
    select_query = "SELECT * FROM medis WHERE Id_Medis = %s"
    cursor.execute(select_query, (Id_Medis,))
    result = cursor.fetchone()
    cursor.close()
    connection.close()

    if result:
        return jsonify({"message": "OK", "data": result}), 200
    return jsonify({"message": "Data not found", "Id_Medis": Id_Medis}), 404

@medis_endpoints.route('/create', methods=['POST'])
def create():
    """Routes for module create a medis"""
    required = get_form_data(["Nama", "Kategori"])  # Ensure required fields
    if not required.get("Nama") or not required.get("Kategori"):
        return jsonify({"err_message": "Nama and Kategori are required"}), 400

    Nama = required["Nama"]
    Kategori = required["Kategori"]
    Deskripsi = request.form.get('Deskripsi', "")
    Tlp = request.form.get('Tlp', None)
    Email = request.form.get('Email', "")
    Gambar = request.files.get('Gambar', None)  # Get the file from the request

    # Handle Gambar file upload
    Gambar_path = None
    if Gambar:
        if Gambar.filename == '' or not allowed_file(Gambar.filename):
            return jsonify({"err_message": "Invalid file format"}), 400
        if len(Gambar.read()) > MAX_FILE_SIZE:
            return jsonify({"err_message": "File is too large"}), 400
        Gambar.seek(0)  # Reset the file pointer after checking size
        Gambar_path = os.path.join(UPLOAD_FOLDER, Gambar.filename)
        Gambar.save(Gambar_path)

    connection = get_connection()
    cursor = connection.cursor()
    insert_query = """
        INSERT INTO medis (Nama, Kategori, Deskripsi, Tlp, Email, Gambar) 
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    request_insert = (Nama, Kategori, Deskripsi, Tlp, Email, Gambar_path)
    cursor.execute(insert_query, request_insert)
    connection.commit()
    new_id = cursor.lastrowid
    cursor.close()
    connection.close()

    if new_id:
        return jsonify({"Nama": Nama, "message": "Inserted", "Id_Medis": new_id, "Gambar": Gambar_path}), 201
    return jsonify({"message": "Cannot Insert Data"}), 500

@medis_endpoints.route('/update/<int:Id_Medis>', methods=['PUT'])
def update(Id_Medis):
    """Routes for module update a medis"""
    
    # Mengambil data yang dikirimkan dalam form
    Nama = request.form.get("Nama", None)
    Kategori = request.form.get("Kategori", None)
    Deskripsi = request.form.get('Deskripsi', None)
    Tlp = request.form.get('Tlp', None)
    Email = request.form.get('Email', None)
    Gambar = request.files.get('Gambar', None)

    # Menyiapkan variabel untuk query
    update_values = []
    update_set = []

    # Hanya memperbarui field yang diberikan
    if Nama:
        update_set.append("Nama = %s")
        update_values.append(Nama)
    if Kategori:
        update_set.append("Kategori = %s")
        update_values.append(Kategori)
    if Deskripsi is not None:
        update_set.append("Deskripsi = %s")
        update_values.append(Deskripsi)
    if Tlp is not None:
        update_set.append("Tlp = %s")
        update_values.append(Tlp)
    if Email is not None:
        update_set.append("Email = %s")
        update_values.append(Email)
    if Gambar and Gambar.filename != '':
        # Jika Gambar disertakan, simpan gambar dan tambahkan ke query
        Gambar_path = os.path.join(UPLOAD_FOLDER, Gambar.filename)
        Gambar.save(Gambar_path)
        update_set.append("Gambar = %s")
        update_values.append(Gambar_path)

    # Jika tidak ada data yang diberikan untuk diupdate, return error
    if not update_set:
        return jsonify({"err_message": "No valid fields to update"}), 400

    # Menambahkan Id_Medis di akhir update_values untuk query
    update_values.append(Id_Medis)

    # Menyusun query update dinamis
    update_query = f"""
        UPDATE medis
        SET {', '.join(update_set)}
        WHERE Id_Medis = %s
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
        return jsonify({"err_message": "Data not found or no changes made", "Id_Medis": Id_Medis}), 404

    return jsonify({"message": "Updated", "Id_Medis": Id_Medis}), 200

@medis_endpoints.route('/delete/<int:Id_Medis>', methods=['DELETE'])
def delete(Id_Medis):
    """Routes for module to delete a medis"""
    connection = get_connection()
    cursor = connection.cursor()
    delete_query = "DELETE FROM medis WHERE Id_Medis = %s"
    cursor.execute(delete_query, (Id_Medis,))
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({"message": "Data deleted", "Id_Medis": Id_Medis}), 200

@medis_endpoints.route("/upload", methods=["POST"])
def upload():
    """Routes for upload file with Id_Medis"""
    # Ambil ID Medis dari form-data
    Id_Medis = request.form.get('Id_Medis', None)
    if not Id_Medis:
        return jsonify({"err_message": "Id_Medis is required"}), 400

    # Ambil file dari form-data
    uploaded_file = request.files.get('file', None)
    if not uploaded_file or uploaded_file.filename == '':
        return jsonify({"err_message": "File is required"}), 400

    # Validasi file
    if not allowed_file(uploaded_file.filename):
        return jsonify({"err_message": "Invalid file format"}), 400
    if len(uploaded_file.read()) > MAX_FILE_SIZE:
        return jsonify({"err_message": "File is too large"}), 400
    uploaded_file.seek(0)  # Reset file pointer after checking size

    # Tentukan path file dan simpan file
    file_path = os.path.join(UPLOAD_FOLDER, uploaded_file.filename)
    uploaded_file.save(file_path)

    # Simpan informasi file ke database dengan ID Medis yang terkait
    connection = get_connection()
    cursor = connection.cursor()
    update_query = """
        UPDATE medis
        SET Gambar = %s
        WHERE Id_Medis = %s
    """
    cursor.execute(update_query, (file_path, Id_Medis))
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({"message": "File uploaded and associated with Id_Medis", "file_path": file_path, "Id_Medis": Id_Medis}), 200

@medis_endpoints.route('/count', methods=['GET'])
def count_mediss():
    """Route to count the number of mediss in the table"""
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)
    count_query = "SELECT COUNT(*) AS total_mediss FROM medis"
    cursor.execute(count_query)
    result = cursor.fetchone()
    cursor.close()
    connection.close()
    return jsonify({"message": "OK", "total_mediss": result['total_mediss']}), 200


