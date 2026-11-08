# ⚡ FuelWise – Smart Fuel Intelligence

### Plan Your Trip. Save Your Fuel.

FuelWise is a smart journey planning and fuel management web application designed to help users calculate travel expenses, compare petrol and electric vehicles, manage previous journeys, and analyze monthly travel expenditure.

The application combines trip cost estimation, vehicle comparison, SQLite-based trip management, interactive dashboards, monthly analytics, and CSV report generation.

---

## 🚀 Project Overview

FuelWise helps users answer important questions:

- How much will a journey cost?
- How much fuel or electricity will be consumed?
- Is a petrol vehicle or an electric vehicle more economical?
- How much have I spent on previous journeys?
- How does my monthly travel expenditure change?
- Which vehicle type accounts for more travel distance and expenses?

---

## ✨ Features

### 1. Smart Trip Calculator

- Calculate estimated trip costs.
- Supports Petrol and Electric Vehicles (EV).
- Calculate fuel or electricity consumption.
- Calculate cost per kilometre.
- Display estimated journey expenses.

### 2. Petrol vs EV Comparison

- Compare petrol and electric vehicle running costs.
- Compare estimated energy consumption.
- Display cost differences.
- Visualize vehicle comparisons using charts.

### 3. Interactive Dashboard

- Display trip calculation results.
- Present vehicle cost comparisons.
- Provide visual insights through charts.
- Show important journey statistics.

### 4. SQLite Database Integration

- Store saved trip records permanently.
- Retrieve previously saved journeys.
- Maintain trip history using SQLite.
- Perform database operations using SQLAlchemy.

### 5. Trip History Management

Users can:

- View all previously saved trips.
- View individual trip details.
- Edit saved trip information.
- Delete unwanted trips.
- Refresh trip records.
- Automatically update the displayed history after successful operations.

### 6. Individual Trip Details

Display complete information about a selected journey:

- Trip ID
- Vehicle type
- Distance travelled
- Mileage or EV efficiency
- Fuel or energy consumed
- Total estimated cost
- Cost per kilometre
- Trip creation date

### 7. Search, Filter and Sort Trips

- Search trips by Trip ID.
- Search by vehicle type.
- Search by distance.
- Filter petrol and electric vehicle trips.
- Filter trips using start and end dates.
- Sort by newest first or oldest first.
- Sort by highest or lowest distance.
- Sort by highest or lowest cost.
- Clear all filters and sorting options.
- Display matching trip counts.

### 8. FuelWise Dashboard Analytics

The analytics dashboard provides:

- Total saved trips.
- Total distance travelled.
- Total estimated expenditure.
- Petrol expenditure.
- EV expenditure.
- Average cost per kilometre.
- Petrol vs EV usage statistics.
- Vehicle usage percentage progress bars.

### 9. Monthly Trip and Expense Analytics

Monthly analytics help users understand their travel patterns and expenses.

Features include:

- Filter records by month.
- Filter records by year.
- Reset monthly filters.
- Monthly petrol expenditure.
- Monthly EV expenditure.
- Total monthly expenses.
- Number of trips completed each month.
- Petrol vs EV expense comparison chart.
- Petrol vs EV distance comparison chart.
- Monthly trip activity visualization.
- Monthly expense summary table.
- Chronological monthly records.

### 10. CSV Trip History Export

Users can download their saved journey records in CSV format.

The exported report includes:

- Trip ID
- Vehicle type
- Distance
- Mileage / efficiency
- Fuel / energy consumed
- Total cost (INR)
- Cost per kilometre
- Creation date

Additional functionality:

- Automatically generates a dated filename.
- Supports Excel and Google Sheets.
- Handles commas and quotation marks in CSV values.
- Exports all saved trips, regardless of active search filters.

### 11. Automatic Analytics Refresh

FuelWise uses a custom browser event named `tripsUpdated` to refresh Monthly Analytics.

The current implementation includes:

- Analytics refresh after successful trip deletion.
- Analytics refresh after successful trip editing and history reload.
- Event listener cleanup when the Monthly Analytics component unmounts.

**Pending verification:** Automatic analytics refresh immediately after saving a new trip must be checked against the actual database-save request.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive design |
| JavaScript | Application logic |
| React.js | Frontend development |
| Vite | Frontend development server |
| Python | Backend programming |
| FastAPI | REST API development |
| SQLite | Database management |
| SQLAlchemy | Database ORM |
| Recharts | Data visualization |
| Fetch API | Frontend-backend communication |
| Git & GitHub | Version control |

---

## 📂 Project Structure

```text
FuelWise/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── requirements.txt
│   └── venv/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TripHistory.jsx
│   │   │   ├── TripHistory.css
│   │   │   ├── TripDetails.jsx
│   │   │   ├── EditTrip.jsx
│   │   │   ├── MonthlyAnalytics.jsx
│   │   │   ├── MonthlyAnalytics.css
│   │   │   ├── CostComparisonChart.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

*Note: This is the documented project structure. Additional files may exist in the actual application.*

---

## ⚙️ Installation and Setup

### Prerequisites

Install the following:

- Python 3.x
- Node.js and npm
- Visual Studio Code
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Debadritakar01/FuelWise.git

cd FuelWise
```

