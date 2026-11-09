
import logging
from typing import Literal
from datetime import datetime
from io import BytesIO

from sqlalchemy import func, extract, case
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import StreamingResponse, JSONResponse

from pydantic import (
    BaseModel,
    Field,
    model_validator,
    field_validator
)

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)

from services.calculations import calculate_petrol, calculate_ev
from database import engine, get_db
from models import Base, Trip


# ==========================================
# LOGGING CONFIGURATION
# ==========================================

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger("FuelWise")


# ==========================================
# CREATE DATABASE TABLES
# ==========================================

Base.metadata.create_all(bind=engine)


# ==========================================
# INITIALIZE FASTAPI
# ==========================================

app = FastAPI(
    title="FuelWise API",
    description="Smart Fuel Intelligence System",
    version="1.0"
)


# ==========================================
# GLOBAL ERROR HANDLING
# ==========================================

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):

    logger.warning(
        "HTTP error %s on %s: %s",
        exc.status_code,
        request.url.path,
        exc.detail
    )

    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": "HTTP Error",
            "message": exc.detail
        }
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):

    errors = []

    for error in exc.errors():
        errors.append({
            "field": ".".join(
                str(item) for item in error["loc"]
            ),
            "message": error["msg"]
        })

    logger.warning(
        "Validation error on %s",
        request.url.path
    )

    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "error": "Validation Error",
            "message": "Please check your input values",
            "details": errors
        }
    )


@app.exception_handler(SQLAlchemyError)
async def database_exception_handler(request, exc):

    logger.exception(
        "Database error on %s",
        request.url.path
    )

    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "Database Error",
            "message": "A database operation failed. Please try again."
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):

    logger.exception(
        "Unexpected server error on %s",
        request.url.path
    )

    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "Internal Server Error",
            "message": "Something went wrong. Please try again later."
        }
    )


# ==========================================
# CORS CONFIGURATION
# ==========================================

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
# REQUEST MODELS WITH VALIDATION
# ==========================================

class TripRequest(BaseModel):

    vehicle_type: Literal["petrol", "ev"]

    distance: float = Field(
        gt=0,
        allow_inf_nan=False,
        description="Distance must be greater than zero"
    )

    mileage: float | None = Field(
        default=None,
        gt=0,
        allow_inf_nan=False
    )

    petrol_price: float | None = Field(
        default=None,
        gt=0,
        allow_inf_nan=False
    )

    efficiency: float | None = Field(
        default=None,
        gt=0,
        allow_inf_nan=False
    )

    electricity_price: float | None = Field(
        default=None,
        gt=0,
        allow_inf_nan=False
    )

    @field_validator("vehicle_type", mode="before")
    @classmethod
    def normalize_vehicle_type(cls, value):

        if isinstance(value, str):
            value = value.strip().lower()

            if value == "electric":
                value = "ev"

        return value

    @model_validator(mode="after")
    def validate_vehicle_fields(self):

        if self.vehicle_type == "petrol":

            if self.mileage is None:
                raise ValueError(
                    "Mileage is required for petrol vehicles"
                )

            if self.petrol_price is None:
                raise ValueError(
                    "Petrol price is required"
                )

            if (
                self.efficiency is not None
                or self.electricity_price is not None
            ):
                raise ValueError(
                    "EV details are not allowed for petrol vehicles"
                )

        elif self.vehicle_type == "ev":

            if self.efficiency is None:
                raise ValueError(
                    "EV efficiency is required"
                )

            if self.electricity_price is None:
                raise ValueError(
                    "Electricity price is required"
                )

            if (
                self.mileage is not None
                or self.petrol_price is not None
            ):
                raise ValueError(
                    "Petrol details are not allowed for EV vehicles"
                )

        return self


# ==========================================
# PETROL VS EV COMPARISON REQUEST MODEL
# ==========================================

class CompareRequest(BaseModel):

    distance: float = Field(
        gt=0,
        allow_inf_nan=False
    )

    mileage: float = Field(
        gt=0,
        allow_inf_nan=False
    )

    petrol_price: float = Field(
        gt=0,
        allow_inf_nan=False
    )

    efficiency: float = Field(
        gt=0,
        allow_inf_nan=False
    )

    electricity_price: float = Field(
        gt=0,
        allow_inf_nan=False
    )


# ==========================================
# COMMON CALCULATION FUNCTION
# ==========================================

