from pydantic import BaseModel
from typing import Optional


class ComplaintCreate(BaseModel):

    report_type: str
    issue_type: str

    description: Optional[str] = None

    latitude: float
    longitude: float

    severity: str = "Medium"


class ComplaintResponse(BaseModel):

    id: int

    report_type: str
    issue_type: str

    description: Optional[str] = None

    zone_id: Optional[str] = None

    latitude: float
    longitude: float

    severity: str
    status: str

    reported_by: Optional[int] = None

    class Config:
        from_attributes = True