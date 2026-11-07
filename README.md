# ⚡ FuelWise – Smart Fuel Intelligence

**Plan Your Trip. Save Your Fuel.**

FuelWise is a smart journey planning and fuel management web application that helps users estimate travel expenses, compare petrol and electric vehicles, track previous journeys and analyze travel expenditure.

The application provides trip cost calculations, vehicle comparisons, interactive analytics, monthly expense reports and downloadable trip history.

---

## 🚀 Project Overview

FuelWise aims to make journey planning smarter by helping users understand:

- How much will a journey cost?
- How much fuel or electricity will be consumed?
- Is a petrol vehicle or an electric vehicle more economical?
- How much have I spent on previous journeys?
- How are my monthly travel expenses changing?

## ✨ Features

### 1. Smart Trip Calculator
- Calculate estimated trip costs.
- Support petrol and electric vehicles.
- Calculate fuel or electricity consumption.
- Calculate cost per kilometre.
- Display estimated journey expenses.

### 2. Petrol vs EV Comparison
- Compare petrol and electric vehicle running costs.
- Compare estimated energy consumption.
- Display cost differences.
- Visualize the comparison using charts.

### 3. Interactive Dashboard
- Display trip calculation results.
- Present vehicle cost comparisons.
- Provide visual insights through charts.

### 4. SQLite Database Integration
- Store saved trip records permanently.
- Retrieve previously saved journeys.
- Maintain trip history using SQLite.
- Perform database operations through SQLAlchemy.

### 5. Trip History Management
Users can:
- View all previously saved trips.
- View individual trip details.
- Edit saved trip information.
- Delete unwanted trips.
- Refresh trip records.

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

### 7. Search and Filter Trips
- Search trips by ID.
- Search by vehicle type.
- Search by distance.
- Filter petrol and electric vehicle trips.
- Filter trips using start and end dates.
- Clear all filters.
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
Monthly analytics help users understand their travel patterns.

Features include:
- Monthly petrol expenditure.
- Monthly EV expenditure.
- Total monthly expenses.
- Number of trips completed each month.
- Monthly expense comparison using Recharts.
- Monthly trip activity line chart.
- Monthly expense summary table.
- Chronological monthly records.

### 10. Export Trip History as CSV
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

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML | Structure |
| CSS | Styling and responsive design |
| JavaScript | Application logic |
| React.js | Frontend development |
| Vite | Frontend development server |
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
│   └── vite.config.js
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   └── requirements.txt
│
└── README.md
```

*Note: The structure above describes the current known application components. Keep any additional files already present in your actual project.*

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
git clone YOUR_GITHUB_REPOSITORY_URL
cd FuelWise
```

### 2. Backend Setup

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

Start the backend:

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

Install Recharts if it is not already installed:

```bash
npm install recharts
```

Start the frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## 📊 Dashboard Analytics

FuelWise provides an analytics dashboard based on saved trip records.

### Overall Analytics

- Total trips
- Total distance
- Petrol expenditure
- EV expenditure
- Average cost per kilometre

### Monthly Analytics

- Petrol vs EV expense comparison.
- Monthly journey count.
- Total monthly expenditure.
- Monthly expense summary.

The analytics automatically reflect successful trip updates and deletions after the trip history is refreshed.

---

## 📥 CSV Report Generation

FuelWise includes a CSV export feature for maintaining travel and expense records.

Example filename:

```text
FuelWise_Trip_History_YYYY-MM-DD.csv
```

The exported file can be opened using Microsoft Excel or Google Sheets.

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

*Refer to your actual FastAPI routes for the final endpoint definitions.*

---

## 🧪 Testing Checklist

- [ ] Calculate petrol trip expenses.
- [ ] Calculate EV trip expenses.
- [ ] Compare petrol and EV costs.
- [ ] Save a trip to SQLite.
- [ ] View saved trip history.
- [ ] View individual trip details.
- [ ] Edit a saved trip.
- [ ] Delete a saved trip.
- [ ] Search trips by ID, vehicle and distance.
- [ ] Filter trips by vehicle type.
- [ ] Filter trips by date.
- [ ] Verify overall dashboard analytics.
- [ ] Verify petrol and EV expenditure separately.
- [ ] Verify monthly expense charts.
- [ ] Verify monthly trip activity.
- [ ] Export trip history as CSV.
- [ ] Open the CSV report in Excel.
- [ ] Verify updated and deleted records in exported reports.

---

## 🔮 Future Enhancements

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

FuelWise aims to transform traditional trip cost calculation into a smarter journey management system by combining vehicle expense estimation, petrol and EV comparison, historical trip management and data-driven travel analytics.

**FuelWise – Predict. Compare. Analyze. Save.**

---

## 👩‍💻 Developer

**Debadrita Kar**

B.Tech – Computer Science and Engineering

GitHub: [Debadritakar01](https://github.com/Debadritakar01)

---

⭐ If you find this project useful, consider giving it a star on GitHub.