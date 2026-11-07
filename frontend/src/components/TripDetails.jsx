
import { useEffect, useState } from "react";
import "./TripDetails.css";

const API_URL = "http://127.0.0.1:8000";

function TripDetails({ tripId, onClose }) {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/trips/${tripId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.detail || "Failed to fetch trip details"
          );
        }

        setTrip(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (tripId) {
      fetchTripDetails();
    }
  }, [tripId]);

  const money = (amount) =>
    amount != null
      ? `₹${Number(amount).toFixed(2)}`
      : "N/A";

  if (loading) {
    return (
      <div className="trip-details-overlay">
        <div className="trip-details-modal">
          <p>Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="trip-details-overlay">
        <div className="trip-details-modal">
          <h2>Unable to load trip</h2>
          <p className="trip-details-error">{error}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  if (!trip) return null;

  const isEV = trip.vehicle_type?.toLowerCase() === "ev";

  return (
    <div
      className="trip-details-overlay"
      onClick={onClose}
    >
      <div
        className="trip-details-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="trip-details-header">
          <div>
            <p className="eyebrow">SAVED JOURNEY</p>
            <h2>Trip Details</h2>
            <span>Trip #{trip.id}</span>
          </div>

          <button
            className="trip-close-button"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="trip-details-content">

          <div className="trip-detail-card">
            <span>Vehicle Type</span>
            <strong>
              {isEV ? "⚡ Electric Vehicle" : "⛽ Petrol"}
            </strong>
          </div>

          <div className="trip-detail-card">
            <span>Trip Distance</span>
            <strong>{trip.distance_km} km</strong>
          </div>

          {!isEV && (
            <>
              <div className="trip-detail-card">
                <span>Vehicle Mileage</span>
                <strong>{trip.mileage ?? "N/A"} km/L</strong>
              </div>

              <div className="trip-detail-card">
                <span>Petrol Price</span>
                <strong>{money(trip.petrol_price)}/L</strong>
              </div>

              <div className="trip-detail-card">
                <span>Fuel Consumed</span>
                <strong>
                  {trip.fuel_used_litres ?? "N/A"} L
                </strong>
              </div>
            </>
          )}

          {isEV && (
            <>
              <div className="trip-detail-card">
                <span>EV Efficiency</span>
                <strong>{trip.efficiency ?? "N/A"} km/kWh</strong>
              </div>

              <div className="trip-detail-card">
                <span>Electricity Price</span>
                <strong>
                  {money(trip.electricity_price)}/kWh
                </strong>
              </div>

              <div className="trip-detail-card">
                <span>Energy Consumed</span>
                <strong>
                  {trip.energy_used_kwh ?? "N/A"} kWh
                </strong>
              </div>
            </>
          )}

          <div className="trip-detail-card highlight">
            <span>Total Trip Cost</span>
            <strong>{money(trip.total_cost)}</strong>
          </div>

          <div className="trip-detail-card">
            <span>Cost Per KM</span>
            <strong>{money(trip.cost_per_km)}/km</strong>
          </div>

        </div>

        <div className="trip-details-footer">
          <span>
            {trip.created_at
              ? new Date(trip.created_at).toLocaleString()
              : "Date unavailable"}
          </span>

          <button onClick={onClose}>
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripDetails;
