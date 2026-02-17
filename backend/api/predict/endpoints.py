from flask import Blueprint, request, jsonify
import joblib
import numpy as np

predict_endpoints = Blueprint("predict_endpoints", __name__)

model = joblib.load("model/knn_model_balita.joblib")

label_mapping = {
    0: "normal",
    1: "severely stunted",
    2: "stunted",
    3: "tinggi"
}

@predict_endpoints.route("/predict", methods=["POST", "OPTIONS"])
def predict():

    # ✅ Jika request OPTIONS, langsung balas OK
    if request.method == "OPTIONS":
        return jsonify({"message": "Preflight OK"}), 200

    # POST request baru diproses di sini
    try:
        data = request.get_json()

        age = int(data.get("age", 0))
        gender = int(data.get("gender", 0))
        height = float(data.get("height", 0))

        if age <= 0 or height <= 0:
            return jsonify({"error": "Input tidak valid"}), 400

        input_data = np.array([[age, gender, height]])
        prediction = model.predict(input_data)

        result = label_mapping.get(prediction[0], "Unknown")

        return jsonify({"prediction": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
