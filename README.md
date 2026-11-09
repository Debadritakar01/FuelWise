# FuelWise – Smart Fuel Intelligence 🚗⚡

FuelWise is a smart fuel and trip cost management application that helps users calculate petrol and electric vehicle running costs, compare energy expenses, and track their previous trips.

The application provides cost estimates, vehicle comparisons, trip history management, analytics and downloadable trip reports.

## 🚀 Features

### 1. Petrol Trip Cost Calculator
- Calculate petrol consumption based on distance and mileage.
- Calculate total petrol expenses.
- Display running cost per kilometre.

### 2. Electric Vehicle Cost Calculator
- Calculate electricity consumption in kWh.
- Estimate EV charging expenses.
- Display EV running cost per kilometre.

### 3. Petrol vs EV Comparison
- Compare petrol and EV running costs.
- Calculate potential savings.
- Recommend the more economical vehicle for a given journey.

### 4. Trip Management
- Save calculated trips in SQLite.
- View complete trip history.
- View individual trip details.
- Edit existing trips.
- Delete saved trips.

### 5. Dashboard Analytics
- Total number of trips.
- Total distance travelled.
- Total trip expenses.
- Petrol and EV expense breakdown.
- Average cost per kilometre.
- Monthly expense analytics.
- Interactive charts using Recharts.

### 6. PDF Reports
- Generate downloadable trip reports.
- Display trip details and calculated expenses in PDF format.

### 7. User Experience
- Responsive React interface.
- Loading states during API operations.
- Input validation.
- API error handling.
- Search and filter trip history.

### 8. Backend Validation
- Positive-number validation using Pydantic.
- Distance and vehicle-efficiency validation.
- Petrol and EV-specific input validation.
- API request validation through FastAPI.

> Validation development is ongoing. The valid petrol estimate has passed Swagger testing; the remaining validation cases are still being tested.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Frontend build tool |
| JavaScript | Application logic |
| HTML5 | Page structure |
| CSS3 | Styling and responsive design |
| Python | Backend programming |
| FastAPI | REST API development |
| SQLite | Database |
| SQLAlchemy | Database ORM |
| Pydantic | Request validation |
| Recharts | Data visualization |
| ReportLab | PDF report generation |
| Git & GitHub | Version control |

---

## 📂 Project Structure

```text
FuelWise/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TripHistory.jsx
│   │   │   ├── CostComparisonChart.jsx
│   │   │   └── ...
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── index.html
│
├── backend/
│   ├── services/
│   │   └── calculations.py
│   │
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── fuelwise.db
│   └── requirements.txt
│
└── README.md
```

*The structure above represents the main application files; additional files may exist in your repository.*

---

## ⚙️ Installation and Setup

### Prerequisites

Install the following:

- Python 3.10+
- Node.js and npm
- Visual Studio Code
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Debadritakar01/FuelWise.git
```

```bash
cd FuelWise
```

### 2. Start the backend

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

Start FastAPI:

```bash
uvicorn main:app --reload
```

Backend URL:

http://127.0.0.1:8000

Swagger API documentation:

http://127.0.0.1:8000/docs

### 3. Start the frontend

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

http://localhost:5173

---

## 🔌 API Endpoints

### Trip Calculation

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/trip/estimate` | Calculate individual trip cost |
| POST | `/api/compare` | Compare petrol and EV costs |

### Trip Management

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/trips/save` | Save a calculated trip |
| GET | `/api/trips` | Retrieve saved trips |
| GET | `/trips` | Alternate trip listing |
| GET | `/api/trips/{trip_id}` | Retrieve individual trip |
| PUT | `/api/trips/{trip_id}` | Update an existing trip |
| DELETE | `/api/trips/{trip_id}` | Delete a saved trip |

### System

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API welcome message |
| GET | `/health` | Backend health check |

Additional analytics and PDF report functionality is also included in the project.

---

## 🧮 Calculation Logic

### Petrol Vehicle

**Fuel consumed:**

```text
Fuel Used = Distance / Mileage
```

**Total petrol cost:**

```text
Total Cost = Fuel Used × Petrol Price
```

**Cost per kilometre:**

```text
Cost per KM = Total Cost / Distance
```

### Electric Vehicle

**Electricity consumed:**

```text
Energy Used = Distance / EV Efficiency
```

**Total electricity cost:**

```text
Total Cost = Energy Used × Electricity Price
```

**Cost per kilometre:**

```text
Cost per KM = Total Cost / Distance
```

### Example Calculation

Assumptions:

| Parameter | Petrol | EV |
|---|---:|---:|
| Distance | 100 km | 100 km |
| Mileage / Efficiency | 45 km/L | 40 km/kWh |
| Energy price | ₹105/L | ₹8/kWh |
| Energy consumed | 2.22 L | 2.5 kWh |
| Total cost | ₹233.33 | ₹20 |
| Cost per km | ₹2.33 | ₹0.20 |

**Estimated EV saving: ₹213.33 for 100 km.**

*These are illustrative running-cost estimates, not guaranteed real-world expenses.*

---

## 🧪 Testing

Backend APIs can be tested using FastAPI Swagger UI.

http://127.0.0.1:8000/docs

### Verified test

**POST `/api/trip/estimate`**

Request:

```json
{
  "vehicle_type": "petrol",
  "distance": 100,
  "mileage": 45,
  "petrol_price": 105
}
```

Response:

```json
{
  "vehicle_type": "Petrol",
  "distance_km": 100,
  "fuel_used_litres": 2.22,
  "total_cost": 233.33,
  "cost_per_km": 2.33
}
```

Status: `200 OK`

Additional validation tests include zero distance, missing mileage, invalid vehicle type and valid EV input.

---

## 🔮 Future Enhancements

- User registration and authentication.
- Live petrol and diesel price integration.
- Google Maps integration.
- Route-based fuel cost estimation.
- Smart refuelling recommendations.
- AI-powered fuel-saving suggestions.
- Vehicle mileage health monitoring.
- Advanced fuel consumption prediction.
- PostgreSQL migration.
- Cloud deployment.
- Mobile application.

---

## 👩‍💻 Developer

**Debadrita Kar**

GitHub: https://github.com/Debadritakar01

Project Repository: https://github.com/Debadritakar01/FuelWise

---

## 📄 License

This project is developed for educational and academic purposes.

---

**FuelWise – Predict. Compare. Optimize. Save.** 🚗⚡