from sqlalchemy import func, extract, case
from datetime import datetime
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from services.calculations import calculate_petrol, calculate_ev
from database import engine, get_db
from models import Base, Trip


# Create database tables automatically
Base.metadata.create_all(bind=engine)


# Initialize FastAPI
app = FastAPI(
    title="FuelWise API",
    description="Smart Fuel Intelligence System",
    version="1.0"
)


# React frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# REQUEST MODELS
# ==========================================

# Petrol or EV request model
class TripRequest(BaseModel):
    vehicle_type: str
    distance: float = Field(gt=0)

    mileage: float | None = Field(default=None, gt=0)
    petrol_price: float | None = Field(default=None, gt=0)

    efficiency: float | None = Field(default=None, gt=0)
    electricity_price: float | None = Field(default=None, gt=0)


# EV vs Petrol comparison request model
class CompareRequest(BaseModel):
    distance: float = Field(gt=0)
    mileage: float = Field(gt=0)
    petrol_price: float = Field(gt=0)
    efficiency: float = Field(gt=0)
    electricity_price: float = Field(gt=0)


# ==========================================
# COMMON CALCULATION FUNCTION
# ==========================================

def get_trip_result(request: TripRequest):

    vehicle = request.vehicle_type.lower().strip()

    if vehicle == "petrol":

        if request.mileage is None or request.petrol_price is None:
            raise HTTPException(
                status_code=400,
                detail="Mileage and petrol price are required"
            )

        result = calculate_petrol(
            request.distance,
            request.mileage,
            request.petrol_price
        )

    elif vehicle in ["ev", "electric"]:

        if request.efficiency is None or request.electricity_price is None:
            raise HTTPException(
                status_code=400,
                detail="Efficiency and electricity price are required"
            )

        result = calculate_ev(
            request.distance,
            request.efficiency,
            request.electricity_price
        )

    else:
        raise HTTPException(
            status_code=400,
            detail="Vehicle type must be Petrol or EV"
        )

    return result


# ==========================================
# COMMON TRIP RESPONSE FUNCTION
# ==========================================

def trip_to_dict(trip: Trip):

    return {
        "id": trip.id,
        "vehicle_type": trip.vehicle_type,
        "distance_km": trip.distance_km,
        "mileage": trip.mileage,
        "petrol_price": trip.petrol_price,
        "efficiency": trip.efficiency,
        "electricity_price": trip.electricity_price,
        "fuel_used_litres": trip.fuel_used_litres,
        "energy_used_kwh": trip.energy_used_kwh,
        "total_cost": trip.total_cost,
        "cost_per_km": trip.cost_per_km,
        "created_at": (
            trip.created_at.isoformat()
            if trip.created_at else None
        )
    }


# ==========================================
# HOME API
# ==========================================

@app.get("/")
def home():

    return {
        "message": "FuelWise API is running successfully"
    }


# ==========================================
# HEALTH CHECK API
# ==========================================

@app.get("/health")
def health_check():

    return {
        "status": "OK",
        "project": "FuelWise"
    }


# ==========================================
# API 1: CALCULATE INDIVIDUAL TRIP COST
# ==========================================

@app.post("/api/trip/estimate")
def estimate_trip(request: TripRequest):

    try:
        return get_trip_result(request)

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )


# ==========================================
# API 2: COMPARE PETROL AND EV
# ==========================================

@app.post("/api/compare")
def compare_vehicles(request: CompareRequest):

    petrol = calculate_petrol(
        request.distance,
        request.mileage,
        request.petrol_price
    )

    ev = calculate_ev(
        request.distance,
        request.efficiency,
        request.electricity_price
    )

    savings = round(
        petrol["total_cost"] - ev["total_cost"], 2
    )

    if savings > 0:
        recommendation = "EV is cheaper"

    elif savings < 0:
        recommendation = "Petrol is cheaper"

    else:
        recommendation = "Both have equal running costs"

    return {
        "distance_km": request.distance,
        "petrol": petrol,
        "electric": ev,
        "savings": abs(savings),
        "cheaper_vehicle": recommendation
    }


# ==========================================
# API 3: SAVE CALCULATED TRIP TO SQLITE
# ==========================================

