

from fastapi import APIRouter, HTTPException, Depends

from app.security import get_current_user

from app.services.recommendation_service import (
    get_all_recommendations,
    get_zone_recommendation
)


router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)


@router.get("/")
def get_recommendations(
    current_user=Depends(get_current_user)
):

    data = get_all_recommendations()

    return {
        "count": len(data),
        "data": data
    }


@router.get("/{zone_id}")
def get_zone_recommendation_api(
    zone_id: str,
    current_user=Depends(get_current_user)
):

    result = get_zone_recommendation(zone_id)

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Recommendation not found for this zone"
        )

    return result
