# ⚡ FuelWise – Smart Fuel Intelligence

FuelWise is a web-based trip planning and vehicle expense analytics application. It helps users estimate petrol and electric vehicle (EV) running costs, compare energy expenses, save trip records, and review travel history through an analytics dashboard.

## 🚀 Features

### 1. Trip Planning and Cost Estimation
- Calculate petrol consumption and trip cost.
- Calculate EV energy consumption and charging cost.
- Display estimated energy usage and cost per kilometre.
- Compare petrol and EV running costs.
- Calculate potential savings between petrol and EV vehicles.

### 2. Trip History Management
- Save calculated trips to the database.
- View all saved trips.
- View individual trip details.
- Edit existing trip records.
- Delete saved trips.

### 3. Monthly Analytics

FuelWise provides a monthly analytics dashboard with:

- Total trips.
- Total travel distance.
- Total expenses.
- Petrol expenses.
- EV expenses.
- Monthly petrol and EV distance.
- Monthly trip activity.

**Analytics Visualizations:**
- Monthly Expense Comparison – Petrol vs EV.
- Monthly Distance Comparison – Petrol vs EV.
- Monthly Trip Activity – Number of trips per month.

**Monthly Summary Table:**

Displays:
- Month and year.
- Total trips.
- Total distance.
- Petrol distance.
- EV distance.
- Petrol expenses.
- EV expenses.
- Total expenses.

### 4. Year and Month Filters (In Progress)

The next enhancement is to introduce date filters.

Planned functionality:
- Filter analytics by a selected year.
- Filter analytics by a selected month.
- View all monthly records without filters.
- Dynamically update summary cards.
- Refresh charts and tables based on selected filters.

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| Frontend | React.js |
| Build Tool | Vite |
| Programming Language | JavaScript |
| Styling | HTML, CSS |
| Charts | Recharts |
| Backend | Python, FastAPI |
| Database | SQLite |
| ORM | SQLAlchemy |
| API Testing | Swagger UI |
| Version Control | Git and GitHub |

## 📂 Project Structure

```text
FuelWise/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models/
│   ├── services/
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MonthlyAnalytics.jsx
│   │   │   ├── MonthlyAnalytics.css
│   │   │   ├── TripHistory.jsx
│   │   │   ├── TripDetails.jsx
│   │   │   └── EditTrip.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check backend status |
| POST | `/api/trip/estimate` | Calculate trip estimate |
| POST | `/api/compare` | Compare petrol and EV costs |
| POST | `/api/trips/save` | Save a trip |
| GET | `/api/trips` | Retrieve saved trips |
| GET | `/api/trips/{trip_id}` | Retrieve individual trip |
| PUT | `/api/trips/{trip_id}` | Update an existing trip |
| DELETE | `/api/trips/{trip_id}` | Delete a saved trip |
| GET | `/api/analytics/monthly` | Retrieve monthly analytics |

*Verify the exact route names against your current backend `main.py` before publishing.*

### Monthly Analytics API

Base endpoint:

```http
GET /api/analytics/monthly
```

Planned filter requests:

```http
GET /api/analytics/monthly?year=2026
```

```http
GET /api/analytics/monthly?year=2026&month=11
```

Supported parameters:

- `year`: Filter analytics by year.
- `month`: Filter analytics by month (1–12).

### Example API Response

```json
{
  "filters": {
    "year": 2026,
    "month": 11
  },
  "total_trips": 5,
  "total_distance": 250.0,
  "total_expenses": 700.0,
  "petrol_expense": 500.0,
  "ev_expense": 200.0,
  "monthly_data": [
    {
      "month": "November",
      "year": 2026,
      "total_trips": 5,
      "total_distance": 250.0,
      "petrol_distance": 150.0,
      "ev_distance": 100.0,
      "total_expenses": 700.0,
      "petrol_expense": 500.0,
      "ev_expense": 200.0
    }
  ]
}
```

*Example values only.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd FuelWise
```

### 2. Backend Setup

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

Start the FastAPI server:

```bash
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

```bash
cd frontend
npm install
npm run dev
```

Open the local URL provided by Vite, usually:

```text
http://localhost:5173
```

## 📊 Development Progress

| Feature | Status |
|---|---|
| React + Vite setup | Completed |
| FastAPI backend setup | Completed |
| Petrol trip calculation | Implemented |
| EV trip calculation | Implemented |
| Petrol vs EV comparison | Implemented |
| Save trip functionality | Implemented |
| Trip history | Implemented |
| Individual trip details | Implemented |
| Edit trip | Implemented |
| Delete trip | Implemented |
| Monthly Analytics API | Implemented |
| Monthly expense chart | Implemented |
| Monthly trip activity chart | Implemented |
| Petrol vs EV distance calculation | Added |
| Monthly distance comparison chart | Added |
| Monthly summary table | Implemented |
| Year and month filters | In Progress |
| Deployment | Pending |

## 🧪 Testing Checklist

- [ ] Test petrol trip calculation.
- [ ] Test EV trip calculation.
- [ ] Test petrol vs EV comparison.
- [ ] Save and retrieve trips.
- [ ] View individual trip details.
- [ ] Edit saved trips.
- [ ] Delete saved trips.
- [ ] Test monthly analytics API.
- [ ] Verify petrol and EV distance calculations.
- [ ] Verify monthly expense chart.
- [ ] Verify monthly distance chart.
- [ ] Verify monthly trip activity chart.
- [ ] Verify monthly summary table.
- [ ] Test year filter.
- [ ] Test month filter.
- [ ] Verify frontend updates after applying filters.

## 🔮 Future Enhancements

- Year and month analytics filters.
- Date-range filtering.
- Export analytics reports as PDF.
- Multiple vehicle profiles.
- Route-based distance estimation.
- Nearby petrol pumps and EV charging stations.
- User authentication.
- Deployment of frontend and backend.

## 👩‍💻 Project Information

**Project Name:** FuelWise – Smart Fuel Intelligence

**Category:** Full Stack Web Development

**Purpose:** Smart journey planning, fuel cost estimation, petrol vs EV comparison, and travel expense analytics.

---

**FuelWise – Plan your trip. Save your fuel.** ⚡