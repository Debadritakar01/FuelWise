
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def get_saved_trips():
    response = client.get("/api/trips")
    assert response.status_code == 200

    data = response.json()

    if isinstance(data, list):
        return data

    if isinstance(data, dict):
        return data.get("trips", [])

    return []


def test_pdf_export_missing_trip():
    response = client.get("/api/trips/-1/pdf")
    assert response.status_code == 404


def test_pdf_export_existing_trip():
    trips = get_saved_trips()

    if not trips:
        pytest.skip("No saved trips available for PDF testing")

    trip_id = trips[0]["id"]
    response = client.get(f"/api/trips/{trip_id}/pdf")

    assert response.status_code == 200
    assert response.headers["content-type"].startswith("application/pdf")
    assert response.content.startswith(b"%PDF")


def test_pdf_export_filename():
    trips = get_saved_trips()

    if not trips:
        pytest.skip("No saved trips available for PDF testing")

    trip_id = trips[0]["id"]
    response = client.get(f"/api/trips/{trip_id}/pdf")

    assert response.status_code == 200
    assert f"FuelWise_Trip_{trip_id}.pdf" in response.headers.get(
        "content-disposition", ""
    )


def test_petrol_trip_pdf():
    trips = get_saved_trips()
    petrol_trips = [
        trip for trip in trips
        if trip.get("vehicle_type") == "petrol"
    ]

    if not petrol_trips:
        pytest.skip("No saved petrol trips available")

    trip_id = petrol_trips[0]["id"]
    response = client.get(f"/api/trips/{trip_id}/pdf")

    assert response.status_code == 200
    assert response.content.startswith(b"%PDF")


def test_ev_trip_pdf():
    trips = get_saved_trips()
    ev_trips = [
        trip for trip in trips
        if trip.get("vehicle_type") == "ev"
    ]

    if not ev_trips:
        pytest.skip("No saved EV trips available")

    trip_id = ev_trips[0]["id"]
    response = client.get(f"/api/trips/{trip_id}/pdf")

    assert response.status_code == 200
    assert response.content.startswith(b"%PDF")
