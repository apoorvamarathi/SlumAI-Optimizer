

# from fastapi import APIRouter, HTTPException, Depends

# from app.security import get_current_user

# from app.services.optimization_service import (
#     get_all_optimizations,
#     get_zone_optimization
# )


# router = APIRouter(
#     prefix="/optimization",
#     tags=["Optimization"]
# )


# # =========================================================
# # GET ALL OPTIMIZATION RESULTS
# # =========================================================

# @router.get("/")
# def get_optimization(
#     current_user=Depends(get_current_user)
# ):

#     data = get_all_optimizations()

#     return {
#         "count": len(data),
#         "data": data
#     }


# # =========================================================
# # GET OPTIMIZATION FOR ONE ZONE
# # =========================================================

# @router.get("/{zone_id}")
# def get_zone_optimization_api(
#     zone_id: str,
#     current_user=Depends(get_current_user)
# ):

#     result = get_zone_optimization(
#         zone_id
#     )

#     if result is None:

#         raise HTTPException(
#             status_code=404,
#             detail="Zone optimization data not found"
#         )

#     return result


from fastapi import APIRouter, HTTPException, Depends

from app.security import require_role

from app.services.optimization_service import (
    get_all_optimizations,
    get_zone_optimization
)


router = APIRouter(
    prefix="/optimization",
    tags=["Optimization"]
)


# =========================================================
# GET ALL OPTIMIZATION RESULTS
# Admin + Field Officer only
# =========================================================

@router.get("/")
def get_optimization(
    current_user=Depends(
        require_role(
            "admin",
            "field_officer"
        )
    )
):

    data = get_all_optimizations()

    return {
        "count": len(data),
        "data": data
    }


# =========================================================
# GET OPTIMIZATION FOR ONE ZONE
# Admin + Field Officer only
# =========================================================

@router.get("/{zone_id}")
def get_zone_optimization_api(
    zone_id: str,
    current_user=Depends(
        require_role(
            "admin",
            "field_officer"
        )
    )
):

    result = get_zone_optimization(
        zone_id
    )

    if result is None:

        raise HTTPException(
            status_code=404,
            detail="Zone optimization data not found"
        )

    return result