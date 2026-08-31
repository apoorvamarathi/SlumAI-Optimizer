import joblib
from pathlib import Path
import pandas as pd


# Project root:
# C:\Users\Admin\SlumAI-Optimizer

PROJECT_ROOT = Path(__file__).resolve().parents[3]

MODEL_PATH = PROJECT_ROOT / "models" / "risk_model.pkl"


# Load saved risk model
risk_model = joblib.load(MODEL_PATH)


def predict_risk(data: dict):

    # Convert input dictionary to DataFrame
    input_data = pd.DataFrame([data])

    # Predict risk category
    prediction = risk_model.predict(input_data)

    return str(prediction[0])

    