from pydantic import BaseModel


class RiskAlert(BaseModel):
    zone_id: str
    zone_name: str
    risk_score: float
    risk_level: str
    alert: str