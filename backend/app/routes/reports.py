from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse

from app.security import get_current_user

from app.services.report_service import (
    generate_excel_report,
    generate_pdf_report
)


router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.get("/excel")
def download_excel_report(
    current_user=Depends(get_current_user)
):

    output_path = generate_excel_report()

    return FileResponse(
        path=str(output_path),
        filename="resource_optimization_report.xlsx",
        media_type=(
            "application/vnd.openxmlformats-officedocument"
            ".spreadsheetml.sheet"
        )
    )


@router.get("/pdf")
def download_pdf_report(
    current_user=Depends(get_current_user)
):

    output_path = generate_pdf_report()

    return FileResponse(
        path=str(output_path),
        filename="urban_water_risk_report.pdf",
        media_type="application/pdf"
    )