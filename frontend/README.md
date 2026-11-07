# ⛽ FuelWise – Smart Fuel Intelligence System

FuelWise is a smart fuel cost analysis application designed to help users calculate, compare, and manage vehicle travel expenses. It provides petrol and electric vehicle (EV) cost estimations, compares running costs, and visualizes trip expenses through interactive charts.

The application uses React for the frontend and FastAPI for backend services. SQLite with SQLAlchemy is being integrated to store and manage previous trip calculations.

## 🚀 Features

### 1. Petrol Trip Cost Calculator
- Calculate petrol consumption based on travel distance.
- Calculate estimated fuel expenses using mileage and petrol price.
- Display total trip cost and cost per kilometre.

### 2. Electric Vehicle (EV) Cost Calculator
- Calculate electricity consumption based on distance and vehicle efficiency.
- Estimate total electricity expenses.
- Display EV running cost and cost per kilometre.

### 3. Petrol vs EV Comparison
- Compare petrol and electric vehicle travel expenses.
- Calculate potential savings.
- Identify the cheaper vehicle for a given journey.
- Display comparison results.

### 4. Interactive Data Visualization
- Visualize petrol and EV trip costs using Recharts.
- Display trip cost comparisons through bar charts.
- Make cost differences easier to understand.

### 5. SQLite Database Integration
- Store previous trip calculations.
- Maintain trip records using SQLite.
- Use SQLAlchemy ORM for database operations.
- Automatically create database tables.

### 6. Trip History Management
- Save petrol and EV trip details.
- Retrieve previously saved trips.
- Delete saved trip records.
- Maintain a history of calculated travel expenses.

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript |
| Styling | CSS |
| Charts | Recharts |
| Backend | Python, FastAPI |
| API Testing | Swagger UI |
| Database | SQLite |
| ORM | SQLAlchemy |
| Server | Uvicorn |
| Validation | Pydantic |

## 📂 Project Structure

```text
FuelWise/
│
├── backend/
│   ├── venv/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── fuelwise.db
│   ├── requirements.txt
│   │
│   └── services/
│       └── calculations.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── CostComparisonChart.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

*Note: `fuelwise.db` is generated automatically when the backend initializes the database. It should not be manually created.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
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

Activate the virtual environment on Windows:

```bash
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

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check API status |
| GET | `/health` | Health check |
| POST | `/api/trip/estimate` | Calculate individual trip cost |
| POST | `/api/compare` | Compare petrol and EV expenses |
| POST | `/api/trips/save` | Save a trip |
| GET | `/api/trips` | Retrieve saved trips |
| DELETE | `/api/trips/{trip_id}` | Delete a saved trip |

### Example: Petrol Trip Calculation

**POST** `/api/trip/estimate`

```json
{
  "vehicle_type": "petrol",
  "distance": 100,
  "mileage": 20,
  "petrol_price": 105
}
```

### Example: EV Trip Calculation

**POST** `/api/trip/estimate`

```json
{
  "vehicle_type": "ev",
  "distance": 100,
  "efficiency": 8,
  "electricity_price": 8
}
```

### Example: Petrol vs EV Comparison

**POST** `/api/compare`

```json
{
  "distance": 100,
  "mileage": 20,
  "petrol_price": 105,
  "efficiency": 8,
  "electricity_price": 8
}
```

## 🗄️ Database Design

FuelWise uses SQLite to store trip information.

**Database file:** `fuelwise.db`

**Table:** `trips`

| Column | Description |
|---|---|
| id | Unique trip ID |
| vehicle_type | Petrol or EV |
| distance_km | Travel distance |
| mileage | Petrol vehicle mileage |
| petrol_price | Petrol price per litre |
| efficiency | EV efficiency |
| electricity_price | Electricity price per unit |
| fuel_used_litres | Petrol consumed |
| energy_used_kwh | Electricity consumed |
| total_cost | Total trip expense |
| cost_per_km | Cost per kilometre |
| created_at | Trip creation date and time |

## 🧮 Calculation Logic

**Petrol Vehicle**

Fuel consumed:

```text
Fuel Used = Distance / Mileage
```

Total cost:

```text
Total Cost = Fuel Used × Petrol Price
```

**Electric Vehicle**

Electricity consumed:

```text
Energy Used = Distance / EV Efficiency
```

Total cost:

```text
Total Cost = Energy Used × Electricity Price
```

**Cost Per Kilometre**

```text
Cost Per KM = Total Cost / Distance
```

## 📊 Project Development Progress

- [x] React frontend setup
- [x] FastAPI backend setup
- [x] Petrol trip cost calculation
- [x] EV trip cost calculation
- [x] Petrol vs EV comparison API
- [x] Interactive cost comparison chart
- [x] SQLite database configuration
- [x] SQLAlchemy database models
- [x] Automatic database table initialization
- [x] Trip save, retrieve, and delete API implementation
- [ ] Backend API testing and verification
- [ ] React integration for trip history
- [ ] Trip history dashboard
- [ ] Final testing and deployment

## 🔮 Future Enhancements

- User authentication and profile management.
- Personal trip history dashboard.
- Monthly and yearly fuel expense reports.
- Advanced vehicle cost comparison.
- Fuel price updates using external APIs.
- PDF trip expense reports.
- Cloud database integration.
- Mobile application support.

## 🎯 Project Objective

The main objective of FuelWise is to help users make smarter transportation decisions by comparing petrol and electric vehicle running costs. It aims to provide a simple, interactive, and data-driven platform for understanding vehicle expenses and managing travel costs.

## 👩‍💻 Developer

**Debadrita Kar**

B.Tech – Computer Science and Engineering

GitHub: [Debadritakar01](https://github.com/Debadritakar01)

---

*FuelWise – Calculate Smart. Compare Better. Travel Smarter.*