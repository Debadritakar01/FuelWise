# ⛽ FuelWise – Smart Fuel Intelligence

**Plan your trip. Save your fuel. Make smarter travel decisions.**

FuelWise is a smart fuel-management and trip-planning web application that helps users estimate journey expenses, calculate fuel and electricity consumption, compare Petrol and Electric Vehicles (EVs), and manage their previous trips.

The application is built using **React.js, Vite, Python FastAPI, SQLite, and SQLAlchemy**.

---

## 🚀 Project Overview

FuelWise aims to help users make economical travel decisions by providing accurate estimates of vehicle running costs.

Users can:
- Calculate petrol consumption and trip expenses.
- Calculate EV electricity consumption and charging costs.
- Compare Petrol and EV running costs.
- Visualize cost comparisons using interactive charts.
- Save trip calculations in an SQLite database.
- View complete details of previously saved trips.
- Delete saved trips.
- Edit existing trips (currently under development).

## ✨ Key Features

| Feature | Description | Status |
|---|---|---|
| Petrol Calculator | Calculates fuel consumption and journey cost | Completed |
| EV Calculator | Calculates electricity consumption and journey cost | Completed |
| Trip Cost Estimator | Estimates total trip expenses | Completed |
| Petrol vs EV Comparison | Compares running costs and savings | Completed |
| Cost Per KM | Calculates running cost per kilometre | Completed |
| Cost Comparison Chart | Visualizes Petrol vs EV costs | Completed |
| SQLite Database | Stores trip information permanently | Completed |
| Save Trip | Saves calculated trips to SQLite | Completed |
| Trip History | Displays previously saved trips | Completed |
| Individual Trip Details | Displays complete information about a saved trip | Completed |
| Delete Trip | Deletes saved trip records | Completed |
| Edit Saved Trip | Updates existing trip information and recalculates costs | In Progress |
| Search and Filter | Search and filter saved trips | Planned |
| Dashboard Analytics | Displays trip statistics and spending insights | Planned |
| PDF/CSV Export | Exports trip history | Planned |

## 🛠️ Technology Stack

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Recharts

### Backend
- Python
- FastAPI
- Uvicorn
- Pydantic
- SQLAlchemy

### Database
- SQLite

### Development Tools
- Visual Studio Code
- Git and GitHub
- FastAPI Swagger UI

## 🏗️ Project Architecture

FuelWise follows a client-server architecture.

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
       ---------------------
       |                   |
       v                   v
 CALCULATION ENGINE    API ROUTES
       |                   |
   -----------        -----------
   |         |        |         |
 PETROL     EV      TRIP      COMPARE
 CALC      CALC    MANAGEMENT
   |         |        |
   -----------        |
       |              v
       |          SQLAlchemy
       |              |
       |              v
       |          SQLite DB
       |              |
       ----------------
                |
                v
         CALCULATED DATA
                |
                v
         REACT DASHBOARD
```

## 🧮 Calculation Logic

### 1. Petrol Calculation

**Fuel consumption:**

Fuel Used (Litres) = Distance (KM) / Mileage (KM/L)

**Total Cost:**

Total Cost = Fuel Used × Petrol Price

**Cost Per KM:**

Cost Per KM = Total Cost / Distance

Example:

- Distance: 100 KM
- Mileage: 45 KM/L
- Petrol Price: ₹105/L

Results:

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

- Distance: 200 KM
- Efficiency: 8 KM/KWh
- Electricity Price: ₹8/KWh

Results:

- Energy Used: 25 KWh
- Total Cost: ₹200
- Cost Per KM: ₹1

### 3. Petrol vs EV Comparison

FuelWise compares the running costs of both vehicle types for the same journey.

| Parameter | Petrol | Electric |
|---|---:|---:|
| Distance | 100 KM | 100 KM |
| Efficiency | 45 KM/L | 40 KM/KWh |
| Fuel/Energy Used | 2.22 L | 2.5 KWh |
| Unit Price | ₹105/L | ₹8/KWh |
| Total Cost | ₹233.33 | ₹20 |

**Estimated EV Savings: ₹213.33**

*Note: These are illustrative calculations based on the given vehicle efficiency and energy prices.*

## 💾 Database Integration

FuelWise uses SQLite with SQLAlchemy ORM to store trip information.

Each saved trip contains:

- Trip ID
- Vehicle type
- Distance travelled
- Mileage or EV efficiency
- Petrol or electricity price
- Fuel consumed or electricity consumed
- Total trip cost
- Cost per kilometre
- Trip creation timestamp

### Database Operations

| Operation | API |
|---|---|
| Save a trip | POST |
| Retrieve trip history | GET |
| View individual trip | GET |
| Update saved trip | PUT (under development) |
| Delete saved trip | DELETE |

The database allows users to revisit their previously calculated trips without recalculating them.

## 🔌 Backend API Endpoints

FuelWise uses FastAPI to provide REST API endpoints.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Backend status |
| GET | `/health` | Health check |
| POST | `/api/trip/estimate` | Calculate individual trip cost |
| POST | `/api/compare` | Compare Petrol and EV costs |
| POST | `/api/trips/save` | Save a trip |
| GET | `/api/trips` | Retrieve saved trip history |
| GET | `/trips` | Retrieve simplified trip history |
| GET | `/api/trips/{trip_id}` | View individual trip details |
| PUT | `/api/trips/{trip_id}` | Update an existing trip (in progress) |
| DELETE | `/api/trips/{trip_id}` | Delete a saved trip |

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

### Example: Save Trip Request

```json
{
  "vehicle_type": "petrol",
  "distance": 100,
  "mileage": 45,
  "petrol_price": 105,
  "efficiency": null,
  "electricity_price": null
}
```

## 📂 Project Structure

```text
FuelWise/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── requirements.txt
│   │
│   └── services/
│       └── calculations.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── CostComparisonChart.jsx
│   │   │   ├── TripHistory.jsx
│   │   │   ├── TripDetails.jsx
│   │   │   └── TripHistory.css
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

