
import { useEffect, useState } from "react";
import "./TripDetails.css";

const API_URL = "http://127.0.0.1:8000";

function TripDetails({ tripId, onClose }) {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  // Fetch trip details
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
            data.message || data.detail || "Failed to fetch trip details"
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

  // Download PDF report
  const downloadPDF = async () => {
    try {
      setDownloading(true);

      const response = await fetch(
        `${API_URL}/api/trips/${trip.id}/pdf`
      );

      if (!response.ok) {
        let errorMessage = "Unable to download PDF report";

        try {
          const data = await response.json();
          errorMessage = data.message || data.detail || errorMessage;
        } catch {
          // Keep default error message if response is not JSON
        }

        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `FuelWise_Trip_${trip.id}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download error:", error);
      alert(error.message);
    } finally {
      setDownloading(false);
    }
  };

  // Currency formatter
  const money = (amount) =>
    amount != null
      ? `₹${Number(amount).toFixed(2)}`
      : "N/A";

  // Loading state
  if (loading) {
    return (
      <div className="trip-details-overlay">
        <div className="trip-details-modal">
          <p>Loading trip details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="trip-details-overlay">
        <div className="trip-details-modal">
          <h2>Unable to load trip</h2>
          <p className="trip-details-error">{error}</p>

          <button onClick={onClose}>
            Close
          </button>
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
        {/* Header */}
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

        {/* Trip Details */}
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

          {/* Petrol Details */}
          {!isEV && (
            <>
              <div className="trip-detail-card">
                <span>Vehicle Mileage</span>
                <strong>
                  {trip.mileage ?? "N/A"} km/L
                </strong>
              </div>

              <div className="trip-detail-card">
                <span>Petrol Price</span>
                <strong>
                  {money(trip.petrol_price)}/L
                </strong>
              </div>

              <div className="trip-detail-card">
                <span>Fuel Consumed</span>
                <strong>
                  {trip.fuel_used_litres ?? "N/A"} L
                </strong>
              </div>
            </>
          )}

          {/* EV Details */}
          {isEV && (
            <>
              <div className="trip-detail-card">
                <span>EV Efficiency</span>
                <strong>
                  {trip.efficiency ?? "N/A"} km/kWh
                </strong>
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

          {/* Cost Details */}
          <div className="trip-detail-card highlight">
            <span>Total Trip Cost</span>
            <strong>{money(trip.total_cost)}</strong>
          </div>

          <div className="trip-detail-card">
            <span>Cost Per KM</span>
            <strong>{money(trip.cost_per_km)}/km</strong>
          </div>

        </div>

        {/* Footer */}
        <div className="trip-details-footer">
          <span>
            {trip.created_at
              ? new Date(trip.created_at).toLocaleString()
              : "Date unavailable"}
          </span>

          <div className="trip-details-actions">
            <button
              className="download-pdf-btn"
              onClick={downloadPDF}
              disabled={downloading}
            >
              {downloading ? "Downloading..." : "Download PDF"}
            </button>

            <button onClick={onClose}>
              Close Details
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TripDetails;
