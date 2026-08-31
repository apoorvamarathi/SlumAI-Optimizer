# from fastapi import APIRouter

# from app.schemas.risk import RiskPredictionRequest
# from app.services.risk_service import predict_risk


# router = APIRouter(
#     prefix="/risk",
#     tags=["Risk Prediction"]
# )


# @router.post("/predict")
# def predict_risk_api(
#     request: RiskPredictionRequest
# ):

#     data = request.model_dump()

#     prediction = predict_risk(data)

#     return {
#         "predicted_risk": prediction
#     }


from fastapi import APIRouter, Depends

from app.schemas.risk import RiskPredictionRequest
from app.services.risk_service import predict_risk

from app.security import get_current_user


router = APIRouter(
    prefix="/risk",
    tags=["Risk Prediction"]
)


@router.post("/predict")
def predict_risk_api(
    request: RiskPredictionRequest,
    current_user=Depends(get_current_user)
):

    data = request.model_dump()

    prediction = predict_risk(data)

    return {
        "predicted_risk": prediction
    }


# Admin          ✅
# Field Officer  ✅
# Viewer         ✅

