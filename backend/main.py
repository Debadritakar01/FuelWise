
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from services.calculations import calculate_petrol, calculate_ev
from database import engine, get_db
from models import Base, Trip

# Create database tables automatically
Base.metadata.create_all(bind=engine)

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


# Common calculation function
def get_trip_result(request: TripRequest):

    vehicle = request.vehicle_type.lower()

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


@app.get("/")
def home():
    return {
        "message": "FuelWise API is running successfully"
    }


@app.get("/health")
def health_check():
    return {
        "status": "OK",
        "project": "FuelWise"
    }


# API 1: Calculate individual vehicle trip cost
@app.post("/api/trip/estimate")
def estimate_trip(request: TripRequest):

    try:
        return get_trip_result(request)

    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))


# API 2: Compare EV and Petrol
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


# API 3: Save a calculated trip to SQLite
@app.post("/api/trips/save")
def save_trip(
    request: TripRequest,
    db: Session = Depends(get_db)
):

    try:
        result = get_trip_result(request)

        vehicle = request.vehicle_type.lower()
        if vehicle == "electric":
            vehicle = "ev"

        new_trip = Trip(
            vehicle_type=vehicle,
            distance_km=request.distance,

            mileage=request.mileage if vehicle == "petrol" else None,
            petrol_price=request.petrol_price if vehicle == "petrol" else None,

            efficiency=request.efficiency if vehicle == "ev" else None,
            electricity_price=request.electricity_price if vehicle == "ev" else None,

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
            "trip": {
                "vehicle_type": new_trip.vehicle_type,
                "distance_km": new_trip.distance_km,
                "total_cost": new_trip.total_cost,
                "cost_per_km": new_trip.cost_per_km
            }
        }

    except ValueError as error:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(error))

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Unable to save trip"
        )


# API 4: Get all saved trips
@app.get("/api/trips")
def get_trip_history(db: Session = Depends(get_db)):

    trips = (
        db.query(Trip)
        .order_by(Trip.created_at.desc())
        .all()
    )

    return [
        {
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
            "created_at": trip.created_at.isoformat()
        }
        for trip in trips
    ]


# API 5: Delete a saved trip
@app.delete("/api/trips/{trip_id}")
def delete_trip(
    trip_id: int,
    db: Session = Depends(get_db)
):

    trip = db.query(Trip).filter(Trip.id == trip_id).first()

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
