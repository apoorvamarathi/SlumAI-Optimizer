# Urban Water & Risk Management Backend

## Technology

- FastAPI
- PostgreSQL
- SQLAlchemy
- Python
- Scikit-learn
- JWT Authentication

## APIs

### Authentication

- POST /auth/register
- POST /auth/login
- GET /auth/me

### Zones

- GET /zones/
- GET /zones/{zone_id}

### Prediction

- POST /predictions/water-demand
- POST /risk/predict

### Optimization

- GET /optimization/
- GET /optimization/{zone_id}

### Recommendations

- GET /recommendations/
- GET /recommendations/{zone_id}

### Risk Alerts

- GET /alerts/
- GET /alerts/high-risk

## Run

```bash
uvicorn app.main:app --reload