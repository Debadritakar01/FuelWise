# ⛽ FuelWise – Smart Fuel Intelligence

**FuelWise** is a smart fuel and energy cost management web application that helps users calculate petrol consumption, estimate electric vehicle (EV) energy costs, compare running expenses, and manage their previous trips.

The application provides a dashboard for trip calculations, vehicle comparisons, trip history, analytics, and report exports.

---

## 1. Project Overview

**Project Name:** FuelWise – Smart Fuel Intelligence

**Project Type:** Full-Stack Web Application

**Objective:** To help users make economical travel decisions by comparing petrol and electric vehicle running costs and tracking trip expenses.

### Key Features

- Petrol fuel consumption and cost calculation.
- Electric vehicle energy consumption and cost calculation.
- Petrol vs EV cost comparison.
- Interactive dashboard and charts.
- Save and manage trip history.
- View detailed trip information.
- Edit and delete saved trips.
- Search and filter trip records.
- Trip expense analytics.
- Export trip records as CSV.
- Export trip reports as PDF.
- Frontend input validation and error handling.
- Backend API validation and exception handling.

---

## 2. Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Frontend build tool |
| JavaScript | Application logic |
| HTML5 | Web structure |
| CSS3 | Styling and responsive UI |
| Python | Backend programming |
| FastAPI | REST API development |
| SQLite | Database |
| SQLAlchemy | Database ORM |
| Pydantic | Request validation |
| Recharts | Dashboard charts |
| Pytest | Backend testing |
| Git & GitHub | Version control |

---

## 3. Project Architecture

```text
FuelWise/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── backend/
│   ├── venv/
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   ├── test_calculations.py
│   ├── test_pdf_export.py
│   ├── requirements.txt
│   └── fuelwise.db
│
├── README.md
└── .gitignore
```

*Note: This is a representative structure; retain the actual filenames and folders in your repository.*

---

## 4. Petrol and EV Calculation System

FuelWise calculates the running cost of petrol and electric vehicles using separate mathematical formulas.

### Petrol Calculation

Fuel consumed:

```text
Fuel Used = Distance / Mileage
```

Total cost:

```text
Petrol Cost = Fuel Used × Petrol Price
```

### Electric Vehicle Calculation

Electricity consumed:

```text
Energy Used = Distance / EV Efficiency
```

Total cost:

```text
EV Cost = Energy Used × Electricity Price
```

### Example Calculation

| Parameter | Petrol | Electric |
|---|---:|---:|
| Distance | 100 km | 100 km |
| Efficiency | 45 km/L | 40 km/kWh |
| Energy price | ₹105/L | ₹8/kWh |
| Energy consumed | 2.22 L | 2.50 kWh |
| Total cost | ₹233.33 | ₹20.00 |
| Cost per km | ₹2.33 | ₹0.20 |

**Estimated EV savings: ₹213.33**

These are illustrative values. Actual costs depend on vehicle efficiency and local energy prices.

---

## 5. Implemented Application Features

### 5.1 Dashboard

- Main FuelWise dashboard.
- Petrol and EV calculation interface.
- Vehicle selection.
- Trip distance input.
- Fuel and electricity price inputs.
- Calculation result display.
- Cost and consumption information.

### 5.2 Vehicle Comparison

- Compare petrol and electric vehicles.
- Calculate total running costs.
- Display cost differences.
- Identify the more economical option.
- Visualize comparisons using charts.

### 5.3 Trip History Management

- Save calculated trips in SQLite.
- Retrieve previously saved trips.
- View individual trip details.
- Edit existing trip records.
- Delete saved trips.
- Refresh trip history.

### 5.4 Trip History Filtering

Implemented filtering options include:

- Search by trip ID.
- Search by vehicle type.
- Search by distance.
- Filter by petrol or EV.
- Filter by start date.
- Filter by end date.
- Clear filters.

### 5.5 Trip Analytics

The dashboard includes trip statistics such as:

- Total trips.
- Total travel distance.
- Total expenses.
- Petrol expenses.
- EV expenses.
- Average cost per kilometre.
- Usage progress indicators.

### 5.6 Report Export

**CSV Export**
- Export trip records into CSV format.
- Open exported records in spreadsheet applications.

**PDF Export**
- Generate PDF trip reports.
- Download reports for record keeping.

### 5.7 Error Handling and Validation

Frontend:
- Empty input validation.
- Zero and invalid value handling.
- Negative input prevention.
- Invalid keyboard input prevention.
- Loading and error messages.
- API connection error handling.

Backend:
- HTTP exception handling.
- Request validation error handling.
- SQLAlchemy database error handling.
- Unexpected exception handling.
- Consistent API error responses.

---

## 6. Backend API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Backend status |
| GET | `/health` | Health check |
| POST | `/api/trip/estimate` | Calculate trip cost |
| POST | `/api/compare` | Compare petrol and EV |
| POST | `/api/trips/save` | Save a trip |
| GET | `/api/trips` | Retrieve trip history |
| GET | `/api/trips/{trip_id}` | Get individual trip |
| PUT | `/api/trips/{trip_id}` | Update trip |
| DELETE | `/api/trips/{trip_id}` | Delete trip |
| GET | `/api/trips/export/csv` | Export trips as CSV |
| GET | `/api/trips/export/pdf` | Export trips as PDF |

