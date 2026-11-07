from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime, timezone

from database import Base


class Trip(Base):
    __tablename__ = "trips"

    id = Column(Integer, primary_key=True, index=True)
    vehicle_type = Column(String, nullable=False)
    distance_km = Column(Float, nullable=False)

    mileage = Column(Float, nullable=True)
    petrol_price = Column(Float, nullable=True)
    efficiency = Column(Float, nullable=True)
    electricity_price = Column(Float, nullable=True)

    fuel_used_litres = Column(Float, nullable=True)
    energy_used_kwh = Column(Float, nullable=True)

    total_cost = Column(Float, nullable=False)
    cost_per_km = Column(Float, nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
    