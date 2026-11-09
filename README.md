# ⚡ FuelWise – Smart Fuel Intelligence

FuelWise is a web-based smart trip planning and vehicle expense analytics application. It helps users calculate petrol and electric vehicle (EV) running costs, compare vehicle expenses, manage trip history, and analyze travel expenses through interactive dashboards.

The main objective is to help users make smarter and more economical travel decisions.

## 🚀 Features

### 1. Trip Cost Calculator
- Calculate petrol consumption based on distance, mileage, and petrol price.
- Calculate EV energy consumption based on distance, efficiency, and electricity price.
- Display estimated fuel or electricity consumption.
- Calculate total trip cost.
- Calculate cost per kilometre.
- Support both petrol and electric vehicles.

### 2. Petrol vs EV Comparison
- Compare petrol and EV running costs for the same distance.
- Calculate potential savings.
- Identify the cheaper vehicle option.
- Display comparison results using Recharts visualizations.

### 3. Trip History Management
- Save calculated trips to SQLite.
- View previously saved trips.
- View individual trip details.
- Edit existing trips.
- Delete saved trips.
- Search trips.
- Filter trips by vehicle type and date.
- Refresh trip history after successfully saving a new trip.

### 4. Monthly Analytics Dashboard
- Display total trips.
- Calculate total travel distance.
- Track total expenses.
- Separate petrol and EV expenses.
- Analyze monthly travel activity.
- Compare petrol and EV expenses.
- Compare petrol and EV travel distances.
- Display interactive charts using Recharts.
- View monthly analytics in a summary table.
- Filter analytics by year and month.

### 5. Savings Insights
- Analyze petrol and EV running expenses.
- Display potential savings from EV usage.
- Compare cost per kilometre.
- Provide cost-based insights and recommendations.

### 6. Input Validation and Error Handling
- Reject empty input values.
- Reject zero and negative values.
- Validate trip distance.
- Validate petrol mileage.
- Validate petrol price.
- Validate EV efficiency.
- Validate electricity price.
- Validate inputs before sending API requests.
- Use reusable API response handling.
- Handle unsuccessful API responses.
- Display user-friendly error messages.
- Handle invalid server responses.

### 7. Loading States
- Display calculation progress.
- Display trip-saving progress.
- Display comparison progress.
- Prevent repeated submissions while requests are running.

*Independent loading-state implementation and final testing are in progress.*

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Build Tool | Vite |
| Programming Language | JavaScript |
| Styling | HTML, CSS |
| Backend | Python, FastAPI |
| Database | SQLite |
| ORM | SQLAlchemy |
| Data Visualization | Recharts |
| API Testing | FastAPI Swagger UI |
| Version Control | Git and GitHub |

## 📂 Project Structure

```text
FuelWise/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models/
│   │   └── ...
│   ├── services/
│   │   └── calculations.py
│   ├── requirements.txt
│   └── fuelwise.db
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TripHistory.jsx
│   │   │   ├── CostComparisonChart.jsx
│   │   │   ├── MonthlyAnalytics.jsx
│   │   │   ├── TripDetails.jsx
│   │   │   └── EditTrip.jsx
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

*The structure is representative; adjust filenames to match the current repository.*

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Backend status |
| GET | `/health` | Health check |
| POST | `/api/trip/estimate` | Calculate individual trip |
| POST | `/api/compare` | Compare petrol and EV |
| POST | `/api/trips/save` | Save trip |
| GET | `/api/trips` | Retrieve trip history |
| GET | `/api/trips/{trip_id}` | View trip details |
| PUT | `/api/trips/{trip_id}` | Update saved trip |
| DELETE | `/api/trips/{trip_id}` | Delete saved trip |
| GET | `/api/analytics/monthly` | Retrieve monthly analytics |

Verify the exact endpoint definitions in the backend before publishing API changes.

## 🧮 Calculation Formulas

### Petrol Vehicle

Fuel consumed:

`Fuel Used = Distance / Mileage`

Total cost:

`Total Cost = Fuel Used × Petrol Price`

### Electric Vehicle

Electricity consumed:

`Energy Used = Distance / EV Efficiency`

Total cost:

`Total Cost = Energy Used × Electricity Price`

### Cost per Kilometre

`Cost per KM = Total Trip Cost / Distance`

### Example Calculation

| Parameter | Petrol | EV |
|---|---:|---:|
| Distance | 100 km | 100 km |
| Mileage / Efficiency | 45 km/L | 40 km/kWh |
| Energy price | ₹105/L | ₹8/kWh |
| Energy consumed | 2.22 L | 2.5 kWh |
| Total cost | ₹233.33 | ₹20 |
| Cost per km | ₹2.33 | ₹0.20 |

**Estimated EV savings: ₹213.33**

These are illustrative calculations based on the entered values. Actual running costs may vary.

## 💻 Running the Project Locally

### Prerequisites

- Python
- Node.js and npm
- Visual Studio Code
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Debadritakar01/FuelWise.git

cd FuelWise
```

