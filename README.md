# FuelWise – Smart Fuel Intelligence

FuelWise is a web-based trip cost estimation and vehicle expense analytics application. It helps users calculate petrol and electric vehicle (EV) running costs, compare expenses, save trip records, and analyze their travel history.

**Project Status (10 November 2026):** Core backend and frontend features have been implemented. Backend automated testing currently reports **37 passed, 1 skipped, and 0 failed**. Frontend manual verification and production deployment are the remaining major milestones.

---

## Features

### 1. Petrol and EV Trip Estimation
- Calculate petrol consumption using distance, mileage, and petrol price.
- Calculate EV energy consumption using distance, efficiency, and electricity price.
- Display total trip cost.
- Calculate cost per kilometre.
- Validate user inputs and reject invalid values.

### 2. Petrol vs EV Comparison
- Compare petrol and EV running costs for the same distance.
- Calculate estimated savings.
- Identify the more economical vehicle option.

### 3. Trip History Management
- Save calculated trips in the database.
- Retrieve saved trip records.
- View individual trip details.
- Edit existing trips.
- Delete saved trips.
- Search and filter trip records.
- Filter trips by vehicle type and date range.

### 4. Analytics Dashboard
- Display total trips.
- Calculate total travel distance.
- Calculate total expenses.
- Separate petrol and EV expenses.
- Display average cost per kilometre.
- Visualize expenses and trip information through charts.
- Track vehicle usage statistics.

### 5. CSV Export
- Export saved trip records as CSV.
- Download trip information in spreadsheet-friendly format.

### 6. PDF Export
- Generate individual trip reports in PDF format.
- Display trip information and cost details.
- Generate downloadable PDF reports using ReportLab.

### 7. Security and Error Handling
- Pydantic request validation.
- Invalid input handling.
- HTTP exception handling.
- Database error handling.
- General server error handling.
- Logging for debugging and monitoring.
- CORS configuration for frontend communication.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Vite, JavaScript |
| Styling | HTML, CSS |
| Charts | Recharts |
| Backend | Python, FastAPI |
| Database | SQLite |
| ORM | SQLAlchemy |
| Validation | Pydantic |
| PDF Generation | ReportLab |
| CSV Export | Python CSV |
| Testing | Pytest |
| API Documentation | FastAPI Swagger |
| Version Control | Git and GitHub |

---

## Project Structure

```text
FuelWise/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── services/
│   │   └── calculations.py
│   ├── tests/
│   ├── test_api.py
│   ├── test_calculations.py
│   ├── test_csv_export.py
│   ├── test_pdf_export.py
│   ├── test_security.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

*Note: Adjust the structure if your actual repository uses different filenames or folders.*

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check backend status |
| GET | `/health` | Health check |
| POST | `/api/trip/estimate` | Calculate trip cost |
| POST | `/api/compare` | Compare petrol and EV |
| POST | `/api/trips/save` | Save a trip |
| GET | `/api/trips` | Get trip history |
| GET | `/api/trips/{trip_id}` | Get individual trip |
| PUT | `/api/trips/{trip_id}` | Update trip |
| DELETE | `/api/trips/{trip_id}` | Delete trip |
| GET | `/api/trips/export/csv` | Export trips as CSV |
| GET | `/api/trips/{trip_id}/pdf` | Export individual trip as PDF |

Check the actual route names in FastAPI Swagger documentation:

`http://127.0.0.1:8000/docs`

---

## Example Calculations

| Vehicle | Distance | Efficiency | Energy Price | Expected Cost |
|---|---:|---:|---:|---:|
| Petrol | 100 km | 45 km/L | ₹105/L | ₹233.33 |
| EV | 100 km | 40 km/kWh | ₹8/kWh | ₹20.00 |

These examples are used to verify the calculation logic.

---

## Installation and Setup

### Prerequisites

- Python 3.10 or higher
- Node.js and npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Debadritakar01/FuelWise.git
cd FuelWise
```

### 2. Backend Setup

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Start the backend:

```powershell
python -m uvicorn main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

### 3. Frontend Setup

Open another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

Keep both servers running while using the application.

---

## Environment Configuration

