import joblib
from pathlib import Path
import pandas as pd


PROJECT_ROOT = Path(__file__).resolve().parents[3]

MODEL_PATH = (
    PROJECT_ROOT
    / "models"
    / "water_demand_model.pkl"
)


# Load trained pipeline
water_demand_model = joblib.load(MODEL_PATH)


def predict_water_demand(data: dict):

    # Convert request data into DataFrame
    input_data = pd.DataFrame([data])

    # Model pipeline automatically performs:
    # categorical encoding + prediction
    prediction = water_demand_model.predict(input_data)

    return float(prediction[0])