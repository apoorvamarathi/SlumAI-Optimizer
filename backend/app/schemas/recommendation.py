from pydantic import BaseModel


class RecommendationResponse(BaseModel):
    zone_id: str
    zone_name: str

    predicted_water_demand: float
    risk_score: float

    priority_score: float
    priority_level: str

    optimized_allocation: float
    unmet_demand: float
    allocation_percentage: float

    recommendation: str