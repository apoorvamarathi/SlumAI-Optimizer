# SlumAI Optimizer: Urban Water & Risk Management Platform

An AI-powered, full-stack decision-support system designed to forecast water demand, evaluate infrastructure and health risks, optimize resource distribution, and collect community incident reports across urban settlements and informal slum areas.

---

## 📌 Project Overview

Urban slums and informal settlements face acute challenges in water access, contamination risks, and sanitation issues. **SlumAI Optimizer** addresses these challenges by combining machine learning models, linear resource optimization, real-time spatial mapping, and community participation into a unified management portal.

### Key Capabilities
- **Demand Forecasting**: Machine learning models predict future water requirements per zone based on population, temperature, and historical trends.
- **Risk Assessment**: Classifies risk levels (High, Medium, Low) based on water deficit, population density, complaint counts, and waste proximity.
- **Resource Allocation & Optimization**: Calculates fair and optimal water supply distribution under limited aggregate tanker/pipeline capacities.
- **Interactive GIS Map**: Visualizes zones, risk heat points, unmet demand, and real-time geographical coordinates via Leaflet.
- **Community Incident Reporting**: Allows residents and field workers to log water shortage and garbage dump issues with GPS tagging.
- **Automated Reporting & AI Assistant**: Generates downloadable PDF/Excel executive summaries and answers operational questions with an integrated AI agent.

---

## 🏗️ System Architecture

```
SlumAI-Optimizer/
├── backend/                  # FastAPI Application
│   ├── app/
│   │   ├── models/          # SQLAlchemy DB models & Pydantic schemas
│   │   ├── routes/          # API endpoints (auth, zones, risk, predictions, etc.)
│   │   ├── services/        # ML model loaders, optimization, and PDF generation
│   │   ├── database.py      # PostgreSQL connection engine
│   │   ├── main.py          # Application entrypoint & middleware
│   │   └── security.py      # JWT authentication & password hashing
│   ├── .env                 # Database & JWT configuration
│   └── requirements.txt     # Backend Python dependencies
│
├── frontend/                 # React + Vite Application
│   ├── src/
│   │   ├── components/      # Navbar, ProtectedRoute, shared UI
│   │   ├── context/         # AuthContext for session management
│   │   ├── pages/           # Dashboard, Map, Zones, Optimization, Reports, etc.
│   │   └── services/        # Axios API client
│   ├── package.json         # Frontend dependencies & scripts
│   └── vite.config.js       # Vite configuration
│
├── models/                   # Serialized ML models (.pkl)
│   ├── water_demand_model.pkl
│   └── risk_model.pkl
│
├── Database/                 # Database setup & feature engineering scripts
│   ├── 01_schema.sql
│   ├── 02_data_validation.sql
│   ├── 03_feature_engineering.sql
│   └── 04_community_reports.sql
│
└── m1/                       # Jupyter notebooks for model training & EDA
```

---

## 🛠️ Tech Stack

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+)
- **Server**: [Uvicorn](https://www.uvicorn.org/)
- **Database**: PostgreSQL with [SQLAlchemy ORM](https://www.sqlalchemy.org/)
- **Authentication**: OAuth2 Password Flow with JWT (`PyJWT`, `pwdlib` / Argon2)
- **Machine Learning**: `scikit-learn==1.7.2`, `pandas`, `numpy`, `joblib`
- **Report Generation**: `reportlab` (PDF), `openpyxl` (Excel)

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: `react-router-dom` v7
- **Maps**: `leaflet` & `react-leaflet`
- **HTTP Client**: `axios`
- **Styling**: Responsive CSS3

---

## 🚀 Getting Started

### 1. Prerequisites
- **Python**: 3.10 to 3.12 installed
- **Node.js**: v18+ and npm installed
- **PostgreSQL**: Installed and running locally or on the cloud

---

### 2. Database Setup

1. Create a PostgreSQL database (e.g. `slum_ai_db`):
   ```sql
   CREATE DATABASE slum_ai_db;
   ```
2. Run the initialization SQL scripts from the `Database/` folder in order:
   ```bash
   psql -U postgres -d slum_ai_db -f Database/01_schema.sql
   psql -U postgres -d slum_ai_db -f Database/03_feature_engineering.sql
   psql -U postgres -d slum_ai_db -f Database/04_community_reports.sql
   ```

---

### 3. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # Linux / macOS
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables in `backend/.env`:
   ```env
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/slum_ai_db"
   SECRET_KEY="your-secret-key-here"
   ALGORITHM="HS256"
   ACCESS_TOKEN_EXPIRE_MINUTES=60
   ```
5. Start the backend server:
   ```bash
   uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```
   - **Backend API URL**: `http://127.0.0.1:8000`
   - **Interactive API Docs (Swagger)**: `http://127.0.0.1:8000/docs`
   - **Health Check**: `http://127.0.0.1:8000/health`

---

### 4. Frontend Setup

1. Open another terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the web application at:
   👉 **`http://localhost:5173`**

---

## 🌐 API Endpoints Reference

| Route Prefix | Method | Description |
| :--- | :--- | :--- |
| `/health` | `GET` | System and database connectivity check |
| `/auth` | `POST` | `/auth/register` & `/auth/login` (JWT token issue) |
| `/auth/me` | `GET` | Get current user profile and role |
| `/zones/` | `GET`, `POST` | List all monitored zones or fetch zone details |
| `/predictions/` | `POST` | Predict water demand based on zone attributes |
| `/risk/` | `GET`, `POST` | Fetch risk indices and predict risk category |
| `/optimization/` | `GET`, `POST` | Calculate optimized water allocation |
| `/recommendations/`| `GET` | Automated actionable priority guidance |
| `/alerts/` | `GET` | Fetch real-time high-risk and emergency alerts |
| `/complaints/` | `GET`, `POST` | Resident complaints & community reporting |
| `/reports/` | `GET` | Export analytical reports (PDF / Excel) |
| `/agent/` | `POST` | Query the integrated AI Assistant |

---

## 📊 Modules & Features

- **Dashboard**: High-level metrics showing total zones, high-risk flags, unmet demand totals, and allocation figures.
- **Interactive Risk Map**: Leaflet map plotting zones with color-coded risk markers (Red: High, Yellow: Medium, Green: Low).
- **Optimization Engine**: Re-allocates scarce water supplies based on population vulnerability and predicted demand.
- **Community Reports**: Allows field workers or residents to report pipe leaks, garbage accumulation, or supply outages with browser-detected geolocation.
- **AI Assistant**: Natural language query engine to explore zone metrics, water anomalies, and recommendations.

---

## 👥 Roles & Security
- **Admin**: Full access to zone configurations, model overrides, and user management.
- **Field Officer**: Can update zone data, verify complaints, and view optimization metrics.
- **Viewer / Resident**: Can report community issues and view zone status.

---

## 📄 License
This project is developed for urban optimization, disaster mitigation, and academic research purposes.
