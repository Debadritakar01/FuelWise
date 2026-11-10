# FuelWise – Smart Fuel Intelligence

FuelWise is a full-stack web application that helps users calculate vehicle running costs, compare petrol and electric vehicles (EVs), track travel expenses, and understand potential savings through data-driven insights.

The application provides trip management, cost analytics, historical records, and downloadable reports through an interactive dashboard.

## Features

### 1. Petrol and EV Cost Calculator
- Calculate petrol consumption and trip expenses.
- Calculate EV electricity consumption and charging costs.
- Display total trip cost and cost per kilometre.
- Validate user inputs to prevent invalid calculations.

### 2. Petrol vs EV Comparison
- Compare petrol and EV running costs.
- Calculate potential savings.
- Calculate savings percentage.
- Recommend the more economical vehicle.

### 3. Trip Management
- Save trip records in an SQLite database.
- View complete trip history.
- View individual trip details.
- Edit existing trips.
- Delete unwanted trips.

### 4. Dashboard and Analytics
- Total number of trips.
- Total distance travelled.
- Total travel expenses.
- Petrol and EV expense breakdown.
- Average cost per kilometre.
- Monthly expense analytics.
- Interactive cost comparison charts.

### 5. Report Generation
- Generate individual trip reports in PDF format.
- Export saved trip history to CSV format.
- Download records for further analysis.

**Note:** CSV export has been added to the backend. Its Swagger registration and actual file download still require verification. PDF generation is implemented but its download test is pending.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React.js |
| Build Tool | Vite |
| Backend | Python |
| API Framework | FastAPI |
| Database | SQLite |
| ORM | SQLAlchemy |
| Data Validation | Pydantic |
| Charts | Recharts |
| PDF Generation | ReportLab |
| API Testing | Pytest |
| API Documentation | Swagger UI |

## Project Architecture

FuelWise follows a frontend-backend architecture.

- **Frontend:** Collects user inputs and displays calculations, trip history, analytics and charts.
- **Backend:** Handles calculations, business logic, API requests and database operations.
- **Database:** Stores trip records using SQLite.
- **API Communication:** React communicates with FastAPI through REST APIs.

## Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API home |
| GET | `/health` | Health check |
| POST | `/api/trip/estimate` | Calculate trip cost |
| POST | `/api/compare` | Compare petrol and EV |
| POST | `/api/trips/save` | Save a trip |
| GET | `/api/trips` | Get trip history |
| GET | `/trips` | Alternate trip history route |
| GET | `/api/trips/export/csv` | Export trips as CSV |
| GET | `/api/trips/{trip_id}` | Get individual trip |
| PUT | `/api/trips/{trip_id}` | Update trip |
| DELETE | `/api/trips/{trip_id}` | Delete trip |
| GET | `/api/analytics/monthly` | Monthly analytics |
| GET | `/api/trips/{trip_id}/pdf` | Download trip PDF |

CSV export is implemented in the current backend code but still needs endpoint and download verification.

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Debadritakar01/FuelWise.git
```

```bash
cd FuelWise
```

### 2. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install project dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
python -m uvicorn main:app --reload
```

Backend URL:

`http://127.0.0.1:8000`

Swagger API documentation:

`http://127.0.0.1:8000/docs`

### 3. Frontend Setup

Open another terminal and navigate to the frontend directory.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend URL:

`http://localhost:5173`

## Sample Calculations

### Petrol Vehicle

| Input | Value |
|---|---:|
| Distance | 100 km |
| Mileage | 45 km/L |
| Petrol Price | ₹105/L |
| Fuel Consumed | 2.22 L |
| Total Cost | ₹233.33 |
| Cost per KM | ₹2.33 |

### Electric Vehicle

| Input | Value |
|---|---:|
| Distance | 100 km |
| Efficiency | 40 km/kWh |
| Electricity Price | ₹8/kWh |
| Energy Consumed | 2.50 kWh |
| Total Cost | ₹20.00 |
| Cost per KM | ₹0.20 |

### Potential Savings

- Petrol Cost: ₹233.33
- EV Cost: ₹20.00
- Potential Savings: ₹213.33
- Savings Percentage: 91.43%

EV is more economical in this example.

## Testing

FuelWise uses Pytest for backend testing.

Run the test suite:

```bash
python -m pytest -v
```

### Previous Test Results

- Total tests: 27
- Passed: 27
- Failed: 0

The 27 tests passed before the latest CSV export changes. The complete test suite must be executed again after those changes.

Additional verification underway:
- Petrol vs EV comparison API.
- Monthly analytics API.
- CSV export and download.
- PDF report download.
- Frontend and backend integration.

## Current Development Status

| Feature | Status |
|---|---|
| Petrol cost calculation | Completed |
| EV cost calculation | Completed |
| Vehicle comparison | Implemented |
| SQLite database | Completed |
| Save trips | Completed |
| Trip history | Completed |
| Edit and delete trips | Completed |
| Monthly analytics | Implemented |
| Interactive charts | Implemented |
| PDF report generation | Implemented; testing pending |
| CSV export | Added; testing pending |
| Backend automated tests | 27 passed previously |
| Frontend integration testing | Upcoming |
| Security and performance testing | Upcoming |
| Deployment | Upcoming |

## Future Improvements

1. Complete CSV and PDF export verification.
2. Perform complete frontend integration testing.
3. Improve error handling and input validation.
4. Conduct security and performance testing.
5. Add user authentication and authorization.
6. Deploy the frontend and backend.
7. Configure a production database if required.
8. Improve dashboard responsiveness and user experience.

## Project Objective

The main objective of FuelWise is to help users make informed vehicle-related financial decisions by comparing petrol and electric vehicle running costs, monitoring travel expenses, and identifying opportunities to save money.

## Author

**Debadrita Kar**

GitHub: [Debadritakar01](https://github.com/Debadritakar01)

Project Repository: [FuelWise – Smart Fuel Intelligence](https://github.com/Debadritakar01/FuelWise)

---

*FuelWise – Making smarter and more economical travel decisions.*