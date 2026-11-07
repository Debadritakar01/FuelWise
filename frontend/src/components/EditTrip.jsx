
import { useEffect, useState } from "react";
import "./EditTrip.css";

const API_URL = "http://127.0.0.1:8000";

function EditTrip({ tripId, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    vehicle_type: "petrol",
    distance: "",
    mileage: "",
    petrol_price: "",
    efficiency: "",
    electricity_price: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load existing trip details
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/trips/${tripId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Unable to load trip");
        }

        setFormData({
          vehicle_type: data.vehicle_type,
          distance: data.distance_km,
          mileage: data.mileage ?? "",
          petrol_price: data.petrol_price ?? "",
          efficiency: data.efficiency ?? "",
          electricity_price: data.electricity_price ?? "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [tripId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Update saved trip
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const payload = {
      vehicle_type: formData.vehicle_type,
      distance: Number(formData.distance),
    };

    if (formData.vehicle_type === "petrol") {
      payload.mileage = Number(formData.mileage);
      payload.petrol_price = Number(formData.petrol_price);
    } else {
      payload.efficiency = Number(formData.efficiency);
      payload.electricity_price = Number(
        formData.electricity_price
      );
    }

    try {
      setSaving(true);

      const response = await fetch(
        `${API_URL}/api/trips/${tripId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Unable to update trip");
      }

      setSuccess("Trip updated successfully!");

      // Refresh parent trip history
      await onUpdated();

      onClose();

    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-trip-overlay">
        <div className="edit-trip-modal">
          Loading trip information...
        </div>
      </div>
    );
  }

  return (
    <div className="edit-trip-overlay">
      <div className="edit-trip-modal">

        <div className="edit-trip-header">
          <div>
            <p>FUELWISE / TRIP MANAGEMENT</p>
            <h2>Edit Saved Trip</h2>
            <span>Trip #{tripId}</span>
          </div>

          <button onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>

          <label>Vehicle Type</label>

          <select
            name="vehicle_type"
            value={formData.vehicle_type}
            onChange={handleChange}
          >
            <option value="petrol">Petrol</option>
            <option value="ev">Electric Vehicle</option>
          </select>

          <label>Trip Distance (km)</label>

          <input
            type="number"
            name="distance"
            min="0.01"
            step="any"
            value={formData.distance}
            onChange={handleChange}
            required
          />

          {formData.vehicle_type === "petrol" ? (
            <>
              <label>Vehicle Mileage (km/L)</label>

              <input
                type="number"
                name="mileage"
                min="0.01"
                step="any"
                value={formData.mileage}
                onChange={handleChange}
                required
              />

              <label>Petrol Price (₹/L)</label>

              <input
                type="number"
                name="petrol_price"
                min="0.01"
                step="any"
                value={formData.petrol_price}
                onChange={handleChange}
                required
              />
            </>
          ) : (
            <>
              <label>EV Efficiency (km/kWh)</label>

              <input
                type="number"
                name="efficiency"
                min="0.01"
                step="any"
                value={formData.efficiency}
                onChange={handleChange}
                required
              />

              <label>Electricity Price (₹/kWh)</label>

              <input
                type="number"
                name="electricity_price"
                min="0.01"
                step="any"
                value={formData.electricity_price}
                onChange={handleChange}
                required
              />
            </>
          )}

          {error && (
            <p className="edit-error">{error}</p>
          )}

          {success && (
            <p className="edit-success">{success}</p>
          )}

          <div className="edit-trip-actions">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>

            <button type="submit" disabled={saving}>
              {saving ? "Updating..." : "Update Trip"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditTrip;
