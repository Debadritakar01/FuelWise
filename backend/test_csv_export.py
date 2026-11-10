
import csv
import io

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_csv_export_status_code():
    response = client.get("/api/trips/export/csv")

    assert response.status_code == 200


def test_csv_export_content_type():
    response = client.get("/api/trips/export/csv")

    assert "text/csv" in response.headers["content-type"]


def test_csv_export_filename():
    response = client.get("/api/trips/export/csv")

    assert "fuelwise_trips.csv" in response.headers.get(
        "content-disposition", ""
    )


def test_csv_export_headers():
    response = client.get("/api/trips/export/csv")

    reader = csv.reader(io.StringIO(response.text))
    headers = next(reader)

    expected_headers = [
        "Trip ID",
        "Vehicle Type",
        "Distance (KM)",
        "Mileage (KM/L)",
        "Petrol Price",
        "EV Efficiency (KM/KWH)",
        "Electricity Price",
        "Fuel Used (Litres)",
        "Energy Used (KWH)",
        "Total Cost",
        "Cost Per KM",
        "Created At"
    ]

    assert headers == expected_headers


def test_csv_export_valid_csv():
    response = client.get("/api/trips/export/csv")

    reader = csv.reader(io.StringIO(response.text))
    rows = list(reader)

    assert len(rows) >= 1
    assert len(rows[0]) == 12


def test_csv_export_trip_data():
    response = client.get("/api/trips/export/csv")

    reader = csv.DictReader(io.StringIO(response.text))
    rows = list(reader)

    for row in rows:
        assert row["Trip ID"] != ""
        assert row["Vehicle Type"] in ["petrol", "ev"]
        assert float(row["Distance (KM)"]) > 0
        assert float(row["Total Cost"]) >= 0
