import pandas as pd
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[3]

CSV_PATH = (
    PROJECT_ROOT
    / "m1"
    / "optimization"
    / "resource_recommendations.csv"
)


def load_alert_data():

    if not CSV_PATH.exists():
        raise FileNotFoundError(
            f"Optimization file not found: {CSV_PATH}"
        )

    return pd.read_csv(CSV_PATH)


def get_all_alerts():

    df = load_alert_data()

    alerts = []

    for _, row in df.iterrows():

        score = float(row["risk_score"])

        # Risk classification
        if score > 62:

            risk_level = "High"

            message = (
                "High risk detected. "
                "Immediate attention required."
            )

        elif score >= 58:

            risk_level = "Medium"

            message = (
                "Medium risk detected. "
                "Monitor this zone closely."
            )

        else:

            risk_level = "Low"

            message = (
                "Low risk. "
                "Continue normal monitoring."
            )

        alerts.append({
            "zone_id": str(row["zone_id"]),
            "zone_name": str(row["zone_name"]),
            "risk_score": score,
            "risk_level": risk_level,
            "alert": message
        })

    return alerts


def get_high_risk_alerts():

    alerts = get_all_alerts()

    return [
        alert
        for alert in alerts
        if alert["risk_level"] == "High"
    ]