@app.post("/api/trips/save")
def save_trip(
    request: TripRequest,
    db: Session = Depends(get_db)
):

    try:
        result = get_trip_result(request)

        vehicle = request.vehicle_type.lower().strip()

        if vehicle == "electric":
            vehicle = "ev"

        new_trip = Trip(
            vehicle_type=vehicle,
            distance_km=request.distance,

            mileage=(
                request.mileage if vehicle == "petrol" else None
            ),

            petrol_price=(
                request.petrol_price if vehicle == "petrol" else None
            ),

            efficiency=(
                request.efficiency if vehicle == "ev" else None
            ),

            electricity_price=(
                request.electricity_price if vehicle == "ev" else None
            ),

            fuel_used_litres=result.get("fuel_used_litres"),
            energy_used_kwh=result.get("energy_used_kwh"),

            total_cost=result["total_cost"],
            cost_per_km=result["cost_per_km"]
        )

        db.add(new_trip)
        db.commit()
        db.refresh(new_trip)

        return {
            "message": "Trip saved successfully",
            "trip_id": new_trip.id,
            "trip": trip_to_dict(new_trip)
        }

    except HTTPException:
        db.rollback()
        raise

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Unable to save trip"
        )


# ==========================================
# API 4: GET ALL SAVED TRIPS
# ==========================================

@app.get("/api/trips")
def get_trip_history(
    db: Session = Depends(get_db)
):

    trips = (
        db.query(Trip)
        .order_by(Trip.created_at.desc())
        .all()
    )

    return [
        trip_to_dict(trip)
        for trip in trips
    ]


# ==========================================
# API 5: GET ALL TRIPS (ALTERNATE ROUTE)
# ==========================================

@app.get("/trips")
def get_all_trips(
    db: Session = Depends(get_db)
):

    trips = (
        db.query(Trip)
        .order_by(Trip.id.desc())
        .all()
    )

    return [
        {
            "id": trip.id,
            "vehicle_type": trip.vehicle_type,
            "distance_km": trip.distance_km,
            "total_cost": trip.total_cost,
            "cost_per_km": trip.cost_per_km,
            "created_at": (
                trip.created_at.isoformat()
                if trip.created_at else None
            )
        }
        for trip in trips
    ]


# ==========================================
# API 6: GET INDIVIDUAL TRIP DETAILS
# ==========================================

@app.get("/api/trips/{trip_id}")
def get_trip_by_id(
    trip_id: int,
    db: Session = Depends(get_db)
):

    trip = (
        db.query(Trip)
        .filter(Trip.id == trip_id)
        .first()
    )

    if trip is None:
        raise HTTPException(
            status_code=404,
            detail="Trip not found"
        )

    return trip_to_dict(trip)
    
# ==========================================
# API 7: UPDATE AN EXISTING SAVED TRIP
# ==========================================

@app.put("/api/trips/{trip_id}")
def update_trip(
    trip_id: int,
    request: TripRequest,
    db: Session = Depends(get_db)
):

    # Find existing trip
    trip = (
        db.query(Trip)
        .filter(Trip.id == trip_id)
        .first()
    )

    if trip is None:
        raise HTTPException(
            status_code=404,
            detail="Trip not found"
        )

    try:
        # Recalculate trip cost
        result = get_trip_result(request)

        vehicle = request.vehicle_type.lower().strip()

        if vehicle == "electric":
            vehicle = "ev"

        # Update existing database record
        trip.vehicle_type = vehicle
        trip.distance_km = request.distance

        # Petrol details
        trip.mileage = (
            request.mileage if vehicle == "petrol" else None
        )

        trip.petrol_price = (
            request.petrol_price if vehicle == "petrol" else None
        )

        # EV details
        trip.efficiency = (
            request.efficiency if vehicle == "ev" else None
        )

        trip.electricity_price = (
            request.electricity_price if vehicle == "ev" else None
        )

        # Update consumption
        trip.fuel_used_litres = result.get("fuel_used_litres")
        trip.energy_used_kwh = result.get("energy_used_kwh")

        # Update total cost
        trip.total_cost = result["total_cost"]
        trip.cost_per_km = result["cost_per_km"]

        # Save changes
        db.commit()
        db.refresh(trip)

        return {
            "message": "Trip updated successfully",
            "trip": trip_to_dict(trip)
        }

    except HTTPException:
        db.rollback()
        raise

    except ValueError as error:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Unable to update trip"
        )


# ==========================================
# API 7: DELETE SAVED TRIP
# ==========================================

