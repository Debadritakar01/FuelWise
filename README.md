# FuelWise – Smart Fuel Intelligence 🚗⚡

**FuelWise** is a full-stack fuel and electric vehicle (EV) cost intelligence application designed to help users calculate trip expenses, compare petrol and EV running costs, manage trip history, and analyze their travel expenses.

The application provides real-time calculations based on user inputs, interactive analytics, trip management, and downloadable PDF reports.

## 🚀 Key Features

### 1. Petrol Trip Cost Calculator
- Calculate petrol consumption based on distance and vehicle mileage.
- Calculate total petrol expenses.
- Calculate running cost per kilometre.
- Display fuel consumption in litres.

### 2. Electric Vehicle Cost Calculator
- Calculate electricity consumption in kWh.
- Estimate EV charging expenses.
- Calculate EV running cost per kilometre.
- Display total electricity consumption.

### 3. Petrol vs EV Cost Comparison
- Compare petrol and EV running expenses.
- Calculate potential savings.
- Identify the more economical vehicle.
- Display comparison results using interactive charts.

### 4. Trip Management
- Save calculated trips to SQLite.
- View complete trip history.
- View individual trip details.
- Edit existing trip records.
- Delete saved trips.
- Search and filter trips.
- Filter trips by vehicle type and date range.

### 5. Analytics Dashboard
- Total number of trips.
- Total distance travelled.
- Total trip expenses.
- Petrol expense breakdown.
- EV expense breakdown.
- Average cost per kilometre.
- Monthly expense analytics.
- Interactive data visualization using Recharts.

### 6. PDF Trip Reports
- Generate downloadable PDF trip reports.
- Display trip information and calculated expenses.
- Create structured reports using ReportLab.

### 7. Frontend Validation and User Experience
- Validate user inputs.
- Prevent invalid or empty values.
- Display loading states during API requests.
- Handle API errors.
- Provide search and filtering functionality.
- Responsive React interface.

### 8. Backend Validation and Error Handling
- Pydantic request validation.
- Positive-number validation.
- Reject zero, negative and non-finite values.
- Vehicle-specific petrol and EV validation.
- Validate required vehicle information.
- Centralized HTTP exception handling.
- Standardized API error responses.
- Request validation error handling.
- Database exception handling.
- Database rollback on failed write operations.
- Logging for debugging unexpected errors.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Frontend build tool |
| JavaScript | Application logic |
| HTML5 | Page structure |
| CSS3 | Styling |
| Python | Backend programming |
| FastAPI | REST API development |
| SQLite | Database |
| SQLAlchemy | Database ORM |
| Pydantic | Data validation |
| Recharts | Data visualization |
| ReportLab | PDF generation |
| Git & GitHub | Version control |

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
│   ├── requirements.txt
│   └── fuelwise.db
│
└── README.md
```

*The structure represents the main application files. Additional components and files may exist.*

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

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

Backend URL:

http://127.0.0.1:8000

Swagger API documentation:

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

Start the Vite development server:

```bash
npm run dev
```

Frontend URL:

http://localhost:5173

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

**Additional functionality:** Analytics and PDF report generation are available through the backend API.

Refer to Swagger documentation for the complete endpoint specifications.

## 🧮 Calculation Logic

### Petrol Vehicle

Fuel consumed:

```text
Fuel Used = Distance / Mileage
```

Total petrol cost:

```text
Total Cost = Fuel Used × Petrol Price
```

Cost per kilometre:

```text
Cost per KM = Total Cost / Distance
```

### Electric Vehicle

Electricity consumed:

```text
Energy Used = Distance / EV Efficiency
```

Total electricity cost:

```text
Total Cost = Energy Used × Electricity Price
```

Cost per kilometre:

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

**Estimated EV saving: ₹213.33 per 100 km.**

These are illustrative calculations, not guaranteed real-world expenses.

## 🛡️ Backend Validation and Error Handling

FuelWise uses Pydantic and FastAPI to validate incoming API requests.

Validation includes:

- Vehicle type must be petrol or EV.
- Distance must be greater than zero.
- Mileage must be positive for petrol vehicles.
- Petrol price must be positive.
- EV efficiency must be positive.
- Electricity price must be positive.
- Petrol requests must not contain EV-specific values.
- EV requests must not contain petrol-specific values.

The backend also implements centralized exception handling for HTTP errors and request validation errors.

Database write operations include rollback and error logging to improve reliability.

## 🧪 Testing

Backend APIs can be tested through FastAPI Swagger UI:

http://127.0.0.1:8000/docs

### Recommended Test Cases

| Test Case | Expected Result |
|---|---|
| Valid petrol calculation | 200 OK |
| Valid EV calculation | 200 OK |
| Valid petrol vs EV comparison | 200 OK |
| Zero distance | 422 |
| Negative distance | 422 |
| Missing petrol mileage | 422 |
| Missing EV efficiency | 422 |
| Invalid vehicle type | 422 |
| Nonexistent trip ID | 404 |
| Invalid month in analytics | 400 |

### Example Petrol Request

```json
{
  "vehicle_type": "petrol",
  "distance": 100,
  "mileage": 45,
  "petrol_price": 105
}
```

### Example EV Request

```json
{
  "vehicle_type": "ev",
  "distance": 100,
  "efficiency": 40,
  "electricity_price": 8
}
```

**Note:** The test cases above are the expected testing checklist. Verify each case in Swagger before marking the complete backend test suite as passed. A 422 response is expected for invalid input.

## 🔮 Future Enhancements

- User registration and authentication.
- User-specific trip history.
- Live petrol and diesel price integration.
- Google Maps integration.
- Route-based fuel cost estimation.
- Smart refuelling recommendations.
- AI-powered fuel-saving suggestions.
- Vehicle mileage health monitoring.
- Advanced fuel consumption prediction.
- CSV export functionality.
- PostgreSQL migration.
- Cloud deployment.
- Mobile application.

## 👩‍💻 Developer

**Debadrita Kar**

GitHub: https://github.com/Debadritakar01

Project Repository: https://github.com/Debadritakar01/FuelWise

## 📄 License

This project is developed for educational and academic purposes.

---

**FuelWise – Predict. Compare. Optimize. Save. 🚗⚡**
