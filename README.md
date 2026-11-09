# ⚡ FuelWise – Smart Fuel Intelligence

**Plan your trip. Save your fuel. Make smarter travel decisions.**

FuelWise is a full-stack smart journey planning and fuel cost estimation application that helps users calculate and compare travel expenses for petrol and electric vehicles (EVs).

It allows users to manage trip records, analyze monthly expenses, visualize travel patterns, and estimate potential savings by comparing petrol and EV running costs.

---

## 🚀 Project Overview

FuelWise is developed using React.js, Vite, Python, FastAPI and SQLite.

The application provides:

- Petrol and EV trip cost calculations.
- Petrol vs EV cost comparison.
- Trip history management.
- Search and filter functionality.
- Monthly expense and distance analytics.
- Year and month-based analytics filters.
- Petrol and EV savings analysis.
- Interactive charts and smart recommendations.
- CSV trip-history export.

---

## ✨ Features

### 1. Trip Cost Calculator

- Select Petrol or Electric Vehicle (EV).
- Enter trip distance.
- Enter vehicle mileage or EV efficiency.
- Enter petrol or electricity prices.
- Calculate fuel or electricity consumption.
- Calculate total trip cost.
- Calculate cost per kilometre.

### 2. Petrol vs EV Comparison

- Compare petrol and EV running costs.
- Calculate cost differences.
- Identify the more economical vehicle.
- Display comparison results using charts.

### 3. Trip History Management

- Save calculated trips in SQLite.
- View previously saved trips.
- View individual trip details.
- Edit existing trip records.
- Delete saved trips.
- Search trips using available trip information.
- Filter trips by vehicle type.
- Filter trips by date range.
- Export trip history as CSV.

### 4. Monthly Analytics Dashboard

- Display monthly travel statistics.
- Track total trips and total distance.
- Monitor petrol and EV expenses.
- Compare monthly expenses.
- Compare petrol and EV travel distances.
- Visualize monthly trip activity.
- Display monthly travel summary tables.

### 5. Year and Month Filters

- Select a particular year.
- Filter analytics by January to December.
- View all months of a selected year.
- Reset filters.
- Automatically update analytics based on selected filters.
- Handle periods with no recorded trips.

### 6. FuelWise Savings Insights

An intelligent expense analysis feature that compares petrol and EV running costs using saved trip records.

Features include:

- Petrol cost per kilometre.
- EV cost per kilometre.
- Estimated petrol cost over the comparison distance.
- Estimated EV cost over the comparison distance.
- Potential EV savings.
- Savings percentage.
- Smart recommendations based on recorded travel data.

The savings calculation uses separate petrol and EV travel distances to calculate their respective average running costs.

### 7. Data Visualization

Interactive charts using Recharts:

- Petrol vs EV cost comparison.
- Monthly expense comparison.
- Monthly distance comparison.
- Monthly trip activity.
- Travel expense analytics.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Frontend development server |
| JavaScript | Application logic |
| HTML5 | Structure |
| CSS3 | Styling |
| Python | Backend programming |
| FastAPI | REST API development |
| SQLite | Database |
| SQLAlchemy | Database ORM |
| Recharts | Data visualization |
| Git & GitHub | Version control |

---

## 📂 Project Structure

```text
FuelWise/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   ├── schemas.py
│   ├── services/
│   │   └── calculations.py
│   ├── requirements.txt
│   └── venv/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CostComparisonChart.jsx
│   │   │   ├── TripHistory.jsx
│   │   │   ├── TripDetails.jsx
│   │   │   ├── EditTrip.jsx
│   │   │   └── MonthlyAnalytics.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

*The structure above shows the main project files; additional components and configuration files may exist.*

---

## ⚙️ Installation and Setup

### Prerequisites

Install the following:

- Python 3.10+
- Node.js and npm
- Git
- VS Code (recommended)

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

Activate the virtual environment.

**Windows:**

```bash
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

http://127.0.0.1:8000

FastAPI Swagger Documentation:

http://127.0.0.1:8000/docs

### 3. Frontend Setup

Open another terminal and navigate to the frontend directory:

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

http://localhost:5173

---

## 🔗 API Endpoints

The backend provides REST APIs for calculations, trip management and monthly analytics.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Backend welcome message |
| GET | `/health` | Backend health check |
| POST | `/api/trip/estimate` | Calculate individual trip cost |
| POST | `/api/compare` | Compare petrol and EV costs |
| POST | `/api/trips/save` | Save a trip |
| GET | `/api/trips` | Retrieve saved trips |
| GET | `/api/trips/{trip_id}` | Retrieve individual trip |
| PUT | `/api/trips/{trip_id}` | Update an existing trip |
| DELETE | `/api/trips/{trip_id}` | Delete a trip |
| GET | `/api/analytics/monthly` | Retrieve monthly analytics |

---

## 📊 Example Calculations

### Petrol Vehicle

| Parameter | Value |
|---|---:|
| Distance | 100 km |
| Mileage | 45 km/L |
| Petrol Price | ₹105/L |
| Fuel Required | 2.22 L |
| Total Cost | ₹233.33 |
| Cost per KM | ₹2.33 |

### Electric Vehicle

| Parameter | Value |
|---|---:|
| Distance | 100 km |
| Efficiency | 40 km/kWh |
| Electricity Price | ₹8/kWh |
| Energy Required | 2.50 kWh |
| Total Cost | ₹20.00 |
| Cost per KM | ₹0.20 |

*These are illustrative calculations using the given inputs.*

---

## 🗄️ Database

FuelWise uses SQLite with SQLAlchemy for database operations.

The database stores:

- Trip ID
- Vehicle type
- Distance travelled
- Mileage or EV efficiency
- Petrol or electricity price
- Fuel or electricity consumption
- Total trip cost
- Cost per kilometre
- Trip creation date

---

## 🔮 Future Enhancements

The following features are planned for upcoming development:

- [ ] Step 9: PDF trip report generation.
- [ ] Add downloadable individual trip reports.
- [ ] Improve input validation and error handling.
- [ ] Add user authentication and authorization.
- [ ] Implement user-specific trip history.
- [ ] Integrate real-time fuel price updates.
- [ ] Add route-based distance calculation using Maps API.
- [ ] Improve mobile responsiveness.
- [ ] Perform comprehensive frontend and backend testing.
- [ ] Deploy the application online.
- [ ] Final GitHub documentation and project cleanup.

---

## 🎯 Project Objective

The main objective of FuelWise is to help users make cost-effective and informed travel decisions by comparing conventional petrol vehicles with electric vehicles.

It provides a platform for estimating travel expenses, managing trip records, analyzing monthly travel patterns and understanding the potential financial benefits of electric vehicle usage.

---

## 👩‍💻 Developer

**Debadrita Kar**

B.Tech – Computer Science and Engineering

GitHub: [Debadritakar01](https://github.com/Debadritakar01)

Project Repository: [FuelWise – Smart Fuel Intelligence](https://github.com/Debadritakar01/FuelWise)

---

## 📜 License

This project is developed for educational and academic purposes.