def get_trip_result(request: TripRequest):

    if request.vehicle_type == "petrol":

        return calculate_petrol(
            request.distance,
            request.mileage,
            request.petrol_price
        )

    elif request.vehicle_type == "ev":

        return calculate_ev(
            request.distance,
            request.efficiency,
            request.electricity_price
        )

    raise HTTPException(
        status_code=400,
        detail="Invalid vehicle type"
    )


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

    except HTTPException:
        raise

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

    try:

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
            petrol["total_cost"] - ev["total_cost"],
            2
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

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )


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
        vehicle = request.vehicle_type

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

        logger.info(
            "Trip saved successfully. Trip ID: %s",
            new_trip.id
        )

        return {
            "message": "Trip saved successfully",
            "trip_id": new_trip.id,
            "trip": trip_to_dict(new_trip)
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

    except SQLAlchemyError:
        db.rollback()
        logger.exception("Failed to save trip")

        raise HTTPException(
            status_code=500,
            detail="Unable to save trip due to a database error"
        )

    except Exception:
        db.rollback()
        logger.exception("Unexpected error while saving trip")

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

        result = get_trip_result(request)
        vehicle = request.vehicle_type

        trip.vehicle_type = vehicle
        trip.distance_km = request.distance

        trip.mileage = (
            request.mileage if vehicle == "petrol" else None
        )

        trip.petrol_price = (
            request.petrol_price if vehicle == "petrol" else None
        )

        trip.efficiency = (
            request.efficiency if vehicle == "ev" else None
        )

        trip.electricity_price = (
            request.electricity_price if vehicle == "ev" else None
        )

        trip.fuel_used_litres = result.get("fuel_used_litres")
        trip.energy_used_kwh = result.get("energy_used_kwh")

        trip.total_cost = result["total_cost"]
        trip.cost_per_km = result["cost_per_km"]

        db.commit()
        db.refresh(trip)

        logger.info(
            "Trip updated successfully. Trip ID: %s",
            trip_id
        )

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

    except SQLAlchemyError:
        db.rollback()
        logger.exception(
            "Failed to update trip ID: %s",
            trip_id
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to update trip due to a database error"
        )

    except Exception:
        db.rollback()
        logger.exception(
            "Unexpected error while updating trip ID: %s",
            trip_id
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to update trip"
        )


# ==========================================
# API 8: DELETE SAVED TRIP
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

    try:

        db.delete(trip)
        db.commit()

        logger.info(
            "Trip deleted successfully. Trip ID: %s",
            trip_id
        )

        return {
            "message": "Trip deleted successfully",
            "trip_id": trip_id
        }

    except SQLAlchemyError:
        db.rollback()
        logger.exception(
            "Failed to delete trip ID: %s",
            trip_id
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to delete trip due to a database error"
        )

    except Exception:
        db.rollback()
        logger.exception(
            "Unexpected error while deleting trip ID: %s",
            trip_id
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to delete trip"
        )


# ==========================================
# API 9: MONTHLY TRIP ANALYTICS WITH FILTERS
# ==========================================

@app.get("/api/analytics/monthly")
def get_monthly_analytics(
    year: int | None = None,
    month: int | None = None,
    db: Session = Depends(get_db)
):

    if year is not None and year < 1:
        raise HTTPException(
            status_code=400,
            detail="Year must be a positive number"
        )

    if month is not None and not 1 <= month <= 12:
        raise HTTPException(
            status_code=400,
            detail="Month must be between 1 and 12"
        )

    filtered_query = db.query(Trip).filter(
        Trip.created_at.isnot(None)
    )

    if year is not None:
        filtered_query = filtered_query.filter(
            extract("year", Trip.created_at) == year
        )

    if month is not None:
        filtered_query = filtered_query.filter(
            extract("month", Trip.created_at) == month
        )

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

            func.coalesce(
                func.sum(
                    case(
                        (Trip.vehicle_type == "petrol", Trip.distance_km),
                        else_=0
                    )
                ), 0
            ).label("petrol_distance"),

            func.coalesce(
                func.sum(
                    case(
                        (Trip.vehicle_type == "ev", Trip.distance_km),
                        else_=0
                    )
                ), 0
            ).label("ev_distance"),

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

        )
        .group_by(month_key)
        .order_by(month_key)
        .all()
    )

    monthly_data = []

    for record in monthly_records:

        date_object = datetime.strptime(
            record.month_key,
            "%Y-%m"
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


# ==========================================
# API 10: GENERATE PDF REPORT FOR A TRIP
# ==========================================

@app.get("/api/trips/{trip_id}/pdf")
def download_trip_pdf(
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

    buffer = BytesIO()

    document = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=20 * mm,
        leftMargin=20 * mm,
        topMargin=20 * mm,
        bottomMargin=20 * mm
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "FuelWiseTitle",
        parent=styles["Title"],
        fontSize=22,
        textColor=colors.HexColor("#176B55"),
        alignment=TA_CENTER,
        spaceAfter=8
    )

    subtitle_style = ParagraphStyle(
        "FuelWiseSubtitle",
        parent=styles["Normal"],
        fontSize=10,
        alignment=TA_CENTER,
        textColor=colors.grey,
        spaceAfter=20
    )

    story = []

    story.append(
        Paragraph("FuelWise", title_style)
    )

    story.append(
        Paragraph(
            "Smart Fuel Intelligence - Trip Report",
            subtitle_style
        )
    )

    story.append(Spacer(1, 10))

    trip_date = (
        trip.created_at.strftime("%d %B %Y, %I:%M %p")
        if trip.created_at else "Not available"
    )

    vehicle = trip.vehicle_type.upper()

    report_data = [
        ["Trip Information", "Details"],
        ["Trip ID", str(trip.id)],
        ["Vehicle Type", vehicle],
        ["Distance Travelled", f"{trip.distance_km:.2f} km"],
        ["Trip Date", trip_date],
    ]

    if trip.vehicle_type == "petrol":

        report_data.extend([
            ["Mileage", f"{trip.mileage} km/L"],
            ["Petrol Price", f"Rs. {trip.petrol_price}/L"],
            [
                "Fuel Consumed",
                f"{trip.fuel_used_litres:.2f} litres"
                if trip.fuel_used_litres is not None
                else "Not available"
            ],
        ])

    elif trip.vehicle_type == "ev":

        report_data.extend([
            ["EV Efficiency", f"{trip.efficiency} km/kWh"],
            [
                "Electricity Price",
                f"Rs. {trip.electricity_price}/kWh"
            ],
            [
                "Energy Consumed",
                f"{trip.energy_used_kwh:.2f} kWh"
                if trip.energy_used_kwh is not None
                else "Not available"
            ],
        ])

    report_data.extend([
        [
            "Total Trip Cost",
            f"Rs. {trip.total_cost:.2f}"
        ],
        [
            "Cost Per Kilometre",
            f"Rs. {trip.cost_per_km:.2f}/km"
        ]
    ])

    details_table = Table(
        report_data,
        colWidths=[65 * mm, 95 * mm]
    )

    details_table.setStyle(
        TableStyle([
            (
                "BACKGROUND",
                (0, 0),
                (-1, 0),
                colors.HexColor("#176B55")
            ),
            (
                "TEXTCOLOR",
                (0, 0),
                (-1, 0),
                colors.white
            ),
            (
                "FONTNAME",
                (0, 0),
                (-1, 0),
                "Helvetica-Bold"
            ),
            (
                "FONTNAME",
                (0, 1),
                (0, -1),
                "Helvetica-Bold"
            ),
            (
                "BACKGROUND",
                (0, 1),
                (-1, -1),
                colors.HexColor("#F4F8F6")
            ),
            (
                "GRID",
                (0, 0),
                (-1, -1),
                0.5,
                colors.HexColor("#D5E2DC")
            ),
            (
                "PADDING",
                (0, 0),
                (-1, -1),
                10
            ),
            (
                "VALIGN",
                (0, 0),
                (-1, -1),
                "MIDDLE"
            ),
        ])
    )

    story.append(details_table)
    story.append(Spacer(1, 25))

    story.append(
        Paragraph(
            "Thank you for using FuelWise!",
            ParagraphStyle(
                "Footer",
                parent=styles["Normal"],
                alignment=TA_CENTER,
                textColor=colors.HexColor("#176B55"),
                fontSize=12
            )
        )
    )

    document.build(story)

    buffer.seek(0)

    logger.info(
        "PDF report generated for trip ID: %s",
        trip_id
    )

    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={
            "Content-Disposition":
                f'attachment; filename="FuelWise_Trip_{trip.id}.pdf"'
        }
    )
