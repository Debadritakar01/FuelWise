FuelWise -- Smart Fuel Intelligence
FuelWise is a web-based trip planning and vehicle expense analytics
application. It helps users estimate petrol and electric vehicle (EV)
running costs, compare energy expenses, save trip records, and review
their travel history through an analytics dashboard.
Project status: Core trip calculation, petrol-vs-EV comparison,
trip history, and monthly analytics have been developed incrementally.
Year/month filtering is the current development step and should be
marked complete only after the backend and frontend tests pass.

Features
Trip planning and cost estimation
- Calculate estimated petrol consumption and trip cost using distance,
  mileage, and petrol price.
- Calculate EV energy consumption and trip cost using distance,
  efficiency, and electricity tariff.
- Display estimated energy usage and cost per kilometre.
- Compare petrol and EV running costs for the same journey.
- Show the estimated savings and the lower-cost option.
Saved trip history
- Save calculated trips to the database.
- Retrieve and display saved trips.
- View individual trip details.
- Edit an existing saved trip.
- Delete a saved trip.
Monthly analytics
- View overall trip count, total distance, and total expenses.
- Separate petrol and EV expenses.
- Group saved trips by month and year.
- Compare monthly petrol and EV expenses with a bar chart.
- Compare monthly petrol and EV travel distance with a bar chart.
- View monthly trip activity with a line chart.
- Review monthly trip, distance, and expense figures in a summary
  table.
- Show loading, error, empty-data, and retry states in the analytics
  interface.
Analytics filters -- current development step
The next enhancement is to add year and month filters to the Monthly
Analytics page.

Planned behaviour: - No filter: show all available monthly records. -
Year filter: show analytics for the selected year. - Month filter: show
analytics for the selected month, optionally combined with a selected
year. - Refresh summary values, charts, and the table when filters
change.

The backend endpoint is being updated to accept optional year and
month query parameters. Treat this feature as in progress until all
three API cases and the React UI are tested.
Technology Stack
  Layer             Technology
  Frontend          React.js, Vite, JavaScript, HTML, CSS
Charts            Recharts
Backend           Python, FastAPI
Database          SQLite
ORM / queries     SQLAlchemy
API testing       FastAPI Swagger UI
Version control   Git and GitHub
Project Structure
The project has been developed in the following general structure.
Adjust filenames below if your local folder has additional components or
a different layout.
FuelWise/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models/
│   ├── services/
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MonthlyAnalytics.jsx
│   │   │   ├── MonthlyAnalytics.css
│   │   │   ├── TripHistory.jsx
│   │   │   ├── TripDetails.jsx
│   │   │   └── EditTrip.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
API Endpoints
The following endpoints have been discussed or implemented during
development. Confirm the exact route names in backend/main.py and
Swagger before publishing a final API reference.
  Method                  Endpoint                   Purpose
  GET                   /                        Check that the backend
is running

  POST                  /api/trip/estimate       Calculate a petrol or
EV trip estimate

  POST                  /api/compare             Compare petrol and EV
running costs

  POST                  /api/trips/save          Save a calculated trip

  GET                   /api/trips               Retrieve saved trips

  GET                   /api/trips/{trip_id}     Retrieve an individual
trip

  PUT                   /api/trips/{trip_id}     Update an existing trip

  DELETE                /api/trips/{trip_id}     Delete a saved trip
GET                   /api/analytics/monthly   Retrieve overall and
month-wise analytics
Monthly analytics query parameters
The monthly analytics endpoint is being extended to support:
GET /api/analytics/monthly
GET /api/analytics/monthly?year=2026
GET /api/analytics/monthly?year=2026&month=11
- year is optional and filters records by year.
- month is optional and should be an integer from 1 to 12.
- With no parameters, the endpoint should return all available monthly
  records.