@app.delete("/api/trips/{trip_id}")
def delete_trip(
    trip_id: int,
    db: Session = Depends(get_db)
):

    trip = (
        db.query(Trip)
        .filter(Trip.id == trip_id)
        .first()
    )

    if trip is None:
        raise HTTPException(
            status_code=404,
            detail="Trip not found"
        )

    db.delete(trip)
    db.commit()

    return {
        "message": "Trip deleted successfully",
        "trip_id": trip_id
    }


# ==========================================
# API 8: MONTHLY TRIP ANALYTICS WITH FILTERS
# ==========================================

@app.get("/api/analytics/monthly")
def get_monthly_analytics(
    year: int | None = None,
    month: int | None = None,
    db: Session = Depends(get_db)
):

    # Validate month
    if month is not None and not 1 <= month <= 12:
        raise HTTPException(
            status_code=400,
            detail="Month must be between 1 and 12"
        )

    # Base query
    filtered_query = db.query(Trip).filter(
        Trip.created_at.isnot(None)
    )

    # Apply year filter
    if year is not None:
        filtered_query = filtered_query.filter(
            extract("year", Trip.created_at) == year
        )

    # Apply month filter
    if month is not None:
        filtered_query = filtered_query.filter(
            extract("month", Trip.created_at) == month
        )

    # Overall statistics for selected filters
    overall = filtered_query.with_entities(

        func.count(Trip.id).label("total_trips"),

        func.coalesce(
            func.sum(Trip.distance_km), 0
        ).label("total_distance"),

        func.coalesce(
            func.sum(Trip.total_cost), 0
        ).label("total_expenses"),

        func.coalesce(
            func.sum(
                case(
                    (Trip.vehicle_type == "petrol", Trip.total_cost),
                    else_=0
                )
            ), 0
        ).label("petrol_expense"),

        func.coalesce(
            func.sum(
                case(
                    (Trip.vehicle_type == "ev", Trip.total_cost),
                    else_=0
                )
            ), 0
        ).label("ev_expense")

    ).first()

    # Group selected trips by year and month
    month_key = func.strftime(
        "%Y-%m", Trip.created_at
    )

    monthly_records = (
        filtered_query.with_entities(

            month_key.label("month_key"),

            func.count(Trip.id).label("total_trips"),

            func.coalesce(
                func.sum(Trip.distance_km), 0
            ).label("total_distance"),

            # Petrol distance
            func.coalesce(
                func.sum(
                    case(
                        (Trip.vehicle_type == "petrol", Trip.distance_km),
                        else_=0
                    )
                ), 0
            ).label("petrol_distance"),

            # EV distance
            func.coalesce(
                func.sum(
                    case(
                        (Trip.vehicle_type == "ev", Trip.distance_km),
                        else_=0
                    )
                ), 0
            ).label("ev_distance"),

            # Total expenses
            func.coalesce(
                func.sum(Trip.total_cost), 0
            ).label("total_expenses"),

            # Petrol expenses
            func.coalesce(
                func.sum(
                    case(
                        (Trip.vehicle_type == "petrol", Trip.total_cost),
                        else_=0
                    )
                ), 0
            ).label("petrol_expense"),

            # EV expenses
            func.coalesce(
                func.sum(
                    case(
                        (Trip.vehicle_type == "ev", Trip.total_cost),
                        else_=0
                    )
                ), 0
            ).label("ev_expense")

        )
        .group_by(month_key)
        .order_by(month_key)
        .all()
    )

    # Prepare monthly response
    monthly_data = []

    for record in monthly_records:

        date_object = datetime.strptime(
            record.month_key, "%Y-%m"
        )

        monthly_data.append({

            "month": date_object.strftime("%B"),
            "year": date_object.year,

            "total_trips": record.total_trips,

            "total_distance": round(
                float(record.total_distance), 2
            ),

            "petrol_distance": round(
                float(record.petrol_distance), 2
            ),

            "ev_distance": round(
                float(record.ev_distance), 2
            ),

            "total_expenses": round(
                float(record.total_expenses), 2
            ),

            "petrol_expense": round(
                float(record.petrol_expense), 2
            ),

            "ev_expense": round(
                float(record.ev_expense), 2
            )
        })

    # Return analytics
    return {

        "filters": {
            "year": year,
            "month": month
        },

        "total_trips": overall.total_trips,

        "total_distance": round(
            float(overall.total_distance), 2
        ),

        "total_expenses": round(
            float(overall.total_expenses), 2
        ),

        "petrol_expense": round(
            float(overall.petrol_expense), 2
        ),

        "ev_expense": round(
            float(overall.ev_expense), 2
        ),

        "monthly_data": monthly_data
    }
