import pandas as pd
from pathlib import Path


# SlumAI-Optimizer/
# ├── m1/
# │   └── optimization/
# │       └── resource_recommendations.csv
# └── backend/
#     └── app/
#         └── services/
#             └── optimization_service.py

PROJECT_ROOT = Path(__file__).resolve().parents[3]

CSV_PATH = (
    PROJECT_ROOT
    / "m1"
    / "optimization"
    / "resource_recommendations.csv"
)


def load_optimization_data():

    if not CSV_PATH.exists():
        raise FileNotFoundError(
            f"Optimization file not found: {CSV_PATH}"
        )

    return pd.read_csv(CSV_PATH)


def get_all_optimizations():

    df = load_optimization_data()

    return df.to_dict(
        orient="records"
    )


def get_zone_optimization(zone_id: str):

    df = load_optimization_data()

    result = df[
        df["zone_id"].astype(str) == str(zone_id)
    ]

    if result.empty:
        return None

    return result.iloc[0].to_dict()

    