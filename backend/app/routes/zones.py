

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.database_models import ZoneMaster
from app.schemas.zone import ZoneResponse
from app.security import get_current_user


router = APIRouter(
    prefix="/zones",
    tags=["Zones"]
)


# =========================================================
# GET ALL ZONES
# =========================================================

@router.get("/", response_model=list[ZoneResponse])
def get_zones(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    zones = db.query(ZoneMaster).all()

    return zones


# =========================================================
# GET ONE ZONE
# =========================================================

@router.get("/{zone_id}", response_model=ZoneResponse)
def get_zone(
    zone_id: str,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    zone = (
        db.query(ZoneMaster)
        .filter(ZoneMaster.zone_id == zone_id)
        .first()
    )

    if not zone:

        raise HTTPException(
            status_code=404,
            detail="Zone not found"
        )

    return zone