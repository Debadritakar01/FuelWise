
import pytest

from services.calculations import calculate_petrol, calculate_ev


# ==========================================
# PETROL CALCULATION TESTS
# ==========================================

def test_petrol_calculation():
    result = calculate_petrol(100, 45, 105)

    assert result["vehicle_type"] == "Petrol"
    assert result["distance_km"] == 100
    assert result["fuel_used_litres"] == 2.22
    assert result["total_cost"] == 233.33
    assert result["cost_per_km"] == 2.33


def test_petrol_fuel_consumption():
    result = calculate_petrol(200, 50, 100)

    assert result["fuel_used_litres"] == 4.0


def test_petrol_cost_per_km():
    result = calculate_petrol(100, 50, 100)

    assert result["cost_per_km"] == 2.0


# ==========================================
# EV CALCULATION TESTS
# ==========================================

def test_ev_calculation():
    result = calculate_ev(100, 40, 8)

    assert result["vehicle_type"] == "Electric"
    assert result["distance_km"] == 100
    assert result["energy_used_kwh"] == 2.5
    assert result["total_cost"] == 20.0
    assert result["cost_per_km"] == 0.2


def test_ev_energy_consumption():
    result = calculate_ev(200, 50, 8)

    assert result["energy_used_kwh"] == 4.0


def test_ev_cost_per_km():
    result = calculate_ev(100, 50, 10)

    assert result["cost_per_km"] == 0.2


# ==========================================
# INVALID INPUT TESTS
# ==========================================

@pytest.mark.parametrize(
    "distance, mileage, petrol_price",
    [
        (0, 45, 105),
        (-100, 45, 105),
        (100, 0, 105),
        (100, -45, 105),
        (100, 45, 0),
        (100, 45, -105),
    ]
)
def test_invalid_petrol_values(distance, mileage, petrol_price):

    with pytest.raises(ValueError):
        calculate_petrol(distance, mileage, petrol_price)


@pytest.mark.parametrize(
    "distance, efficiency, electricity_price",
    [
        (0, 40, 8),
        (-100, 40, 8),
        (100, 0, 8),
        (100, -40, 8),
        (100, 40, 0),
        (100, 40, -8),
    ]
)
def test_invalid_ev_values(distance, efficiency, electricity_price):

    with pytest.raises(ValueError):
        calculate_ev(distance, efficiency, electricity_price)
