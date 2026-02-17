import joblib

# Load model sekali saja
knn_model = joblib.load("model/knn_model_balita.joblib")

label_mapping = {
    0: "normal",
    1: "severely stunted",
    2: "stunted",
    3: "tinggi"
}

def predict_knn(age, gender, height):
    prediction = knn_model.predict([[age, gender, height]])
    return label_mapping.get(prediction[0], "unknown")
