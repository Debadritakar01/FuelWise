# FuelWise – Smart Fuel Intelligence

FuelWise is a smart fuel and vehicle expense management application designed to help users calculate trip costs, compare petrol and electric vehicles, track travel expenses, and analyze monthly vehicle usage.

The application provides fuel consumption calculations, EV vs Petrol comparisons, trip history management, analytics dashboards, and downloadable reports.

---

## 1. Project Overview

**Project Name:** FuelWise – Smart Fuel Intelligence

**Project Type:** Full-Stack Web Application

**Objective:** To help users make economical travel decisions by calculating fuel and electricity consumption, estimating journey costs, comparing vehicle running expenses, and tracking trip history.

### Key Features

- Petrol vehicle trip cost calculator.
- Electric vehicle trip cost calculator.
- Petrol vs EV cost comparison.
- Fuel and electricity consumption calculation.
- Cost-per-kilometre calculation.
- Automatic trip saving.
- Trip history management.
- View individual trip details.
- Edit and delete saved trips.
- Search and filter trip history.
- Monthly expense analytics.
- Interactive dashboard charts.
- Petrol and EV expense breakdown.
- CSV export for trip history.
- PDF trip report generation.
- Backend request validation.
- Global API exception handling.
- Database integration using SQLite.

---

## 2. Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Frontend build tool |
| JavaScript | Application logic |
| HTML5 | Page structure |
| CSS3 | UI styling |
| Python | Backend programming |
| FastAPI | REST API development |
| SQLite | Database |
| SQLAlchemy | ORM and database operations |
| Pydantic | Request validation |
| Recharts | Interactive charts |
| ReportLab | PDF report generation |
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
│   │   ├── main.jsx
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── services/
│   │   └── calculations.py
│   │
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── test_*.py
│   ├── requirements.txt
│   └── fuelwise.db
│
├── README.md
└── .gitignore
```

*The structure above is a simplified representation of the project.*

---

## 4. Main Application Features

### 4.1 Petrol Trip Calculator

Calculates petrol consumption and journey expenses.

**Formula:**

Fuel Consumed = Distance / Mileage

Total Cost = Fuel Consumed × Petrol Price

Example:

- Distance: 100 km
- Mileage: 45 km/L
- Petrol Price: ₹105/L

Expected result:

- Fuel consumed: 2.22 litres
- Total cost: ₹233.33
- Cost per kilometre: ₹2.33

### 4.2 Electric Vehicle Calculator

Calculates electricity consumption and charging expenses.

**Formula:**

Electricity Consumed = Distance / Efficiency

Total Cost = Electricity Consumed × Electricity Price

Example:

- Distance: 100 km
- Efficiency: 40 km/kWh
- Electricity Price: ₹8/kWh

Expected result:

- Electricity consumed: 2.50 kWh
- Total cost: ₹20.00
- Cost per kilometre: ₹0.20

### 4.3 Petrol vs EV Comparison

Compares the running expenses of petrol and electric vehicles for the same distance.

Features:
- Petrol trip cost.
- EV trip cost.
- Potential savings.
- Savings percentage.
- More economical vehicle identification.
- Visual cost comparison.

Example:

| Parameter | Petrol | EV |
|---|---:|---:|
| Distance | 100 km | 100 km |
| Running cost | ₹233.33 | ₹20.00 |
| Cost/km | ₹2.33 | ₹0.20 |

Potential EV savings: ₹213.33.

*These values are illustrative and depend on the entered prices and vehicle efficiency.*

### 4.4 Trip History Management

FuelWise stores completed trip records in SQLite.

Available operations:
- Save trip details.
- Retrieve all saved trips.
- View individual trip information.
- Edit existing trips.
- Delete trips.
- Search trip records.
- Filter by vehicle type.
- Filter by date range.

### 4.5 Monthly Analytics Dashboard

The analytics module provides:

- Total trips.
- Total distance travelled.
- Total expenses.
- Petrol expenses.
- EV expenses.
- Average cost per kilometre.
- Monthly expense breakdown.
- Vehicle usage statistics.
- Interactive charts.

### 4.6 CSV Export

Users can export saved trip records into CSV format.

Endpoint:

`GET /api/trips/export/csv`

### 4.7 PDF Report Generation

FuelWise supports PDF report generation for individual trips using ReportLab.

Endpoint:

`GET /api/trips/{trip_id}/pdf`

---

## 5. Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Home API |
| GET | `/health` | Health check |
| POST | `/api/trip/estimate` | Calculate trip expenses |
| POST | `/api/compare` | Compare petrol and EV |
| POST | `/api/trips/save` | Save trip |
| GET | `/api/trips` | Retrieve trip history |
| GET | `/trips` | Alternate trip history route |
| GET | `/api/trips/export/csv` | Export trips as CSV |
| GET | `/api/trips/{trip_id}` | Retrieve individual trip |
| PUT | `/api/trips/{trip_id}` | Update trip |
| DELETE | `/api/trips/{trip_id}` | Delete trip |
| GET | `/api/analytics/monthly` | Monthly analytics |
| GET | `/api/trips/{trip_id}/pdf` | Download trip PDF |

---

## 6. Backend Validation and Error Handling

FuelWise uses Pydantic validation to prevent invalid request data.

Implemented validations include:

- Distance must be greater than zero.
- Mileage must be greater than zero.
- EV efficiency must be greater than zero.
- Petrol price cannot be negative.
- Electricity price cannot be negative.
- Vehicle type must be valid.
- Vehicle-specific fields are checked.
- Infinite and NaN values are rejected.

### Global Exception Handling

The backend includes centralized exception handlers for:

| Error | HTTP Status |
|---|---:|
| HTTP errors | Appropriate HTTP status |
| Invalid request body | 422 |
| Missing trip | 404 |
| Invalid calculation | 400 |
| Database failure | 500 |
| Unexpected server error | 500 |

Consistent JSON error responses and backend logging are implemented.

---

## 7. Database

FuelWise uses SQLite with SQLAlchemy.

The database stores trip information, including:

- Trip ID.
- Vehicle type.
- Distance.
- Mileage.
- Petrol price.
- EV efficiency.
- Electricity price.
- Fuel consumed.
- Energy consumed.
- Total trip cost.
- Cost per kilometre.
- Creation date and time.

Database tables are initialized through SQLAlchemy.

---

## 8. Installation and Setup

### Prerequisites

Install:

- Python 3.12 or compatible version.
- Node.js and npm.
- Visual Studio Code.
- Git.

### Step 1: Clone the repository

```bash
git clone https://github.com/Debadritakar01/FuelWise.git