### API Documentation

FastAPI automatically provides Swagger documentation.

```text
http://127.0.0.1:8000/docs
```

---

## 7. Database

FuelWise uses SQLite with SQLAlchemy ORM.

The database stores trip information and supports:

- Saving trips.
- Retrieving trips.
- Updating trip information.
- Deleting trips.
- Generating trip history.
- Exporting trip information.

Database initialization uses SQLAlchemy table creation.

---

## 8. Installation and Setup

### Prerequisites

Install:

- Python 3.12 or compatible version.
- Node.js and npm.
- Visual Studio Code.
- Git.

### Step 1: Clone the Repository

```bash
git clone https://github.com/Debadritakar01/FuelWise.git

cd FuelWise
```

### Step 2: Backend Setup

```bash
cd backend

python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
python -m pip install -r requirements.txt
```

Start the backend:

```bash
uvicorn main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

### Step 3: Frontend Setup

Open another terminal:

```bash
cd frontend

npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## 9. Testing

### Backend Testing

Pytest is used for backend testing.

Install pytest if necessary:

```bash
python -m pip install pytest
```

Run all tests:

```bash
python -m pytest -v
```

Relevant test files include:

```text
test_calculations.py
test_pdf_export.py
```

### Calculation Test Cases

| Test | Expected Result |
|---|---|
| Petrol: 100 km | ₹233.33 |
| EV: 100 km | ₹20.00 |
| Zero distance | Validation error |
| Invalid mileage | Validation error |
| Vehicle comparison | Correct cost difference |
| PDF export | Valid PDF report |

### Frontend Testing

The following manual testing scenarios are included:

- Empty distance validation.
- Zero distance validation.
- Negative input prevention.
- Scientific notation prevention.
- Normal trip calculation.
- Save trip functionality.
- Petrol and EV comparison.
- Backend connection error handling.
- Trip history loading.
- Edit and delete operations.
- CSV and PDF exports.

---

## 10. Production Build

The frontend production build has been tested successfully.

Command:

```bash
npm run build
```

### Latest Build Results

| Item | Result |
|---|---|
| Build tool | Vite 8.3.6 |
| Modules transformed | 399 |
| CSS bundle | 24.42 kB |
| JavaScript bundle | 662.14 kB |
| Production build | Successful |
| Output directory | `dist/` |

The production build also reports a JavaScript chunk-size warning because the main bundle exceeds 500 kB after minification.

This is a performance optimization opportunity, not a build failure.

### Production Preview

Run:

```bash
npm run preview
```

Default preview URL:

```text
http://localhost:4173
```

**Current testing status:** Production preview revealed a CORS issue when retrieving trip history from the backend.

The backend CORS configuration needs to allow:

```text
http://localhost:4173
http://127.0.0.1:4173
```

The issue is currently under investigation. Production-preview integration should be marked complete only after Trip History and the other API-dependent features work successfully.

---

## 11. Current Development Status

### Completed

- [x] React and Vite setup.
- [x] FastAPI backend setup.
- [x] SQLite database integration.
- [x] Petrol cost calculation.
- [x] EV cost calculation.
- [x] Petrol vs EV comparison.
- [x] Dashboard development.
- [x] Charts and analytics.
- [x] Save trip functionality.
- [x] Trip history.
- [x] View trip details.
- [x] Edit and delete trips.
- [x] Search and filtering.
- [x] CSV export.
- [x] PDF export.
- [x] Backend exception handling.
- [x] Frontend input validation improvements.
- [x] Backend test setup and testing.
- [x] Frontend production build.

### In Progress

- [ ] Resolve production-preview CORS issue.
- [ ] Verify Trip History on port 4173.
- [ ] Complete production-preview integration testing.
- [ ] Optimize large JavaScript bundle.
- [ ] Remove unused imports and unnecessary code.
- [ ] Perform final frontend and backend integration testing.

### Future Enhancements

- [ ] Google Maps integration.
- [ ] Automatic route distance calculation.
- [ ] Live petrol price integration.
- [ ] EV charging station information.
- [ ] Advanced vehicle range estimation.
- [ ] AI-powered travel recommendations.
- [ ] User authentication.
- [ ] PostgreSQL migration if required.
- [ ] Cloud deployment.

---

## 12. Future Scope

FuelWise can be extended into a more comprehensive smart travel management platform.

Potential improvements include:

1. Route optimization using map APIs.
2. Live fuel-price information.
3. EV charging station recommendations.
4. AI-powered fuel and energy recommendations.
5. Fuel expense prediction.
6. Vehicle performance analytics.
7. User-specific trip management.
8. Cloud-based application deployment.

These features are planned enhancements and are not claimed as currently implemented.

---

## 13. Project Repository

**GitHub:** https://github.com/Debadritakar01/FuelWise

---

## 14. Conclusion

FuelWise is a full-stack smart fuel intelligence application developed using React, Vite, Python, FastAPI and SQLite.

The project has progressed beyond a basic fuel calculator into a trip expense management application with vehicle comparison, database-backed trip history, analytics and report exports.

The main calculation, database, dashboard and export features have been implemented. Current work focuses on production integration, resolving CORS configuration, improving performance and preparing the application for deployment.

**Project Status: Core development implemented; final production verification and deployment remain.**