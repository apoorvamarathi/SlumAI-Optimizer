from math import radians, sin, cos, sqrt, atan2

from sqlalchemy.orm import Session

from app.models.database_models import (
    CommunityReport,
    ZoneMaster
)


def calculate_distance(
    lat1: float,
    lon1: float,
    lat2: float,
    lon2: float
):
    """
    Calculate approximate distance between
    two latitude/longitude points in kilometers.
    """

    earth_radius = 6371.0

    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)

    a = (
        sin(dlat / 2) ** 2
        +
        cos(radians(lat1))
        * cos(radians(lat2))
        * sin(dlon / 2) ** 2
    )

    c = 2 * atan2(
        sqrt(a),
        sqrt(1 - a)
    )

    return earth_radius * c


def find_nearest_zone(
    db: Session,
    latitude: float,
    longitude: float
):

    zones = (
        db.query(ZoneMaster)
        .filter(
            ZoneMaster.latitude.isnot(None),
            ZoneMaster.longitude.isnot(None)
        )
        .all()
    )

    if not zones:
        return None

    nearest_zone = None
    minimum_distance = float("inf")

    for zone in zones:

        distance = calculate_distance(
            latitude,
            longitude,
            zone.latitude,
            zone.longitude
        )

        if distance < minimum_distance:

            minimum_distance = distance
            nearest_zone = zone

    return nearest_zone


def create_report(
    db: Session,
    report_data,
    user_id: int
):

    nearest_zone = find_nearest_zone(
        db,
        report_data.latitude,
        report_data.longitude
    )

    zone_id = None

    if nearest_zone:
        zone_id = nearest_zone.zone_id


    report = CommunityReport(

        report_type=report_data.report_type,

        issue_type=report_data.issue_type,

        description=report_data.description,

        zone_id=zone_id,

        latitude=report_data.latitude,

        longitude=report_data.longitude,

        severity=report_data.severity,

        status="Pending",

        reported_by=user_id
    )


    db.add(report)

    db.commit()

    db.refresh(report)

    return report


def get_all_reports(
    db: Session
):

    return (
        db.query(CommunityReport)
        .order_by(
            CommunityReport.reported_at.desc()
        )
        .all()
    )


def get_user_reports(
    db: Session,
    user_id: int
):

    return (
        db.query(CommunityReport)
        .filter(
            CommunityReport.reported_by == user_id
        )
        .order_by(
            CommunityReport.reported_at.desc()
        )
        .all()
    )
