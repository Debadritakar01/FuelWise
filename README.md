# FuelWise – Smart Fuel Intelligence 🚗⚡

FuelWise is a full-stack web application that helps users calculate, compare, track, and analyse petrol and electric vehicle (EV) running costs.

It provides an easy way to estimate trip expenses, compare petrol and electricity costs, maintain trip history, and understand vehicle running expenses through interactive analytics.

---

## ✨ Features

### 1. Fuel Cost Calculator
- Calculate petrol vehicle running costs.
- Calculate electric vehicle running costs.
- Calculate fuel consumption in litres.
- Calculate electricity consumption in kWh.
- Calculate cost per kilometre.
- Display estimated trip expenses.

### 2. Petrol vs EV Comparison
- Compare petrol and EV running costs.
- Calculate potential savings.
- Identify the more economical vehicle.
- Display comparison results visually.

### 3. Trip Management
- Save calculated trips to SQLite.
- View previously saved trips.
- View individual trip details.
- Edit existing trip records.
- Delete trip records.

### 4. Trip History and Filters
- Search trips using trip ID and vehicle type.
- Filter trips by vehicle type.
- Filter trips using a date range.
- Clear applied filters.
- Refresh trip history.

### 5. Analytics Dashboard
- Total number of trips.
- Total trip expenses.
- Total distance travelled.
- Petrol expenses.
- EV expenses.
- Average cost per kilometre.
- Vehicle usage progress indicators.

### 6. Data Visualization
- Interactive petrol vs EV cost comparison chart.
- Visual representation of trip expenses.
- Analytics-based expense insights.

### 7. Backend API
- RESTful API using FastAPI.
- Request validation using Pydantic.
- SQLite database integration using SQLAlchemy.
- Centralized exception handling.
- Logging configuration.
- CORS configuration for frontend-backend communication.

### 8. Automated Testing
- API endpoint testing using Pytest.
- Petrol calculation testing.
- EV calculation testing.
- Successful calculation response testing.
- Invalid input validation testing.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js |
| Build Tool | Vite |
| Styling | CSS |
| Charts | Recharts |
| Backend | Python, FastAPI |
| Database | SQLite |
| ORM | SQLAlchemy |
| Validation | Pydantic |
| Testing | Pytest, HTTPX |
| API Documentation | Swagger UI |
| PDF Generation Library | ReportLab |

---

## 📂 Project Structure

```text
FuelWise/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CostComparisonChart.jsx
│   │   │   ├── TripHistory.jsx
│   │   │   └── ...
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── services/
│   │   └── calculations.py
│   │
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── test_api.py
│   │   └── test_calculations.py
│   │
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── requirements.txt
│   └── fuelwise.db
│
└── README.md
```

*Note: The structure above highlights the main files discussed during development. Adjust it if your actual folder names differ.*

---

## ⚙️ Installation and Setup

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

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the environment on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

### 3. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Backend welcome message |
| GET | `/health` | Health check |
| POST | `/api/trip/estimate` | Calculate trip cost |
| POST | `/api/compare` | Compare petrol and EV costs |
| POST | `/api/trips/save` | Save a trip |
| GET | `/api/trips` | Retrieve trip history |
| GET | `/api/trips/{trip_id}` | Retrieve trip details |
| PUT | `/api/trips/{trip_id}` | Update a trip |
| DELETE | `/api/trips/{trip_id}` | Delete a trip |

---

## 🧪 Testing

FuelWise uses Pytest for automated backend testing.

Navigate to the backend directory and activate the virtual environment.

Run all tests:

```bash
python -m pytest -v
```

Run API tests:

```bash
python -m pytest tests/test_api.py -v
```

Run calculation tests:

```bash
python -m pytest tests/test_calculations.py -v
```

### Expected Calculation Results

| Test Scenario | Expected Result |
|---|---:|
| Petrol: 100 km, 45 km/L, ₹105/L | ₹233.33 |
| EV: 100 km, 40 km/kWh, ₹8/kWh | ₹20.00 |
| Petrol cost per km | ₹2.33 |
| EV cost per km | ₹0.20 |

### Input Validation

The backend validates:
- Zero or negative distances.
- Zero or negative fuel prices.
- Zero or negative mileage and efficiency.
- Unsupported vehicle types.
- Missing vehicle-specific fields.
- Invalid petrol and EV field combinations.

---

## 🧮 Calculation Formulas

**Petrol Vehicle**

Fuel consumed:

```text
Fuel Used = Distance / Mileage
```

Total petrol cost:

```text
Total Cost = Fuel Used × Petrol Price
```

Cost per kilometre:

```text
Cost Per KM = Total Cost / Distance
```

**Electric Vehicle**

Energy consumed:

```text
Energy Used = Distance / EV Efficiency
```

Total electricity cost:

```text
Total Cost = Energy Used × Electricity Price
```

Cost per kilometre:

```text
Cost Per KM = Total Cost / Distance
```

---

## 🎯 Project Objectives

- Simplify vehicle running-cost calculations.
- Help users compare petrol and electric vehicles.
- Encourage cost-effective transportation decisions.
- Maintain organized trip expense records.
- Provide meaningful insights through analytics.
- Demonstrate full-stack application development.

---

## 🚀 Future Enhancements

The following are potential improvements, not claims about existing functionality:

- User registration and authentication.
- Cloud database integration.
- Fuel price API integration.
- Historical fuel price tracking.
- Advanced monthly and yearly analytics.
- Deployment and production configuration.
- Automated CI/CD testing.
- Improved mobile responsiveness.

---

## 👩‍💻 Developer

**Debadrita Kar**

GitHub: [Debadritakar01](https://github.com/Debadritakar01)

Project Repository: [FuelWise – Smart Fuel Intelligence](https://github.com/Debadritakar01/FuelWise)

---

*FuelWise – Making smarter and more economical travel decisions through technology.*