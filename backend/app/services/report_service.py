from pathlib import Path

import pandas as pd

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)

def generate_pdf_report():

    df = load_report_data()

    output_path = (
        REPORT_DIR
        / "urban_water_risk_report.pdf"
    )

    document = SimpleDocTemplate(
        str(output_path),
        pagesize=A4
    )

    styles = getSampleStyleSheet()

    story = []


    story.append(
        Paragraph(
            "Urban Water & Risk Management Report",
            styles["Title"]
        )
    )

    story.append(
        Spacer(1, 15)
    )


    story.append(
        Paragraph(
            f"Total Zones: {len(df)}",
            styles["Normal"]
        )
    )


    story.append(
        Paragraph(
            "Total Predicted Water Demand: "
            f"{df['predicted_water_demand'].sum():,.2f} L",
            styles["Normal"]
        )
    )


    story.append(
        Paragraph(
            "Total Optimized Allocation: "
            f"{df['optimized_allocation'].sum():,.2f} L",
            styles["Normal"]
        )
    )


    story.append(
        Paragraph(
            "Total Unmet Demand: "
            f"{df['unmet_demand'].sum():,.2f} L",
            styles["Normal"]
        )
    )


    story.append(
        Spacer(1, 20)
    )


    table_data = [
        [
            "Zone",
            "Risk",
            "Priority",
            "Allocation %",
            "Unmet Demand"
        ]
    ]


    for _, row in df.iterrows():

        table_data.append(
            [
                str(row["zone_id"]),

                f"{float(row['risk_score']):.2f}",

                str(row["priority_level"]),

                f"{float(row['allocation_percentage']):.2f}%",

                f"{float(row['unmet_demand']):,.2f} L"
            ]
        )


    table = Table(
        table_data,
        repeatRows=1
    )


    table.setStyle(
        TableStyle([
            (
                "BACKGROUND",
                (0, 0),
                (-1, 0),
                colors.grey
            ),

            (
                "TEXTCOLOR",
                (0, 0),
                (-1, 0),
                colors.white
            ),

            (
                "GRID",
                (0, 0),
                (-1, -1),
                0.5,
                colors.grey
            ),

            (
                "VALIGN",
                (0, 0),
                (-1, -1),
                "TOP"
            )
        ])
    )


    story.append(table)

    document.build(story)

    return output_path

PROJECT_ROOT = Path(__file__).resolve().parents[3]

CSV_PATH = (
    PROJECT_ROOT
    / "m1"
    / "optimization"
    / "resource_recommendations.csv"
)

REPORT_DIR = (
    PROJECT_ROOT
    / "reports"
)

REPORT_DIR.mkdir(
    parents=True,
    exist_ok=True
)


def load_report_data():

    if not CSV_PATH.exists():
        raise FileNotFoundError(
            f"Recommendation file not found: {CSV_PATH}"
        )

    return pd.read_csv(CSV_PATH)

def generate_excel_report():

    df = load_report_data()

    output_path = (
        REPORT_DIR
        / "resource_optimization_report.xlsx"
    )

    with pd.ExcelWriter(
        output_path,
        engine="openpyxl"
    ) as writer:

        df.to_excel(
            writer,
            sheet_name="Recommendations",
            index=False
        )

        summary = pd.DataFrame({
            "Metric": [
                "Total Zones",
                "Total Predicted Demand",
                "Total Optimized Allocation",
                "Total Unmet Demand",
                "Average Allocation %",
                "Critical Priority Zones"
            ],

            "Value": [
                len(df),

                df["predicted_water_demand"].sum(),

                df["optimized_allocation"].sum(),

                df["unmet_demand"].sum(),

                df["allocation_percentage"].mean(),

                (
                    df["priority_level"]
                    .astype(str)
                    .str.lower()
                    .eq("critical")
                    .sum()
                )
            ]
        })

        summary.to_excel(
            writer,
            sheet_name="Summary",
            index=False
        )

    return output_path