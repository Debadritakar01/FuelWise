# ⚡ FuelWise – Smart Fuel Intelligence

**Plan your trip. Save your fuel. Make smarter travel decisions.**

FuelWise is a smart journey planning and fuel cost estimation application that helps users calculate travel expenses for petrol and electric vehicles (EVs). It also compares running costs, saves trip records, and provides monthly analytics to help users understand their travel expenses.

---

## 🚀 Project Overview

FuelWise is a full-stack web application developed using React, FastAPI, Python and SQLite.

The application allows users to:
- Calculate petrol vehicle fuel consumption and trip costs.
- Calculate electric vehicle energy consumption and trip costs.
- Compare petrol and EV running costs.
- Identify the more economical vehicle option.
- Save calculated trips to a SQLite database.
- View, edit and delete saved trips.
- Search and filter trip history.
- Monitor monthly travel expenses through analytics and charts.

## ✨ Features

### 1. Trip Cost Calculator
- Select Petrol or Electric Vehicle (EV).
- Enter trip distance.
- Enter vehicle mileage or EV efficiency.
- Enter current petrol or electricity prices.
- Calculate estimated energy consumption.
- Calculate total trip cost.
- Calculate cost per kilometre.

### 2. Petrol vs EV Comparison
- Compare petrol and electric vehicle expenses.
- Calculate the cost difference.
- Identify the cheaper vehicle.
- Display comparison results using charts.

### 3. Save Trip History
- Save calculated trips to the SQLite database.
- Store vehicle type and trip details.
- Save petrol or electricity consumption information.
- Refresh trip history and analytics after successful saving.

### 4. Trip History Management
- View previously saved trips.
- View individual trip details.
- Edit existing trip records.
- Delete saved trips.
- Search trips using available trip information.
- Filter trips by vehicle type and date range.

### 5. Monthly Analytics Dashboard
- Display monthly travel statistics.
- Track total trips and total distance.
- Monitor total travel expenses.
- Compare petrol and EV expenses.
- Calculate average cost per kilometre.
- Visualize monthly data using Recharts.

### 6. Data Visualization
- Petrol vs EV cost comparison chart.
- Monthly expense charts.
- Travel analytics and statistics.
- Visual representation of trip history.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Frontend development server |
| JavaScript | Application logic |
| HTML5 | Structure |
| CSS3 | Styling and responsive design |
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
│   ├── requirements.txt
│   └── fuelwise.db
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
└── README.md
```

*Note: Adjust the structure to match the actual files in your repository.*

---

## ⚙️ Installation and Setup

### Prerequisites

Install the following before running the project:

- Python 3.10+
- Node.js and npm
- Git
- VS Code (recommended)

### 1. Clone the Repository

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

```text
http://127.0.0.1:8000
```

FastAPI Swagger Documentation:

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

---

## 🔗 API Endpoints

The backend provides REST APIs for trip calculations, comparisons, trip management and analytics.

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

The database stores trip information, including:

- Trip ID
- Vehicle type
- Distance travelled
- Mileage or EV efficiency
- Petrol or electricity price
- Energy consumption
- Total trip cost
- Cost per kilometre
- Trip creation date

---

## 📈 Future Enhancements

The following improvements can make FuelWise more powerful:

- [ ] Verify and finalize CSV export functionality.
- [ ] Complete testing of trip search and filters.
- [ ] Verify analytics updates after editing and deleting trips.
- [ ] Add improved input validation and error handling.
- [ ] Add user authentication and authorization.
- [ ] Add user-specific trip history.
- [ ] Add fuel price updates using an external API.
- [ ] Add route-based distance calculation using Maps API.
- [ ] Improve mobile responsiveness.
- [ ] Deploy the application online.

---

## 🎯 Project Objective

The main objective of FuelWise is to help users make cost-effective travel decisions by comparing conventional petrol vehicles with electric vehicles.

It provides a simple platform for estimating travel expenses, managing trip records and understanding monthly travel patterns through data visualization.

---

## 👩‍💻 Developer

**Debadrita Kar**

B.Tech – Computer Science and Engineering

GitHub: [Debadritakar01](https://github.com/Debadritakar01)

Project Repository: [FuelWise – Smart Fuel Intelligence](https://github.com/Debadritakar01/FuelWise)

---

## 📜 License

This project is developed for educational and academic purposes.