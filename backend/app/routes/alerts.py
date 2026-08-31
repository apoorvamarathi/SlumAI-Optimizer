from fastapi import APIRouter, Depends

from app.security import get_current_user

from app.services.alert_service import (
    get_all_alerts,
    get_high_risk_alerts
)


router = APIRouter(
    prefix="/alerts",
    tags=["Risk Alerts"]
)


# =========================================================
# ALL RISK ALERTS
# =========================================================

@router.get("/")
def get_alerts(
    current_user=Depends(get_current_user)
):

    data = get_all_alerts()

    return {
        "count": len(data),
        "alerts": data
    }


# =========================================================
# HIGH-RISK ALERTS ONLY
# =========================================================

@router.get("/high-risk")
def get_high_risk(
    current_user=Depends(get_current_user)
):

    data = get_high_risk_alerts()

    return {
        "count": len(data),
        "alerts": data
    }