
import React, { useEffect, useState } from "react";
import "./TripHistory.css";

const API_URL = "http://127.0.0.1:8000";

function TripHistory() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch saved trips
  const fetchTrips = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/trips`);

      if (!response.ok) {
        throw new Error("Unable to fetch trip history");
      }

      const data = await response.json();
      setTrips(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load trips when component mounts
  useEffect(() => {
    fetchTrips();
  }, []);

  // Delete a trip
  const deleteTrip = async (tripId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/api/trips/${tripId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Unable to delete trip");
      }

      setTrips((previousTrips) =>
        previousTrips.filter((trip) => trip.id !== tripId)
      );

    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="history-loading">Loading trip history...</div>;
  }

  if (error) {
    return (
      <div className="history-error">
        <p>{error}</p>
        <button onClick={fetchTrips}>Retry</button>
      </div>
    );
  }

  return (
    <div className="trip-history-container">

      <div className="history-header">
        <div>
          <h2>Trip History</h2>
          <p>View and manage your previously saved trips.</p>
        </div>

        <button onClick={fetchTrips} className="refresh-btn">
          Refresh
        </button>
      </div>

      <div className="history-summary">
        <div className="summary-card">
          <h3>{trips.length}</h3>
          <p>Total Trips</p>
        </div>

        <div className="summary-card">
          <h3>
            ₹{trips.reduce(
              (total, trip) => total + Number(trip.total_cost || 0),
              0
            ).toFixed(2)}
          </h3>
          <p>Total Estimated Cost</p>
        </div>

        <div className="summary-card">
          <h3>
            {trips.reduce(
              (total, trip) => total + Number(trip.distance_km || 0),
              0
            ).toFixed(2)} km
          </h3>
          <p>Total Distance</p>
        </div>
      </div>

      {trips.length === 0 ? (
        <div className="empty-history">
          <h3>No Trips Found</h3>
          <p>Your saved trips will appear here.</p>
        </div>
      ) : (
        <div className="history-table-wrapper">
          <table className="history-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Vehicle</th>
                <th>Distance</th>
                <th>Total Cost</th>
                <th>Cost / KM</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {trips.map((trip) => (
                <tr key={trip.id}>
                  <td>#{trip.id}</td>

                  <td>
                    <span className={`vehicle-badge ${trip.vehicle_type}`}>
                      {trip.vehicle_type.toUpperCase()}
                    </span>
                  </td>

                  <td>{trip.distance_km} km</td>

                  <td>₹{Number(trip.total_cost).toFixed(2)}</td>

                  <td>₹{Number(trip.cost_per_km).toFixed(2)}</td>

                  <td>
                    {trip.created_at
                      ? new Date(trip.created_at).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteTrip(trip.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
}

export default TripHistory;
