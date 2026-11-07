# ⛽ FuelWise – Smart Fuel Intelligence

**FuelWise** is a smart vehicle fuel-management and trip-planning web application designed to help users calculate fuel consumption, estimate journey costs, compare Petrol and Electric Vehicles (EVs), and make economical travel decisions.

The application uses React.js for the frontend and Python FastAPI for backend calculations.

---

## 🚀 Project Overview

FuelWise aims to make vehicle travel more economical by providing useful information about fuel consumption, electricity consumption, trip expenses, and vehicle running costs.

Users can enter their vehicle details and journey information to receive calculated results and compare petrol-powered vehicles with electric vehicles.

### 🎯 Main Objectives

- Calculate petrol and electricity consumption.
- Estimate the total cost of a journey.
- Compare Petrol and EV running costs.
- Help users understand vehicle efficiency.
- Provide an interactive dashboard for trip analysis.
- Recommend economical travel options.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| Petrol Calculator | Calculates petrol consumption and trip cost. |
| EV Calculator | Calculates electricity consumption and trip cost. |
| Trip Cost Estimator | Estimates the total expense of a journey. |
| EV vs Petrol Comparison | Compares running costs of both vehicle types. |
| Cost Per KM | Calculates the running cost per kilometre. |
| Dashboard | Displays vehicle and trip information. |
| Trip History | Stores previous journey details (planned). |
| Route Planning | Compares alternative routes (planned). |
| Smart Recommendations | Suggests economical travel options (planned). |

---

## 🛠️ Technology Stack

### Frontend
- React.js
- Vite
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- FastAPI
- Uvicorn
- Pydantic

### Database (Planned)
- SQLite
- PostgreSQL (future enhancement)

### Data Visualization (Planned)
- Recharts / Chart.js

### Development Tools
- Visual Studio Code
- Git
- GitHub
- Postman / FastAPI Swagger UI

---

## 🏗️ Project Architecture

FuelWise follows a frontend-backend architecture.

```text
             USER
               |
               v
       REACT FRONTEND
          (Vite)
               |
               | HTTP Requests
               v
        FASTAPI BACKEND
               |
               v
       CALCULATION ENGINE
               |
          -------------
          |           |
          v           v
     PETROL CALC     EV CALC
          |           |
          ------------- 
               |
               v
       CALCULATED RESULTS
               |
               v
        REACT DASHBOARD
```

---

## 🧮 Calculation Logic

FuelWise uses mathematical formulas to calculate vehicle consumption and running costs.

### 1. Petrol Calculation

**Fuel Consumption:**

Fuel Used (Litres) = Distance (KM) / Mileage (KM/L)

**Total Cost:**

Total Cost = Fuel Used × Petrol Price

**Cost Per KM:**

Cost Per KM = Total Cost / Distance

Example:

- Distance: 100 KM
- Mileage: 45 KM/L
- Petrol Price: ₹105/L

Result:

- Fuel Used: 2.22 Litres
- Total Cost: ₹233.33
- Cost Per KM: ₹2.33

### 2. Electric Vehicle Calculation

**Energy Consumption:**

Energy Used (KWh) = Distance (KM) / Efficiency (KM/KWh)

**Total Cost:**

Total Cost = Energy Used × Electricity Price

**Cost Per KM:**

Cost Per KM = Total Cost / Distance

Example:

- Distance: 100 KM
- Efficiency: 40 KM/KWh
- Electricity Price: ₹8/KWh

Result:

- Energy Used: 2.5 KWh
- Total Cost: ₹20
- Cost Per KM: ₹0.20

### 3. EV vs Petrol Comparison

For the same 100 KM journey:

| Parameter | Petrol | Electric |
|---|---:|---:|
| Distance | 100 KM | 100 KM |
| Efficiency | 45 KM/L | 40 KM/KWh |
| Fuel/Energy Used | 2.22 L | 2.5 KWh |
| Unit Price | ₹105/L | ₹8/KWh |
| Total Cost | ₹233.33 | ₹20 |

**Estimated EV Savings: ₹213.33**

*Note: These are illustrative estimates based on the supplied fuel prices and vehicle efficiencies.*

---

## 📂 Project Structure

