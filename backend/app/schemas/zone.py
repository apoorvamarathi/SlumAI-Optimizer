# from pydantic import BaseModel


# class ZoneResponse(BaseModel):

#     zone_id: str
#     zone_name: str
#     city: str | None = None
#     region: str | None = None
#     population_estimate: int | None = None

#     class Config:
#         from_attributes = True


from pydantic import BaseModel
from typing import Optional


class ZoneResponse(BaseModel):

    zone_id: str
    zone_name: str
    city: Optional[str] = None
    region: Optional[str] = None
    population_estimate: Optional[int] = None

    latitude: Optional[float] = None
    longitude: Optional[float] = None

    class Config:
        from_attributes = True