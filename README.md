# 🚗 FuelWise – Smart Fuel Intelligence

**A Full-Stack Web Application for Smart Trip Cost Estimation, Fuel Management and Petrol vs EV Comparison.**

FuelWise is a smart trip-planning application that helps users estimate journey expenses, calculate fuel or electricity consumption, compare petrol and electric vehicles, and maintain trip records.

The application provides an interactive dashboard with cost visualizations, trip history, analytics and downloadable reports.

---

## 🌟 Key Features

### 1. Trip Cost Calculator
- Calculate petrol vehicle trip expenses.
- Calculate electric vehicle (EV) trip expenses.
- Estimate fuel or electricity consumption.
- Calculate cost per kilometre.
- Display detailed trip summaries.

### 2. Petrol vs EV Comparison
- Compare petrol and electric vehicle running costs.
- Calculate potential savings.
- Display the cheaper vehicle option.
- Visualize cost differences using interactive charts.

### 3. Trip History Management
- Save calculated trips in an SQLite database.
- View individual trip details.
- Edit existing trip records.
- Delete saved trips.
- Search saved trips.
- Filter trips by vehicle type and date range.

### 4. Analytics Dashboard
- Total number of trips.
- Total travel distance.
- Total trip expenses.
- Petrol and EV expense breakdown.
- Average cost per kilometre.
- Monthly analytics and expense insights.
- Graphical data visualization.

### 5. Report Generation and Export
- Export trip history as CSV.
- Generate downloadable PDF trip reports.
- Include trip details, consumption and expense information in PDF reports.

### 6. Input Validation and Error Handling
- Validate required input fields.
- Reject zero and negative values where invalid.
- Validate mileage and EV efficiency.
- Display meaningful error messages.
- Handle API errors.
- Display loading states during API requests.
- Prevent duplicate actions while requests are processing.

### 7. Responsive User Interface
- Clean and modern dashboard.
- Responsive calculator layout.
- Mobile-friendly trip history.
- Responsive analytics and charts.
- Interactive buttons and input fields.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Build Tool | Vite |
| Styling | CSS3 |
| Backend | Python |
| Backend Framework | FastAPI |
| Database | SQLite |
| ORM | SQLAlchemy |
| Data Visualization | Recharts |
| PDF Generation | ReportLab |
| API Testing | Swagger UI |
| Version Control | Git and GitHub |

---

## 🏗️ Project Architecture

FuelWise follows a frontend-backend architecture.

```text
                  USER
                    |
                    |
             React Frontend
                 (Vite)
                    |
                    |
              REST API Calls
                    |
                    |
             FastAPI Backend
                    |
                    |
              SQLAlchemy ORM
                    |
                    |
              SQLite Database
```

The frontend communicates with the FastAPI backend through REST API requests. SQLAlchemy manages database operations, while SQLite stores trip information.

---

## 📁 Project Structure

```text
FuelWise/
│
├── backend/
│   ├── main.py
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
│   │   │   ├── TripDetails.jsx
│   │   │   ├── CostComparisonChart.jsx
│   │   │   └── MonthlyAnalytics.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

*Note: This is a representative project structure. Retain any additional files and components present in your actual repository.*

---

## ⚙️ Installation and Setup

### Prerequisites

Install the following before running the application:

- Python 3.10+
- Node.js and npm
- Git
- Visual Studio Code (recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/Debadritakar01/FuelWise.git
```

Navigate into the project:

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

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

If ReportLab is not included in your requirements file, install it using:

```bash
pip install reportlab
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
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

Start the development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## 🔌 API Endpoints

The following endpoints are part of the current backend implementation.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check API status |
| GET | `/health` | Backend health check |
| POST | `/api/trip/estimate` | Calculate trip expenses |
| POST | `/api/compare` | Compare petrol and EV costs |
| POST | `/api/trips/save` | Save a trip |
| GET | `/api/trips` | Retrieve trip history |
| GET | `/api/trips/{trip_id}` | Retrieve individual trip |
| PUT | `/api/trips/{trip_id}` | Update saved trip |
| DELETE | `/api/trips/{trip_id}` | Delete saved trip |
| GET | `/api/trips/{trip_id}/pdf` | Generate downloadable PDF |

Additional analytics and CSV export functionality is also included in the project.

For complete request and response schemas, visit the Swagger documentation.

---

## 🧮 Calculation Examples

### Petrol Vehicle

Example input:

| Parameter | Value |
|---|---:|
| Distance | 100 km |
| Mileage | 45 km/L |
| Petrol Price | ₹105/L |

Expected calculation:

- Fuel consumed = 100 / 45 = 2.22 litres
- Total cost = ₹233.33
- Cost per kilometre = ₹2.33

### Electric Vehicle

Example input:

| Parameter | Value |
|---|---:|
| Distance | 100 km |
| EV Efficiency | 40 km/kWh |
| Electricity Price | ₹8/kWh |

Expected calculation:

- Energy consumed = 2.5 kWh
- Total cost = ₹20.00
- Cost per kilometre = ₹0.20

*These are illustrative calculation examples using the specified inputs.*

---

## 🧪 Testing

Testing is being carried out as part of Step 13.

### Backend API Testing

- API status verification.
- Backend health verification.
- Petrol calculation testing.
- EV calculation testing.
- Petrol vs EV comparison testing.
- Trip saving and retrieval.
- Trip editing and deletion.
- PDF endpoint testing.

### Input Validation Testing

- Empty input fields.
- Zero distance.
- Negative distance.
- Zero mileage.
- Negative mileage.
- Invalid petrol price.
- Invalid EV efficiency.
- Missing required fields.
- Valid petrol and EV inputs.

### Frontend Testing

- Calculator functionality.
- Save Trip functionality.
- Trip History operations.
- Search and filtering.
- Analytics updates.
- PDF download integration.
- Loading and error messages.

### Responsive Testing

- Desktop layout.
- Tablet layout.
- Mobile layout.
- Responsive charts and tables.
- Trip Details modal.

**Testing status:** Implementation and manual testing are in progress. Final verification and automated test coverage remain part of the development roadmap.

---

## 🚀 Future Enhancements

The following improvements are planned for future development:

- [ ] Comprehensive automated backend testing.
- [ ] Frontend component testing.
- [ ] End-to-end application testing.
- [ ] Final PDF report verification.
- [ ] Database optimization and migration strategy.
- [ ] Improved security and environment configuration.
- [ ] Production deployment.
- [ ] Final performance optimization.
- [ ] Additional analytics and reporting improvements.

---

## 🎯 Project Objectives

1. Simplify trip expense estimation.
2. Help users understand fuel and electricity consumption.
3. Compare petrol and electric vehicle running costs.
4. Maintain organized trip records.
5. Provide meaningful expense analytics.
6. Generate downloadable trip reports.
7. Build a reliable and responsive full-stack application.

---

## 👩‍💻 Developer

**Debadrita Kar**

B.Tech – Computer Science and Engineering

GitHub: [@Debadritakar01](https://github.com/Debadritakar01)

Project Repository: [FuelWise – Smart Fuel Intelligence](https://github.com/Debadritakar01/FuelWise)

---

## 📜 License

This project is developed for educational and academic purposes.

---

**FuelWise – Plan Smarter. Travel Better. Save More.** 🚗⚡