### 2. Backend Setup

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

Start the FastAPI backend:

```bash
python -m uvicorn main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

FastAPI Swagger documentation:

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

Install Recharts if it is not already included:

```bash
npm install recharts
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

## 📊 Dashboard Analytics

FuelWise provides two levels of analytics.

### Overall Analytics

- Total saved trips.
- Total distance.
- Petrol expenditure.
- EV expenditure.
- Average cost per kilometre.
- Vehicle usage percentages.

### Monthly Analytics

- Monthly trip count.
- Petrol and EV expenditure.
- Petrol and EV distance.
- Monthly expense comparison.
- Monthly distance comparison.
- Monthly trip activity.
- Monthly expense summary.

Monthly analytics are retrieved from the FastAPI backend through the monthly analytics endpoint.

---

## 🔌 Important Backend APIs

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Backend health check |
| POST | `/api/trip/estimate` | Calculate trip expenses |
| POST | `/api/compare` | Compare petrol and EV costs |
| POST | `/api/trips/save` | Save a trip |
| GET | `/api/trips` | Retrieve saved trips |
| GET | `/api/trips/{trip_id}` | Retrieve individual trip |
| PUT | `/api/trips/{trip_id}` | Update saved trip |
| DELETE | `/api/trips/{trip_id}` | Delete saved trip |
| GET | `/api/analytics/monthly` | Retrieve monthly analytics |

*Refer to the actual FastAPI route definitions for request parameters and response formats.*

---

## 🧪 Project Testing Checklist

### Trip Calculator

- [ ] Calculate petrol trip expenses.
- [ ] Calculate EV trip expenses.
- [ ] Compare petrol and EV costs.
- [ ] Verify fuel and energy consumption.

### Database and Trip History

- [ ] Save a trip to SQLite.
- [ ] View saved trip history.
- [ ] View individual trip details.
- [ ] Edit a saved trip.
- [ ] Delete a saved trip.
- [ ] Verify database updates after editing and deleting.

### Search, Filter and Sorting

- [ ] Search trips by ID.
- [ ] Search trips by vehicle type.
- [ ] Search trips by distance.
- [ ] Filter petrol trips.
- [ ] Filter EV trips.
- [ ] Filter trips by date range.
- [ ] Sort newest to oldest.
- [ ] Sort oldest to newest.
- [ ] Sort by highest and lowest distance.
- [ ] Sort by highest and lowest cost.
- [ ] Clear all filters.

### Dashboard and Monthly Analytics

- [ ] Verify overall dashboard analytics.
- [ ] Verify petrol and EV expenditure separately.
- [ ] Verify monthly expense calculations.
- [ ] Verify monthly distance calculations.
- [ ] Verify month and year filters.
- [ ] Verify monthly charts.
- [ ] Verify monthly trip activity.
- [ ] Verify analytics refresh after editing and deleting.
- [ ] Verify analytics refresh after saving a new trip.
- [ ] Verify backend calculations against SQLite records.

### CSV Export

- [ ] Export trip history as CSV.
- [ ] Open the CSV report in Excel.
- [ ] Verify exported values.
- [ ] Verify updated and deleted records in exported reports.

---

## 🔄 Current Development Progress

| Module | Progress |
|---|---|
| Smart Trip Calculator | Implemented |
| Petrol vs EV Comparison | Implemented |
| SQLite Integration | Implemented |
| Trip Saving and Retrieval | Implemented |
| Trip Details | Implemented |
| Edit and Delete Trips | Implemented |
| Search and Filtering | Implemented |
| Trip Sorting | Implemented |
| Dashboard Analytics | Implemented |
| CSV Export | Implemented |
| Monthly Analytics UI | Implemented |
| Monthly Expense Charts | Implemented |
| Monthly Distance Charts | Implemented |
| Month and Year Filters | Implemented |
| Automatic Analytics Refresh | Partially verified |
| Backend Monthly Analytics Accuracy | Pending verification |
| Trip History Pagination | Planned |

*Implementation status reflects the current development work. Individual features should still be tested before being considered production-ready.*

---

## 🔮 Future Enhancements

- Trip History pagination.
- Improved responsive dashboard UI.
- PDF trip report generation.
- Advanced fuel consumption analytics.
- Route planning using Google Maps API.
- Nearby petrol pump and EV charging station recommendations.
- Real-time fuel price integration.
- AI-powered fuel recommendations.
- Fuel expense prediction.
- User authentication and profile management.
- Multiple vehicle management.
- Cloud deployment.

---

## 🎯 Project Objective

FuelWise aims to transform traditional trip cost calculation into a smarter journey management system by combining vehicle expense estimation, petrol and EV comparison, historical trip management, and data-driven travel analytics.

**FuelWise – Predict. Compare. Analyze. Save.**

---

## 👩‍💻 Developer

**Debadrita Kar**

B.Tech – Computer Science and Engineering

GitHub: [Debadritakar01](https://github.com/Debadritakar01)

Project Repository: [FuelWise](https://github.com/Debadritakar01/FuelWise)

---

⭐ If you find this project useful, consider giving it a star on GitHub!