```text
FuelWise/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── VehicleForm.jsx
│   │   │   ├── TripForm.jsx
│   │   │   └── ResultCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Compare.jsx
│   │   │   └── TripHistory.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── services/
│   │   └── calculations.py
│   │
│   ├── test_calculations.py
│   └── requirements.txt
│
└── README.md
```

*The structure above represents the intended organization; some folders and files are planned for later development.*

---

## ⚙️ Installation and Setup

Follow these steps to run FuelWise locally.

### Prerequisites

Install the following software:

- Python
- Node.js and npm
- Visual Studio Code
- Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

```bash
cd FuelWise
```

### 2. Setup Frontend

Navigate to the frontend directory:

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

### 3. Setup Backend

Open another terminal and navigate to the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate the environment on Windows PowerShell:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install fastapi uvicorn pydantic
```

Start the FastAPI server:

```bash
python -m uvicorn main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

### 4. Access API Documentation

FastAPI provides interactive API documentation through Swagger UI.

```text
http://127.0.0.1:8000/docs
```

---

## 🔌 Backend API Endpoints

The following endpoints are part of the planned API design.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Check backend status |
| GET | `/health` | Health check |
| POST | `/api/trip/estimate` | Calculate individual trip cost |
| POST | `/api/compare` | Compare Petrol and EV costs |
| GET | `/api/trips` | Retrieve trip history (planned) |
| POST | `/api/route/compare` | Compare alternative routes (planned) |

### Example: Petrol Trip Request

```json
{
  "vehicle_type": "petrol",
  "distance": 100,
  "mileage": 45,
  "petrol_price": 105
}
```

### Example: EV Trip Request

```json
{
  "vehicle_type": "ev",
  "distance": 100,
  "efficiency": 40,
  "electricity_price": 8
}
```

### Example: EV vs Petrol Comparison Request

```json
{
  "distance": 100,
  "mileage": 45,
  "petrol_price": 105,
  "efficiency": 40,
  "electricity_price": 8
}
```

*These are the intended request formats. Verify the corresponding API route implementations in `main.py` before treating all endpoints as operational.*

---

## 🧪 Testing

The calculation engine can be tested using:

```bash
python test_calculations.py
```

### Verified Test Results

| Test Case | Expected Result | Status |
|---|---:|---|
| Petrol calculation (100 KM) | ₹233.33 | Passed |
| EV calculation (100 KM) | ₹20.00 | Passed |
| Petrol cost per KM | ₹2.33 | Passed |
| EV cost per KM | ₹0.20 | Passed |

Input validation is also included to reject zero or negative calculation values.

---

## 📈 Development Progress

- [x] Python virtual environment setup
- [x] FastAPI backend setup
- [x] Backend homepage API
- [x] Backend health-check API
- [x] Petrol calculation function
- [x] EV calculation function
- [x] Calculation testing
- [ ] Complete and verify trip estimation API
- [ ] Complete and verify EV vs Petrol comparison API
- [ ] React frontend integration
- [ ] Dashboard development
- [ ] Data visualization
- [ ] Database integration
- [ ] Trip history management
- [ ] Google Maps integration
- [ ] Smart recommendations

---

## 🔮 Future Enhancements

The following features are planned to make FuelWise more intelligent and useful.

1. **Database Integration:** Store vehicle information and previous journeys using SQLite or PostgreSQL.
2. **Interactive Dashboard:** Display trip expenses, vehicle efficiency, and consumption statistics using charts.
3. **Google Maps Integration:** Calculate route distances and compare alternative routes.
4. **Smart Recommendations:** Recommend economical travel options using rule-based logic.
5. **Fuel Price Integration:** Retrieve updated fuel prices through an external data source.
6. **Range Estimation:** Estimate the remaining travel range using fuel or battery information.
7. **Trip History:** Allow users to save and review previous journeys.
8. **AI-Based Analysis:** Explore intelligent fuel expense predictions and travel recommendations.

---

## 🎯 Project Goal

The ultimate goal of FuelWise is to develop an intelligent fuel and vehicle expense management platform that helps users understand their vehicle's efficiency, compare running costs, and plan more economical journeys.

---

## 👩‍💻 Developer

**Debadrita Kar**

B.Tech – Computer Science and Engineering

Siliguri Institute of Technology

---

*FuelWise – Make Every Journey More Economical! ⛽⚡*
