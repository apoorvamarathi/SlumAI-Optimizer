# from fastapi import APIRouter

# from app.schemas.prediction import WaterDemandRequest
# from app.services.ml_service import predict_water_demand


# router = APIRouter(
#     prefix="/predictions",
#     tags=["Predictions"]
# )


# @router.post("/water-demand")
# def predict_water(
#     request: WaterDemandRequest
# ):

#     data = request.model_dump()

#     prediction = predict_water_demand(data)

#     return {
#         "predicted_water_demand_liters": prediction
#     }


from fastapi import APIRouter, Depends

from app.schemas.prediction import WaterDemandRequest
from app.services.ml_service import predict_water_demand

from app.security import get_current_user


router = APIRouter(
    prefix="/predictions",
    tags=["Predictions"]
)


@router.post("/water-demand")
def predict_water(
    request: WaterDemandRequest,
    current_user=Depends(get_current_user)
):

    data = request.model_dump()

    prediction = predict_water_demand(data)

    return {
        "predicted_water_demand_liters": prediction
    }

# Admin          ✅
# Field Officer  ✅
# Viewer         ✅