import pandas as pd
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[3]

CSV_PATH = (
    PROJECT_ROOT
    / "m1"
    / "optimization"
    / "resource_recommendations.csv"
)


def load_recommendation_data():

    if not CSV_PATH.exists():
        raise FileNotFoundError(
            f"Recommendation file not found: {CSV_PATH}"
        )

    return pd.read_csv(CSV_PATH)


def get_all_recommendations():

    df = load_recommendation_data()

    return df.to_dict(
        orient="records"
    )


def get_zone_recommendation(zone_id: str):

    df = load_recommendation_data()

    result = df[
        df["zone_id"].astype(str) == str(zone_id)
    ]

    if result.empty:
        return None

    return result.iloc[0].to_dict()