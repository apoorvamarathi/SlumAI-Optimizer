from pathlib import Path
from dotenv import load_dotenv

# Load .env from the backend/ folder regardless of where uvicorn is launched from
load_dotenv(Path(__file__).resolve().parent.parent / ".env")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.database import engine, Base
from app.models import database_models

from app.routes import zones
from app.routes import predictions
from app.routes import recommendation
from app.routes import risk
from app.routes import optimization
from app.routes import auth
from app.routes import alerts
from app.routes import reports
from app.routes import agent
from app.routes import admin
from app.routes import complaints

app = FastAPI(
    title="Urban Water & Risk Management API",
    description=(
        "Backend API for water demand prediction, "
        "risk analysis and resource optimization"
    ),
    version="1.0.0"
)


# Create missing tables
Base.metadata.create_all(
    bind=engine
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# ROUTES
# =========================================================

app.include_router(zones.router)
app.include_router(predictions.router)
app.include_router(risk.router)
app.include_router(optimization.router)
app.include_router(recommendation.router)
app.include_router(auth.router)
app.include_router(alerts.router)
app.include_router(reports.router)
app.include_router(agent.router)
app.include_router(admin.router)
app.include_router(complaints.router)

# =========================================================
# ROOT
# =========================================================

@app.get("/")
def root():

    return {
        "message": "Urban Water & Risk Management API is running"
    }


# =========================================================
# HEALTH
# =========================================================

@app.get("/health")
def health_check():

    try:

        with engine.connect() as connection:

            connection.execute(
                text("SELECT 1")
            )

        return {
            "status": "healthy",
            "database": "connected"
        }

    except Exception as e:

        return {
            "status": "unhealthy",
            "database": "connection failed",
            "error": str(e)
        }


# http://127.0.0.1:8000/health