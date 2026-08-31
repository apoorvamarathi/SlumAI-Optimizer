from sqlalchemy import Column, String, Float, Integer, Date,DateTime,Text
from app.database import Base
from sqlalchemy.sql import func

# =========================================================
# ZONE MASTER TABLE
# =========================================================

class ZoneMaster(Base):

    __tablename__ = "zone_master"

    zone_id = Column(
        String,
        primary_key=True
    )

    zone_name = Column(String)

    city = Column(String)

    region = Column(String)

    notified_status = Column(String)

    population_estimate = Column(Integer)

    area_sq_km = Column(Float)

    population_density_per_km2 = Column(Float)

    public_toilets_count = Column(Integer)

    people_per_toilet = Column(Float)

    toilets_lacking_water_pct = Column(Float)

    nearest_health_center_km = Column(Float)

    data_source_note = Column(String)

       # =====================================================
        # MAP COORDINATES
        # =====================================================
    
    latitude = Column(Float)
    
    longitude = Column(Float)


# =========================================================
# FEATURE ENGINEERED DATA TABLE
# =========================================================

class FeatureEngineeredData(Base):

    __tablename__ = "feature_engineered_data"

    id = Column(
        Integer,
        primary_key=True
    )

    date = Column(Date)

    zone_id = Column(String)

    zone_name = Column(String)

    rainfall_mm = Column(Float)

    water_supply_hours = Column(Float)

    water_demand_liters = Column(Float)

    waste_generated_kg = Column(Float)

    health_cases_reported = Column(Integer)

    risk_score = Column(Float)

    water_demand_per_capita = Column(Float)

    waste_per_capita = Column(Float)

    health_cases_per_1000 = Column(Float)

    calculated_people_per_toilet = Column(Float)

    toilet_water_shortage_pct = Column(Float)

   


# =========================================================
# USERS TABLE
# Used for authentication
# =========================================================

# class User(Base):

#     __tablename__ = "users"

#     id = Column(
#         Integer,
#         primary_key=True,
#         index=True
#     )

#     username = Column(
#         String,
#         unique=True,
#         nullable=False,
#         index=True
#     )

#     email = Column(
#         String,
#         unique=True,
#         nullable=False,
#         index=True
#     )

#     hashed_password = Column(
#         String,
#         nullable=False
#     )


# =========================================================
# USERS TABLE
# Used for authentication and role-based access
# =========================================================

class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String,
        unique=True,
        nullable=False,
        index=True
    )

    email = Column(
        String,
        unique=True,
        nullable=False,
        index=True
    )

    hashed_password = Column(
        String,
        nullable=False
    )

    role = Column(
        String,
        nullable=False,
        default="viewer"
    )

# ------------------------------------------
#-------------------------------------------

class CommunityReport(Base):

    __tablename__ = "community_reports"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    report_type = Column(
        String,
        nullable=False
    )

    issue_type = Column(
        String,
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    zone_id = Column(
        String,
        nullable=True
    )

    latitude = Column(
        Float,
        nullable=False
    )

    longitude = Column(
        Float,
        nullable=False
    )

    severity = Column(
        String,
        default="Medium",
        nullable=False
    )

    status = Column(
        String,
        default="Pending",
        nullable=False
    )

    reported_by = Column(
        Integer,
        nullable=True
    )

    reported_at = Column(
        DateTime,
        server_default=func.now()
    )

    assigned_to = Column(
        Integer,
        nullable=True
    )

    resolved_at = Column(
        DateTime,
        nullable=True
    )

    resolution_note = Column(
        Text,
        nullable=True
    )