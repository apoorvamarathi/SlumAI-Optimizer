from fastapi import APIRouter, Depends

from app.security import require_role


router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


@router.get("/test")
def admin_test(
    current_user=Depends(
        require_role("admin")
    )
):

    return {
        "message": "Admin access granted",
        "username": current_user.username,
        "role": current_user.role
    }