
def calculate_petrol(distance, mileage, petrol_price):

    if distance <= 0 or mileage <= 0 or petrol_price <= 0:
        raise ValueError("All values must be greater than zero")

    fuel_used = distance / mileage
    total_cost = fuel_used * petrol_price
    cost_per_km = total_cost / distance

    return {
        "vehicle_type": "Petrol",
        "distance_km": round(distance, 2),
        "fuel_used_litres": round(fuel_used, 2),
        "total_cost": round(total_cost, 2),
        "cost_per_km": round(cost_per_km, 2)
    }


def calculate_ev(distance, efficiency, electricity_price):

    if distance <= 0 or efficiency <= 0 or electricity_price <= 0:
        raise ValueError("All values must be greater than zero")

    energy_used = distance / efficiency
    total_cost = energy_used * electricity_price
    cost_per_km = total_cost / distance

    return {
        "vehicle_type": "Electric",
        "distance_km": round(distance, 2),
        "energy_used_kwh": round(energy_used, 2),
        "total_cost": round(total_cost, 2),
        "cost_per_km": round(cost_per_km, 2)
    }