The filtered endpoint should calculate the summary totals from the same
filtered trip set as the monthly records. Verify this behaviour in
main.py before considering the filter feature complete.
Example monthly analytics response
Values below are illustrative only.
{
  "filters": {
    "year": 2026,
    "month": 11
  },
  "total_trips": 5,
  "total_distance": 250.0,
  "total_expenses": 700.0,
  "petrol_expense": 500.0,
  "ev_expense": 200.0,
  "monthly_data": [
    {
      "month": "November",
      "year": 2026,
      "total_trips": 5,
      "total_distance": 250.0,
      "petrol_distance": 150.0,
      "ev_distance": 100.0,
      "total_expenses": 700.0,
      "petrol_expense": 500.0,
      "ev_expense": 200.0
    }
  ]
}
Running the Project Locally
1. Clone the repository
git clone <your-repository-url>
cd FuelWise
2. Start the backend
Open a terminal:
cd backend
python -m venv venv
Activate the virtual environment on Windows:
venv\Scripts\activate
Install dependencies:
pip install -r requirements.txt
Start FastAPI:
python -m uvicorn main:app --reload
Backend base URL:
http://127.0.0.1:8000
Swagger API documentation:
http://127.0.0.1:8000/docs
3. Start the frontend
Open a second terminal:
cd frontend
npm install
npm run dev
Open the local URL printed by Vite, commonly:
http://localhost:5173
Testing Checklist
Trip calculation and comparison
- [ ] Test a petrol estimate with valid distance, mileage, and petrol
  price.
- [ ] Test an EV estimate with valid distance, efficiency, and
  electricity price.
- [ ] Test invalid or zero distance and efficiency values.
- [ ] Compare petrol and EV costs for the same distance.
- [ ] Confirm displayed consumption, total cost, and cost per
  kilometre.
Trip history
- [ ] Save a trip and confirm it appears in the history.
- [ ] Open an individual trip and verify its details.
- [ ] Edit a trip and confirm the updated values persist.
- [ ] Delete a trip and confirm it is removed from the list.
Monthly analytics
- [ ] Confirm the overall summary values match saved trip records.
- [ ] Confirm petrol and EV expenses are separated correctly.
- [ ] Confirm petrol and EV distances are separated correctly.
- [ ] Confirm the expense, distance, and trip-activity charts render.
- [ ] Confirm the monthly table matches the API response.
- [ ] Test loading, empty, error, and retry states.
Year and month filters -- pending verification
- [ ] GET /api/analytics/monthly returns all available months.
- [ ] GET /api/analytics/monthly?year=2026 returns only 2026
  records.
- [ ] GET /api/analytics/monthly?year=2026&month=11 returns November
  2026 records.
- [ ] Invalid month values are handled appropriately.
- [ ] Summary cards, charts, and table update when filters change.
Development Progress
  Module                                    Status
  React + Vite frontend setup               Implemented
FastAPI backend setup                     Implemented
Petrol and EV trip calculations           Implemented
Petrol vs EV cost comparison              Implemented
SQLite trip persistence                   Implemented
Trip history listing                      Implemented
Individual trip details                   Implemented
Edit and delete saved trips               Implemented / verify locally
Monthly analytics API                     Implemented / API tested in development
Monthly expense chart                     Implemented
Monthly trip activity chart               Implemented
Petrol vs EV distance calculations        Added to monthly API
Monthly distance comparison chart         Added to frontend
Monthly summary table                     Implemented
Year and month filters                    In progress
Deployment and production configuration   Pending
Important Notes
- All displayed trip costs are estimates based on the values entered
  by the user.
- Petrol mileage and EV efficiency use different units. Compare their
  costs for the same distance rather than comparing the raw efficiency
  values.
- Actual running costs can vary with vehicle condition, riding style,
  traffic, charging losses, and local energy prices.
- Do not commit the virtual environment, database secrets, API keys,
  or .env files to GitHub.
- Keep this README aligned with the actual code and tested behaviour.
  Features described as planned or in progress should not be presented
  as completed.
Future Enhancements
Potential future improvements include: - Better date-range analytics and
exportable reports. - Vehicle profiles and multiple-vehicle support. -
Route-based distance estimation and route comparison. - Nearby fuel
stations and EV charging locations. - Fuel-price and charging-tariff
integrations. - User authentication and personalized trip history. -
Deployment of the frontend and backend.
FuelWise -- Smart Fuel Intelligence
Plan your trip. Compare running costs. Understand your travel expenses.