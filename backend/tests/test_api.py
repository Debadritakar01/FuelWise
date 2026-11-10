
import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BACKEND_DIR))
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert isinstance(response.json(), dict)


def test_estimate_rejects_empty_request():
    response = client.post("/api/trip/estimate", json={})
    assert response.status_code == 422


def test_compare_rejects_empty_request():
    response = client.post("/api/compare", json={})
    assert response.status_code == 422


def test_trip_history_endpoint():
    response = client.get("/api/trips")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
def test_petrol_estimate_success():
    response = client.post(
        "/api/trip/estimate",
        json={
            "vehicle_type": "petrol",
            "distance": 100,
            "mileage": 45,
            "petrol_price": 105
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["vehicle_type"] == "Petrol"
    assert data["total_cost"] == 233.33
    assert data["cost_per_km"] == 2.33


def test_ev_estimate_success():
    response = client.post(
        "/api/trip/estimate",
        json={
            "vehicle_type": "ev",
            "distance": 100,
            "efficiency": 40,
            "electricity_price": 8
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["vehicle_type"] == "Electric"
    assert data["total_cost"] == 20.0
    assert data["cost_per_km"] == 0.2
    import pytest


@pytest.mark.parametrize(
    "payload",
    [
        {
            "vehicle_type": "petrol",
            "distance": 0,
            "mileage": 45,
            "petrol_price": 105
        },
        {
            "vehicle_type": "petrol",
            "distance": -100,
            "mileage": 45,
            "petrol_price": 105
        },
        {
            "vehicle_type": "diesel",
            "distance": 100,
            "mileage": 45,
            "petrol_price": 105
        }
    ]
)
def test_estimate_rejects_invalid_inputs(payload):
    response = client.post(
        "/api/trip/estimate",
        json=payload
    )

    assert response.status_code == 422