### 2. Start the Backend

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

Start FastAPI:

```bash
python -m uvicorn main:app --reload
```

Backend:

`http://127.0.0.1:8000`

Swagger documentation:

`http://127.0.0.1:8000/docs`

### 3. Start the Frontend

Open another terminal:

```bash
cd frontend

npm install

npm run dev
```

Frontend:

`http://localhost:5173`

## 🧪 Testing Checklist

### Trip Calculator
- [ ] Calculate a valid petrol trip.
- [ ] Calculate a valid EV trip.
- [ ] Verify fuel and electricity consumption.
- [ ] Verify total trip cost.
- [ ] Verify cost per kilometre.

### Input Validation
- [x] Reject zero distance.
- [x] Reject negative distance.
- [x] Reject empty values.
- [x] Validate petrol mileage.
- [x] Validate petrol price.
- [x] Validate EV efficiency.
- [x] Validate electricity price.

### API Error Handling
- [x] Implement reusable API response handler.
- [x] Handle unsuccessful API responses.
- [x] Display readable error messages.
- [ ] Verify backend connection failure scenarios.
- [ ] Verify invalid server response scenarios.

### Trip History
- [ ] Verify trip saving.
- [ ] Verify trip history refresh.
- [ ] Verify trip details.
- [ ] Verify editing trips.
- [ ] Verify deleting trips.
- [ ] Verify search and filters.

### Analytics
- [ ] Verify monthly expense calculations.
- [ ] Verify petrol and EV expense separation.
- [ ] Verify analytics charts.
- [ ] Verify year and month filters.
- [ ] Verify CSV export.

### Loading States
- [ ] Verify calculation loading indicator.
- [ ] Verify comparison loading indicator.
- [ ] Verify trip-saving loading indicator.
- [ ] Verify repeated submissions are prevented.

## 📈 Development Progress

| Module | Status |
|---|---|
| React + Vite frontend | Completed |
| FastAPI backend | Completed |
| Petrol calculation | Completed |
| EV calculation | Completed |
| Petrol vs EV comparison | Completed |
| SQLite integration | Completed |
| Trip CRUD operations | Implemented |
| Trip history search and filters | Implemented |
| Monthly analytics | Implemented |
| Recharts visualizations | Implemented |
| Savings insights | Implemented |
| Input validation | Implemented |
| Reusable API error handling | Implemented |
| User-friendly error messages | Implemented |
| Independent loading states | In progress |
| Final application testing | Pending |
| Deployment | Pending |

## 🔮 Future Enhancements

Potential improvements for future development:

- PDF trip and analytics reports.
- User authentication and personalized accounts.
- Vehicle profile management.
- Google Maps integration.
- Route distance and cost comparison.
- Nearby petrol pumps and EV charging stations.
- Live fuel-price integration.
- Advanced fuel expense prediction.
- AI-powered travel recommendations.
- Production deployment.

## 👩‍💻 Developer

**Debadrita Kar**

GitHub: https://github.com/Debadritakar01

Project Repository: https://github.com/Debadritakar01/FuelWise

---

**FuelWise – Smart Fuel Intelligence**

*Plan your trip. Compare running costs. Make smarter travel decisions.*