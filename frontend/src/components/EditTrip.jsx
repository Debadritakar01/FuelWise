
import { useState } from "react";

const API_URL = "http://127.0.0.1:8000";

function EditTrip({ trip, onUpdated, onCancel }) {
  const [vehicleType, setVehicleType] = useState(
    trip.vehicle_type === "electric" ? "ev" : trip.vehicle_type
  );

  const [distance, setDistance] = useState(String(trip.distance_km));
  const [mileage, setMileage] = useState(String(trip.mileage ?? ""));
  const [petrolPrice, setPetrolPrice] = useState(
    String(trip.petrol_price ?? "")
  );
  const [efficiency, setEfficiency] = useState(
    String(trip.efficiency ?? "")
  );
  const [electricityPrice, setElectricityPrice] = useState(
    String(trip.electricity_price ?? "")
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const requestBody = {
      vehicle_type: vehicleType,
      distance: Number(distance),
      mileage: vehicleType === "petrol" ? Number(mileage) : null,
      petrol_price:
        vehicleType === "petrol" ? Number(petrolPrice) : null,
      efficiency: vehicleType === "ev" ? Number(efficiency) : null,
      electricity_price:
        vehicleType === "ev" ? Number(electricityPrice) : null,
    };

    try {
      const response = await fetch(
        `${API_URL}/api/trips/${trip.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Unable to update trip");
      }

      alert("Trip updated successfully!");
      onUpdated();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-trip-container">
      <h2>Edit Trip #{trip.id}</h2>

      <form onSubmit={handleSubmit}>
        <label>Vehicle Type</label>
        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        >
          <option value="petrol">Petrol</option>
          <option value="ev">Electric Vehicle</option>
        </select>

        <label>Distance (km)</label>
        <input
          type="number"
          min="0.01"
          step="any"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          required
        />

        {vehicleType === "petrol" ? (
          <>
            <label>Mileage (km/L)</label>
            <input
              type="number"
              min="0.01"
              step="any"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              required
            />

            <label>Petrol Price (₹/L)</label>
            <input
              type="number"
              min="0.01"
              step="any"
              value={petrolPrice}
              onChange={(e) => setPetrolPrice(e.target.value)}
              required
            />
          </>
        ) : (
          <>
            <label>EV Efficiency (km/kWh)</label>
            <input
              type="number"
              min="0.01"
              step="any"
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)}
              required
            />

            <label>Electricity Price (₹/kWh)</label>
            <input
              type="number"
              min="0.01"
              step="any"
              value={electricityPrice}
              onChange={(e) => setElectricityPrice(e.target.value)}
              required
            />
          </>
        )}

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Trip"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditTrip;
