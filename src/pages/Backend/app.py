from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Mengaktifkan CORS untuk mengizinkan permintaan dari frontend

# Memuat model KNN yang telah dilatih
model = joblib.load('model/knn_model_balita.joblib')  # Pastikan path sesuai

# Label encoding dari model
label_mapping = {0: "normal", 1: "severely stunted", 2: "stunted", 3: "Tinggi"}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Ambil data dari JSON yang dikirim frontend
        data = request.get_json()

        # Validasi dan parsing input
        age = int(data.get('age', 0))
        gender = int(data.get('gender'))  # Mendapatkan nilai gender langsung sebagai angka (0 atau 1)
        height = float(data.get('height', 0))

        # Validasi input nilai height dan age
        if height <= 0 or age <= 0:
            return jsonify({'error': 'Input tidak valid. Pastikan umur dan tinggi lebih besar dari 0.'})

        # Buat input array untuk prediksi (mengikuti urutan Age, Gender, Height)
        input_data = np.array([[age, gender, height]])

        # Lakukan prediksi menggunakan model KNN
        prediction = model.predict(input_data)

        # Debugging: mencetak hasil prediksi mentah
        print(f"Raw prediction: {prediction}")

        # Konversi prediksi ke label yang dapat dipahami
        result = label_mapping.get(prediction[0], "Unknown")

        # Mengembalikan hasil dalam format JSON
        return jsonify({'prediction': result})

    except Exception as e:
        return jsonify({'error': f"Error: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True)