*The structure represents the main project files; additional styling and configuration files may also be present.*

## ⚙️ Installation and Setup

### Prerequisites

Install the following:

- Python 3.10+
- Node.js and npm
- Visual Studio Code
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Debadritakar01/FuelWise.git

cd FuelWise
```

### 2. Setup Backend

Open a terminal:

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

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
python -m uvicorn main:app --reload
```

Backend URL:

`http://127.0.0.1:8000`

### 3. Setup Frontend

Open another terminal:

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

`http://localhost:5173`

### 4. Access Swagger Documentation

Open:

`http://127.0.0.1:8000/docs`

Use Swagger UI to test the available backend APIs.

## 🧪 Testing

FuelWise supports testing through FastAPI Swagger UI and frontend interactions.

Important test cases:

| Test Case | Expected Result |
|---|---|
| Petrol cost calculation | Correct fuel consumption and cost |
| EV cost calculation | Correct energy consumption and cost |
| Petrol vs EV comparison | Correct cost difference |
| Save trip | Trip stored in SQLite |
| Retrieve trip history | Saved trips displayed |
| Individual trip details | Complete trip information displayed |
| Invalid trip ID | HTTP 404 response |
| Delete trip | Existing trip removed |
| Update trip | Existing record updated without duplication (pending verification) |

## 📈 Development Progress

### Phase 1 – Backend Development
- [x] Python virtual environment setup
- [x] FastAPI backend setup
- [x] Home API
- [x] Health check API
- [x] Petrol calculation function
- [x] EV calculation function
- [x] Trip estimation API
- [x] Petrol vs EV comparison API

### Phase 2 – Frontend Development
- [x] React and Vite setup
- [x] Dashboard development
- [x] Petrol and EV calculation integration
- [x] Frontend and backend connection
- [x] Cost comparison chart using Recharts

### Phase 3 – Database Integration
- [x] SQLite integration
- [x] SQLAlchemy configuration
- [x] Trip database model
- [x] Save trip API
- [x] Retrieve trip history API
- [x] Individual trip details API
- [x] Delete saved trip API

### Phase 4 – Trip Management
- [x] Trip History page
- [x] View Details button
- [x] Individual trip details component
- [x] Petrol trip details
- [x] EV trip details
- [x] Duplicate individual-trip GET endpoint cleanup in local development
- [ ] PUT update trip API implementation and testing
- [ ] React Edit Trip form
- [ ] Connect Edit Trip form with backend

### Phase 5 – Future Development
- [ ] Improve Trip History UI
- [ ] Search and filter saved trips
- [ ] Dashboard analytics
- [ ] Export trip history to PDF/CSV
- [ ] Google Maps integration
- [ ] Smart travel recommendations
- [ ] Fuel price integration
- [ ] Application deployment

## 🔮 Future Enhancements

1. **Google Maps Integration:** Calculate route distances and help users plan journeys.
2. **Smart Recommendations:** Recommend economical travel options.
3. **Dashboard Analytics:** Display total trips, spending, and vehicle efficiency statistics.
4. **Search and Filter:** Find saved trips using dates and vehicle types.
5. **PDF/CSV Export:** Download trip history and expense reports.
6. **Fuel Price Integration:** Explore updated fuel price information.
7. **AI-Based Analysis:** Explore intelligent travel expense predictions and recommendations.
8. **Deployment:** Host the application for public access.

## 🎯 Project Goal

The ultimate goal of FuelWise is to build an intelligent vehicle expense and fuel-management platform that helps users understand vehicle efficiency, compare Petrol and EV running costs, manage trip history, and make more economical travel decisions.

## 👩‍💻 Developer

**Debadrita Kar**

B.Tech – Computer Science and Engineering  
Siliguri Institute of Technology

---

**FuelWise – Make Every Journey More Economical! ⛽⚡**