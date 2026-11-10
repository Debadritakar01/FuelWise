# 🚗 FuelWise – Smart Fuel Intelligence

**FuelWise** is a full-stack web application that helps users calculate petrol and electric vehicle (EV) running costs, compare vehicle expenses, manage trip history, and analyze travel expenses through an interactive analytics dashboard.

The application provides cost estimation, trip management, monthly analytics, savings insights, and downloadable trip reports.

**GitHub Repository:** https://github.com/Debadritakar01/FuelWise

---

## ✨ Features

### 1. Petrol and EV Cost Calculator
- Calculate petrol consumption based on distance, mileage, and petrol price.
- Calculate EV energy consumption based on distance, efficiency, and electricity price.
- Calculate total trip expenses.
- Display cost per kilometre.
- Validate user inputs and handle invalid values.

### 2. Petrol vs EV Comparison
- Compare petrol and EV running costs for the same distance.
- Calculate estimated savings.
- Identify the more economical vehicle.
- Visualize cost comparisons using charts.

### 3. Trip History Management
- Save calculated trips to SQLite.
- View all saved trips.
- View individual trip details.
- Edit existing trips.
- Delete saved trips.
- Automatically refresh trip history after successful updates.

### 4. Search, Filter and Sorting
- Search trips by ID, vehicle type, and distance.
- Filter trips by petrol or EV.
- Filter trips using start and end dates.
- Sort by newest and oldest trips.
- Sort by highest and lowest distance.
- Sort by highest and lowest trip cost.
- Clear all filters.

### 5. Interactive Dashboard Analytics
- Total number of trips.
- Total travel distance.
- Total travel expenses.
- Petrol expenditure.
- EV expenditure.
- Average cost per kilometre.
- Petrol and EV usage percentages.

### 6. Monthly Analytics and Visualizations
- Monthly expense analysis.
- Petrol vs EV expense comparison.
- Monthly travel-distance comparison.
- Monthly trip activity.
- Interactive charts using Recharts.
- Monthly summary table.
- Year and month selection filters.
- Loading, error, empty-data, and retry states.

### 7. FuelWise Savings Insights
- Compare petrol and EV running costs per kilometre.
- Estimate costs for the same travel distance.
- Calculate potential savings.
- Display savings percentages.
- Generate vehicle economy recommendations based on recorded data.

**Note:** Savings insights represent estimated running-cost comparisons, not guaranteed savings or total vehicle ownership costs.

### 8. CSV Export
- Export saved trip history.
- Export currently filtered and sorted trips.
- Include trip ID and vehicle type.
- Include distance and mileage/efficiency.
- Include fuel or energy consumption.
- Include total cost and cost per kilometre.
- Include trip creation date.
- Download Excel-compatible CSV files.

### 9. PDF Trip Reports
- Generate individual trip PDF reports.
- Download reports for saved trips.
- Use ReportLab for PDF generation.
- Display trip information and expense details.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Frontend tooling | Vite |
| Programming | JavaScript |
| Styling | HTML, CSS |
| Backend | Python |
| API Framework | FastAPI |
| Database | SQLite |
| ORM | SQLAlchemy |
| Data Visualization | Recharts |
| PDF Generation | ReportLab |
| API Testing | Swagger UI |
| Version Control | Git and GitHub |

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
│   ├── fuelwise.db
│   └── venv/
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── TripHistory.jsx
│   │   │   ├── TripHistory.css
│   │   │   ├── TripDetails.jsx
│   │   │   ├── EditTrip.jsx
│   │   │   ├── MonthlyAnalytics.jsx
│   │   │   ├── MonthlyAnalytics.css
│   │   │   └── CostComparisonChart.jsx
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

*The structure above represents the known project organization. Adjust filenames if your actual repository differs.*

---

## ⚙️ Installation and Setup

### Prerequisites

Install the following:

- Python 3.10 or later
- Node.js and npm
- Git
- Visual Studio Code

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

Activate it on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

If a requirements file is not available or incomplete, ensure the project dependencies include:

```bash
pip install fastapi uvicorn sqlalchemy pydantic reportlab
```

Start the backend:

```bash
python -m uvicorn main:app --reload
```

Backend URL:

http://127.0.0.1:8000

Swagger API documentation:

http://127.0.0.1:8000/docs

### 3. Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend URL:

http://localhost:5173

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Backend status |
| GET | `/health` | Health check |
| POST | `/api/trip/estimate` | Calculate trip cost |
| POST | `/api/compare` | Compare petrol and EV |
| POST | `/api/trips/save` | Save a trip |
| GET | `/api/trips` | Retrieve trip history |
| GET | `/api/trips/{trip_id}` | Retrieve individual trip |
| PUT | `/api/trips/{trip_id}` | Update trip |
| DELETE | `/api/trips/{trip_id}` | Delete trip |
| GET | `/api/analytics/monthly` | Monthly analytics |
| GET | `/api/trips/{trip_id}/pdf` | Download individual trip PDF |

