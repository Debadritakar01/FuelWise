
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_invalid_trip_id_returns_422():
    response = client.get("/api/trips/not-a-number")
    assert response.status_code == 422


def test_nonexistent_trip_returns_404():
    response = client.get("/api/trips/99999999")
    assert response.status_code == 404


def test_negative_distance_is_rejected():
    payload = {
        "vehicle_type": "petrol",
        "distance": -100,
        "mileage": 45,
        "petrol_price": 105
    }

    response = client.post("/api/trip/estimate", json=payload)
    assert response.status_code == 422


def test_empty_estimate_request_is_rejected():
    response = client.post("/api/trip/estimate", json={})
    assert response.status_code == 422


def test_invalid_vehicle_type_is_rejected():
    payload = {
        "vehicle_type": "unknown",
        "distance": 100,
        "mileage": 45,
        "petrol_price": 105
    }

    response = client.post("/api/trip/estimate", json=payload)
    assert response.status_code == 422