FuelWise is being prepared for production configuration using environment variables.

Install the required package:

```bash
pip install python-dotenv
```

Create `backend/.env`:

```env
DATABASE_URL=sqlite:///./fuelwise.db
FRONTEND_ORIGIN=http://localhost:5173
```

Create `backend/.env.example`:

```env
DATABASE_URL=sqlite:///./fuelwise.db
FRONTEND_ORIGIN=http://localhost:5173
```

The backend should load these variables through `python-dotenv`.

**Important:** Environment-based configuration must be verified in both `database.py` and `main.py` before this setup is considered complete.

### Recommended .gitignore

```gitignore
# Environment variables
.env
.env.*
!.env.example

# Python
__pycache__/
*.py[cod]
venv/

# Testing
.pytest_cache/

# Database
*.db

# Frontend
node_modules/
dist/
```

Never upload actual credentials or `.env` files to GitHub.

---

## Backend Testing

FuelWise uses Pytest for automated backend testing.

Run all tests:

```powershell
python -m pytest -v
```

### Latest Test Results

```text
38 tests collected

37 passed
1 skipped
0 failed
```

Test coverage includes:

- API endpoints.
- Petrol calculations.
- EV calculations.
- Input validation.
- CSV export.
- PDF export.
- Trip history.

### PDF Test Status

The petrol PDF export test passed.

The EV PDF export test was skipped because no saved EV trip was available.

To verify the skipped test:

1. Save an EV trip.
2. Run:

```powershell
python -m pytest test_pdf_export.py -v
```

### Warning

One Starlette/TestClient deprecation warning was reported. It did not affect the test results.

---

## Development Progress

| Module | Status |
|---|---|
| React + Vite setup | Completed |
| FastAPI backend | Completed |
| Petrol calculation | Completed |
| EV calculation | Completed |
| Petrol vs EV comparison | Completed |
| SQLite integration | Completed |
| Save trip functionality | Completed |
| Trip history | Completed |
| View trip details | Completed |
| Edit trip | Implemented |
| Delete trip | Implemented |
| Search and filters | Implemented |
| Analytics dashboard | Implemented |
| Charts and statistics | Implemented |
| CSV export | Implemented and tested |
| PDF export | Implemented and tested partially |
| API validation | Implemented |
| Error handling | Implemented |
| Backend automated testing | 37 passed, 1 skipped |
| Frontend manual testing | Pending confirmation |
| Responsive UI testing | Pending confirmation |
| Environment configuration | In progress |
| Production database setup | Pending |
| Backend deployment | Pending |
| Frontend deployment | Pending |
| Live application testing | Pending |

---

## Deployment Roadmap

Deployment is the next major milestone.

The planned hosting approach is:

### Backend – Render

Deploy the FastAPI backend.

### Frontend – Vercel

Deploy the React + Vite frontend.

### Database

Choose a persistent production database before deployment. SQLite may lose data on hosting platforms where the application filesystem is temporary or reset during redeployment.

### Deployment Steps

1. Complete frontend manual testing.
2. Test responsive design on mobile, tablet, and desktop.
3. Complete environment variable configuration.
4. Configure production CORS.
5. Select a persistent production database.
6. Deploy FastAPI backend.
7. Deploy React frontend.
8. Connect the frontend to the deployed backend.
9. Test all APIs on the live application.
10. Update GitHub README with deployment links and screenshots.

**Deployment status: Not yet deployed.**

---

## Future Enhancements

- User authentication and registration.
- Multiple vehicle profiles.
- Live fuel price integration.
- EV charging station integration.
- Route-based distance calculation.
- Advanced expense analytics.
- Improved frontend automated testing.
- Production database migration.
- Cloud deployment.

---

## Important Notes

- All calculations are estimates based on user-provided values.
- Petrol mileage is measured in km/L.
- EV efficiency is measured in km/kWh.
- Actual expenses depend on vehicle condition, driving style, traffic, and local energy prices.
- Do not commit sensitive configuration files or database credentials.
- Keep this documentation updated as new features are completed.

---

**FuelWise – Smart Fuel Intelligence**

*Plan your trip. Compare running costs. Understand your travel expenses.*
