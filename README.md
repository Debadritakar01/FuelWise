# ⚡ FuelWise – Smart Fuel Intelligence

### Plan your trip. Save your fuel. Make smarter travel decisions.

FuelWise is a smart journey-planning and vehicle cost-comparison web application that helps users estimate trip expenses, calculate fuel or electricity consumption, and compare petrol and electric vehicle running costs.

The application provides a trip calculator, interactive cost-comparison charts, and SQLite-powered trip history, allowing users to save, view, and manage their previous journeys.

---

## 🚀 Key Features

### 1. Smart Trip Calculator
- Select vehicle type: Petrol or Electric Vehicle (EV).
- Enter trip distance.
- Enter petrol mileage or EV efficiency.
- Enter petrol or electricity price.
- Calculate estimated energy consumption.
- Display total trip cost and cost per kilometre.

### 2. Petrol vs Electric Vehicle Comparison
- Compare petrol and EV running costs for the same journey.
- Calculate total petrol and electricity expenses.
- Identify the cheaper vehicle option.
- Display the difference in trip costs.
- Visualize the comparison using interactive charts.

### 3. Interactive Cost Comparison Chart
- Built using Recharts.
- Displays petrol and EV trip costs.
- Provides a visual comparison of running expenses.
- Updates according to user-entered values.

### 4. SQLite Database Integration
- Uses SQLite for persistent trip storage.
- Saves calculated trip information.
- Stores vehicle type, distance, efficiency, energy prices and expenses.
- Retrieves previously saved journeys.

### 5. Trip History Management
- View all previously saved trips.
- Display total number of trips.
- Calculate total estimated trip expenses.
- Calculate total distance travelled.
- Refresh trip history.
- Delete saved trips.

### 6. Individual Trip Details
- View complete information about a saved trip.
- Display vehicle type and trip distance.
- Display petrol mileage or EV efficiency.
- Display petrol or electricity price.
- Show fuel or electricity consumed.
- Display total trip cost.
- Display cost per kilometre.
- Show trip creation date and time.
- Close the trip details modal.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Frontend development server |
| HTML5 | Application structure |
| CSS3 | Styling and responsive design |
| JavaScript | Frontend logic |
| Python | Backend programming |
| FastAPI | REST API development |
| SQLite | Database |
| SQLAlchemy | Database ORM |
| Recharts | Data visualization |
| Fetch API | Frontend-backend communication |
| Git & GitHub | Version control |

---

## 🏗️ Project Architecture

FuelWise follows a frontend-backend architecture.

1. **Frontend:** React collects user inputs and displays results.
2. **Backend:** FastAPI receives requests and performs calculations.
3. **Database:** SQLite stores saved trip records.
4. **Visualization:** Recharts displays petrol and EV cost comparisons.

---

## 📂 Project Structure

```text
FuelWise/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── services/
│   │   └── calculations.py
│   ├── requirements.txt
│   └── fuelwise.db
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── CostComparisonChart.jsx
│   │   │   ├── TripHistory.jsx
│   │   │   ├── TripHistory.css
│   │   │   ├── TripDetails.jsx
│   │   │   └── TripDetails.css
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

---

## 🧮 Calculation Logic

### Petrol Vehicle

**Fuel consumed:**

```text
Fuel Used = Distance / Mileage
```

**Total trip cost:**

```text
Total Cost = Fuel Used × Petrol Price
```

**Cost per kilometre:**

```text
Cost Per KM = Total Cost / Distance
```

### Electric Vehicle

**Electricity consumed:**

```text
Energy Used = Distance / EV Efficiency
```

**Total trip cost:**

```text
Total Cost = Energy Used × Electricity Price
```

**Cost per kilometre:**

```text
Cost Per KM = Total Cost / Distance
```

### Example Comparison

| Parameter | Petrol | Electric |
|---|---:|---:|
| Distance | 100 km | 100 km |
| Efficiency | 45 km/L | 40 km/kWh |
| Energy Price | ₹105/L | ₹8/kWh |
| Energy Consumed | 2.22 L | 2.50 kWh |
| Estimated Cost | ₹233.33 | ₹20.00 |

*Illustrative values only. Actual costs depend on user-provided inputs.*

---

## 🔗 Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check backend status |
| POST | `/api/trip/estimate` | Calculate individual trip cost |
| POST | `/api/compare` | Compare petrol and EV costs |
| POST | `/api/trips/save` | Save a calculated trip |
| GET | `/api/trips` | Retrieve all saved trips |
| GET | `/api/trips/{trip_id}` | Retrieve individual trip details |
| DELETE | `/api/trips/{trip_id}` | Delete a saved trip |

---

## ⚙️ Installation and Setup

### Prerequisites

Install the following:

- Python 3
- Node.js and npm
- Visual Studio Code
- Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd FuelWise
```

### 2. Backend Setup

Open the terminal:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the environment on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the backend:

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

Open the local URL provided by Vite, usually:

```text
http://localhost:5173
```

---

## 🧪 Current Development Progress

| Feature | Status |
|---|---|
| React + Vite setup | Completed |
| FastAPI backend setup | Completed |
| Petrol cost calculation | Completed |
| EV cost calculation | Completed |
| Trip estimation API | Completed |
| Petrol vs EV comparison API | Completed |
| React frontend integration | Completed |
| Cost comparison chart | Completed |
| SQLite integration | Implemented |
| Save trip functionality | Implemented |
| Trip history page | Implemented |
| Refresh trip history | Implemented |
| Delete saved trips | Implemented |
| Individual trip details API | Implemented |
| TripDetails React component | Implemented |
| View Details integration | Implemented |
| Full database workflow testing | Pending verification |

---

## 🔮 Future Enhancements

The following features are planned for upcoming development phases:

- Edit saved trip records.
- User authentication and personalized dashboards.
- Advanced trip expense analytics.
- Monthly and yearly expense reports.
- Fuel expense prediction.
- Smart fuel-saving recommendations.
- Google Maps integration.
- Route optimization and distance estimation.
- Nearby petrol station and EV charging station suggestions.
- Live fuel-price integration.
- AI-powered travel assistance.
- Application deployment.

---

## 🎯 Project Objective

The main objective of FuelWise is to help users make smarter and more economical travel decisions by providing accurate trip-cost estimates, petrol and EV comparisons, and a convenient way to manage previous journey records.

FuelWise aims to evolve from a basic trip calculator into an intelligent fuel and journey management platform.

---

## 👩‍💻 Developer

**Debadrita Kar**

B.Tech – Computer Science and Engineering

GitHub: [Debadritakar01](https://github.com/Debadritakar01)

---

**FuelWise – Smart Fuel Intelligence**

*Plan your trip. Save your fuel. Travel smarter.* ⚡