### Monthly Analytics Filters

The monthly analytics API supports optional year and month filters.

```http
GET /api/analytics/monthly
```

Retrieve all monthly analytics.

```http
GET /api/analytics/monthly?year=2026
```

Retrieve analytics for a selected year.

```http
GET /api/analytics/monthly?year=2026&month=11
```

Retrieve analytics for a selected month and year.

Month values must be between 1 and 12.

---

## 🧮 Calculation Formulas

### Petrol Vehicle

Fuel consumed:

```text
Fuel Used = Distance / Mileage
```

Total cost:

```text
Total Cost = Fuel Used × Petrol Price
```

Cost per kilometre:

```text
Cost Per KM = Total Cost / Distance
```

### Electric Vehicle

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

### Example Calculation

| Parameter | Petrol | EV |
|---|---:|---:|
| Distance | 100 km | 100 km |
| Mileage / Efficiency | 45 km/L | 40 km/kWh |
| Energy Price | ₹105/L | ₹8/kWh |
| Energy Used | 2.22 L | 2.50 kWh |
| Total Cost | ₹233.33 | ₹20.00 |
| Cost per KM | ₹2.33 | ₹0.20 |

*Illustrative values only.*

---

## 🧪 Testing

Use FastAPI Swagger UI:

http://127.0.0.1:8000/docs

### Testing Checklist

- [ ] Petrol cost calculation.
- [ ] EV cost calculation.
- [ ] Petrol vs EV comparison.
- [ ] Invalid input validation.
- [ ] Save trip to SQLite.
- [ ] Retrieve saved trips.
- [ ] View individual trip details.
- [ ] Edit saved trips.
- [ ] Delete saved trips.
- [ ] Search and filter trip history.
- [ ] Verify dashboard analytics.
- [ ] Verify monthly analytics charts.
- [ ] Verify year and month filters.
- [ ] Export filtered trip history to CSV.
- [ ] Download petrol trip PDF.
- [ ] Download EV trip PDF.
- [ ] Verify error handling and empty states.
- [ ] Test responsive layouts.

---

## 📊 Development Progress

| Module | Status |
|---|---|
| React + Vite frontend | Implemented |
| FastAPI backend | Implemented |
| Petrol cost calculator | Implemented |
| EV cost calculator | Implemented |
| Petrol vs EV comparison | Implemented |
| Input validation | Implemented |
| SQLite integration | Implemented |
| Save and retrieve trips | Implemented |
| Edit and delete trips | Implemented |
| Trip details | Implemented |
| Search, filters and sorting | Implemented |
| Dashboard analytics | Implemented |
| Monthly analytics | Implemented |
| Expense and distance charts | Implemented |
| Monthly trip activity chart | Implemented |
| Year and month filters | Implemented in frontend; backend integration testing pending |
| Savings insights | Implemented; further validation pending |
| CSV export | Implemented |
| Individual PDF export | Implemented |
| Automated testing | Pending |
| Deployment | Pending |

---

## 🚀 Future Enhancements

The following features can make FuelWise more powerful:

1. Advanced monthly and yearly financial insights.
2. Highest and lowest spending month analysis.
3. More personalized spending recommendations.
4. Automated backend and frontend testing.
5. User authentication and personalized accounts.
6. Multiple vehicle management.
7. Fuel price API integration.
8. Google Maps and route optimization.
9. Nearby petrol stations and EV charging stations.
10. Fuel consumption prediction.
11. Production deployment.
12. Performance and security improvements.

---

## 🔐 Security and Configuration

- Validate user input on the backend.
- Keep database and environment configuration secure.
- Do not commit virtual environments or secret API keys.
- Configure production CORS with trusted frontend origins.
- Use environment variables for deployment settings.

---

## 👩‍💻 Author

**Debadrita Kar**

B.Tech – Computer Science and Engineering

GitHub: [@Debadritakar01](https://github.com/Debadritakar01)

**Project:** FuelWise – Smart Fuel Intelligence

---

## 📌 Conclusion

FuelWise is a full-stack smart fuel intelligence application designed to simplify vehicle expense calculations and travel cost analysis.

By combining React, FastAPI, SQLite, and interactive visualizations, the application provides a practical platform for managing trip expenses and comparing petrol and electric vehicle running costs.

**Plan smarter. Travel better. Save more with FuelWise!** 🚗⚡