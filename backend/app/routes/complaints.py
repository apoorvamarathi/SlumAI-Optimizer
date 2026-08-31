from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.security import get_current_user

from app.schemas.complaint import (
    ComplaintCreate
)

from app.services.complaint_service import (
    create_report,
    get_all_reports,
    get_user_reports
)


router = APIRouter(
    prefix="/complaints",
    tags=["Community Reports"]
)


# =========================================================
# CREATE COMPLAINT
# =========================================================

@router.post("/")
def create_complaint(
    report: ComplaintCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    result = create_report(
        db=db,
        report_data=report,
        user_id=current_user.id
    )

    return {
        "message": "Report submitted successfully",
        "report_id": result.id,
        "status": result.status
    }


# =========================================================
# GET MY COMPLAINTS
# =========================================================

@router.get("/my")
def get_my_complaints(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    reports = get_user_reports(
        db=db,
        user_id=current_user.id
    )

    return {
        "count": len(reports),
        "data": reports
    }


# =========================================================
# GET ALL COMPLAINTS
# =========================================================

@router.get("/")
def get_complaints(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    reports = get_all_reports(db)

    return {
        "count": len(reports),
        "data": reports
    }