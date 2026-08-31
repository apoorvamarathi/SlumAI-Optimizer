from pydantic import BaseModel


class RiskPredictionRequest(BaseModel):

    rainfall_mm: float
    water_supply_hours: float

    water_demand_per_capita: float

    waste_per_capita: float
    health_cases_per_1000: float

    population_density_per_km2: float
    people_per_toilet: float

    toilet_water_shortage_pct: float
    nearest_health_center_km: float