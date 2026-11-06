
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from services.calculations import calculate_petrol, calculate_ev

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

    vehicle = request.vehicle_type.lower()

    try:
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