cd FuelWise
```

### Step 2: Start the backend

```bash
cd backend

python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start FastAPI:

```bash
python -m uvicorn main:app --reload
```

Backend URL:

http://127.0.0.1:8000

Swagger documentation:

http://127.0.0.1:8000/docs

### Step 3: Start the frontend

Open another terminal:

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

http://localhost:5173

---

## 9. Testing

FuelWise uses Pytest for backend testing.

Run the complete test suite:

```bash
python -m pytest -v
```

Run PDF export tests separately:

```bash
python -m pytest test_pdf_export.py -v
```

### Calculation Testing

| Test Case | Expected Result |
|---|---:|
| Petrol: 100 km, 45 km/L, ₹105/L | ₹233.33 |
| EV: 100 km, 40 km/kWh, ₹8/kWh | ₹20.00 |
| Zero distance | Validation error |
| Zero mileage | Validation error |
| Zero EV efficiency | Validation error |
| Negative fuel price | Validation error |

### Previously Recorded Test Results

- Earlier backend test suite: 27 passing tests.
- Focused PDF export test run: 6 passed, 1 warning.

The warning is recorded separately from test failures.

Additional validation and frontend tests are still part of the remaining work.

---

## 10. Current Development Status

### Completed Features

- [x] React and Vite frontend setup.
- [x] FastAPI backend setup.
- [x] Petrol calculator.
- [x] EV calculator.
- [x] Petrol vs EV comparison.
- [x] Fuel and electricity consumption calculations.
- [x] Cost-per-kilometre calculation.
- [x] SQLite database integration.
- [x] SQLAlchemy integration.
- [x] Save trip functionality.
- [x] Trip history.
- [x] View trip details.
- [x] Edit saved trips.
- [x] Delete saved trips.
- [x] Search and filter trip history.
- [x] Monthly analytics API.
- [x] Analytics dashboard.
- [x] Interactive charts.
- [x] CSV export implementation.
- [x] PDF report generation.
- [x] Backend calculation testing.
- [x] Backend validation.
- [x] Global exception handlers.
- [x] Logging configuration.
- [x] CORS configuration.
- [x] Monthly analytics query validation.

### Currently Working On

- [ ] Step 15.5 – Frontend edge-case handling.
- [ ] Frontend input validation improvements.
- [ ] Prevent multiple calculation submissions.
- [ ] API loading and error states.
- [ ] Backend connection failure handling.
- [ ] Empty trip history handling.
- [ ] Frontend validation error display.
- [ ] Final integration testing.

---

## 11. Remaining Development Roadmap

| Phase | Work | Status |
|---|---|---|
| Core development | Calculator and comparison | Completed |
| Database | SQLite and trip history | Completed |
| Analytics | Monthly analytics and charts | Completed |
| Export | CSV and PDF reports | Implemented |
| API verification | Validation and exception handling | Implemented |
| Step 15.5 | Frontend edge-case handling | Pending |
| Security | Security review and improvements | Pending |
| Performance | Performance testing and optimization | Pending |
| Deployment | Production deployment | Pending |
| Final documentation | Final README and project documentation | In progress |

### Future Enhancements

- User authentication and authorization.
- PostgreSQL deployment.
- Live petrol price integration.
- EV charging station information.
- Google Maps integration.
- Route-based fuel estimation.
- Intelligent fuel recommendations.
- AI-powered fuel advisor.
- Fuel expense prediction.

These are proposed future features and are not currently claimed as implemented.

---

## 12. Future Scope

FuelWise can be extended into a complete vehicle expense and trip intelligence platform.

Future versions may include route optimization, fuel station recommendations, charging station discovery, expense forecasting, and personalized driving recommendations.

---

## 13. Author

**Project:** FuelWise – Smart Fuel Intelligence

**Developer:** Debadrita Kar

**GitHub:** https://github.com/Debadritakar01/FuelWise

---

## 14. Conclusion

FuelWise currently provides a full-stack platform for petrol and electric vehicle cost estimation, vehicle expense comparison, trip management, monthly analytics, and downloadable reports.

The project is being developed incrementally, with emphasis on calculation accuracy, API validation, database reliability, error handling, and a user-friendly interface.

The next development milestone is completing frontend edge-case handling, followed by security, performance testing, and deployment.
