
import React, { useEffect, useState } from "react";
import "./TripHistory.css";
import TripDetails from "./TripDetails";
import EditTrip from "./EditTrip";
import MonthlyAnalytics from "./MonthlyAnalytics";

const API_URL = "http://127.0.0.1:8000";

function TripHistory() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedTripId, setSelectedTripId] = useState(null);
  const [editingTripId, setEditingTripId] = useState(null);

  // Search, filter and sorting states
  const [searchTerm, setSearchTerm] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState("newest");

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

  // Initial fetch
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

      // Notify Monthly Analytics
      window.dispatchEvent(new Event("tripsUpdated"));

      if (selectedTripId === tripId) {
        setSelectedTripId(null);
      }

      if (editingTripId === tripId) {
        setEditingTripId(null);
      }

    } catch (err) {
      alert(err.message);
    }
  };

  // Handle successful trip update
  const handleTripUpdated = async () => {
    setEditingTripId(null);

    await fetchTrips();

    // Notify Monthly Analytics
    window.dispatchEvent(new Event("tripsUpdated"));
  };

  // Convert date into local YYYY-MM-DD format
  const getLocalDate = (dateValue) => {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Search and filter trips
  const filteredTrips = trips.filter((trip) => {
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      String(trip.id ?? "").toLowerCase().includes(search) ||
      String(trip.vehicle_type || "").toLowerCase().includes(search) ||
      String(trip.distance_km ?? "").toLowerCase().includes(search);

    const matchesVehicle =
      vehicleFilter === "all" ||
      String(trip.vehicle_type || "").toLowerCase() === vehicleFilter;

    const tripDate = getLocalDate(trip.created_at);

    const matchesStartDate =
      !startDate || (tripDate && tripDate >= startDate);

    const matchesEndDate =
      !endDate || (tripDate && tripDate <= endDate);

    return (
      matchesSearch &&
      matchesVehicle &&
      matchesStartDate &&
      matchesEndDate
    );
  });

  // Sort filtered trips
  const sortedTrips = [...filteredTrips].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime() || 0;
    const dateB = new Date(b.created_at).getTime() || 0;

    switch (sortBy) {
      case "oldest":
        return dateA - dateB;

      case "highest_distance":
        return Number(b.distance_km || 0) -
          Number(a.distance_km || 0);

      case "lowest_distance":
        return Number(a.distance_km || 0) -
          Number(b.distance_km || 0);

      case "highest_cost":
        return Number(b.total_cost || 0) -
          Number(a.total_cost || 0);

      case "lowest_cost":
        return Number(a.total_cost || 0) -
          Number(b.total_cost || 0);

      case "newest":
      default:
        return dateB - dateA;
    }
  });

  // Clear all filters and sorting
  const clearFilters = () => {
    setSearchTerm("");
    setVehicleFilter("all");
    setStartDate("");
    setEndDate("");
    setSortBy("newest");
  };

  // ==========================================
  // EXPORT TRIP HISTORY AS CSV
  // ==========================================

  const exportTripsToCSV = () => {
    if (trips.length === 0) {
      alert("No trips available to export.");
      return;
    }

    const headers = [
      "Trip ID",
      "Vehicle Type",
      "Distance (KM)",
      "Mileage / Efficiency",
      "Fuel / Energy Consumed",
      "Total Cost (INR)",
      "Cost Per KM (INR)",
      "Created At"
    ];

    // Escape CSV values safely
    const escapeCSV = (value) => {
      const safeValue = String(value ?? "");
      return `"${safeValue.replace(/"/g, '""')}"`;
    };

    // Prepare trip records
    const rows = trips.map((trip) => [
      trip.id,
      trip.vehicle_type,
      trip.distance_km,
      trip.mileage ?? trip.efficiency ?? "",
      trip.fuel_consumed ?? trip.energy_consumed ?? "",
      trip.total_cost,
      trip.cost_per_km,
      trip.created_at
        ? new Date(trip.created_at).toLocaleString()
        : ""
    ]);

    // Generate CSV content
    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) =>
        row.map(escapeCSV).join(",")
      )
    ].join("\n");

    // Create downloadable CSV file
    const blob = new Blob(
      ["\uFEFF" + csvContent],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const today = getLocalDate(new Date());

    link.href = url;
    link.download = `FuelWise_Trip_History_${today}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // ==========================================
  // DASHBOARD ANALYTICS
  // ==========================================

  // Separate petrol and EV trips
  const petrolTrips = trips.filter(
    (trip) =>
      String(trip.vehicle_type || "").toLowerCase() === "petrol"
  );

  const evTrips = trips.filter(
    (trip) =>
      String(trip.vehicle_type || "").toLowerCase() === "ev"
  );

  // Petrol expenditure
  const petrolExpense = petrolTrips.reduce(
    (total, trip) => total + Number(trip.total_cost || 0),
    0
  );

  // EV expenditure
  const evExpense = evTrips.reduce(
    (total, trip) => total + Number(trip.total_cost || 0),
    0
  );

  // Total distance
  const totalDistance = trips.reduce(
    (total, trip) => total + Number(trip.distance_km || 0),
    0
  );

  // Total expenditure
  const totalExpense = trips.reduce(
    (total, trip) => total + Number(trip.total_cost || 0),
    0
  );

  // Weighted average cost per kilometre
  const averageCostPerKm =
    totalDistance > 0 ? totalExpense / totalDistance : 0;

  // Vehicle usage percentages
  const petrolPercentage =
    trips.length > 0
      ? (petrolTrips.length / trips.length) * 100
      : 0;

  const evPercentage =
    trips.length > 0
      ? (evTrips.length / trips.length) * 100
      : 0;

  // Loading state
  if (loading) {
    return (
      <div className="history-loading">
        Loading trip history...
      </div>
    );
  }

  // Error state
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

      {/* History Header */}
      <div className="history-header">
        <div>
          <h2>Trip History</h2>
          <p>View and manage your previously saved trips.</p>
        </div>

        <div className="history-header-actions">

          <button
            onClick={fetchTrips}
            className="refresh-btn"
          >
            Refresh
          </button>

          <button
            onClick={exportTripsToCSV}
            className="export-btn"
            disabled={trips.length === 0}
          >
            Export CSV
          </button>

        </div>
      </div>

      {/* Summary Cards */}
      <div className="history-summary">

        <div className="summary-card">
          <h3>{trips.length}</h3>
          <p>Total Trips</p>
        </div>

        <div className="summary-card">
          <h3>₹{totalExpense.toFixed(2)}</h3>
          <p>Total Estimated Cost</p>
        </div>

        <div className="summary-card">
          <h3>{totalDistance.toFixed(2)} km</h3>
          <p>Total Distance</p>
        </div>

      </div>

      {/* Dashboard Analytics */}
      <div className="analytics-section">

        <div className="analytics-header">
          <h2>FuelWise Analytics</h2>
          <p>Insights from all your saved journeys.</p>
        </div>

        {/* Analytics Cards */}
        <div className="analytics-grid">

          <div className="analytics-card">
            <h3>{trips.length}</h3>
            <p>Total Saved Trips</p>
          </div>

          <div className="analytics-card">
            <h3>{totalDistance.toFixed(2)} km</h3>
            <p>Total Distance</p>
          </div>

          <div className="analytics-card">
            <h3>₹{petrolExpense.toFixed(2)}</h3>
            <p>Petrol Expenditure</p>
          </div>

          <div className="analytics-card">
            <h3>₹{evExpense.toFixed(2)}</h3>
            <p>EV Expenditure</p>
          </div>

          <div className="analytics-card">
            <h3>₹{averageCostPerKm.toFixed(2)}</h3>
            <p>Average Cost / KM</p>
          </div>

        </div>

        {/* Vehicle Usage Comparison */}
        <div className="vehicle-analytics">

          <h3>Vehicle Usage Statistics</h3>

          {/* Petrol Usage */}
          <div className="usage-item">

            <div className="usage-label">
              <span>Petrol Vehicles</span>

              <strong>
                {petrolTrips.length} trips (
                {petrolPercentage.toFixed(1)}%)
              </strong>
            </div>

            <div className="usage-track">
              <div
                className="usage-fill petrol-fill"
                style={{ width: `${petrolPercentage}%` }}
              ></div>
            </div>

          </div>

          {/* EV Usage */}
          <div className="usage-item">

            <div className="usage-label">
              <span>Electric Vehicles</span>

              <strong>
                {evTrips.length} trips (
                {evPercentage.toFixed(1)}%)
              </strong>
            </div>

            <div className="usage-track">
              <div
                className="usage-fill ev-fill"
                style={{ width: `${evPercentage}%` }}
              ></div>
            </div>

          </div>

        </div>

      </div>

      {/* Monthly Analytics */}
      <MonthlyAnalytics trips={trips} />

      {/* Search and Filter Section */}
      <div className="history-filter-section">

        <div className="filter-header">
          <div>
            <h3>Search & Filter Trips</h3>
            <p>Find your saved journeys easily.</p>
          </div>

          <button
            className="clear-filter-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>

        <div className="filter-controls">

          {/* Search Input */}
          <div className="filter-group search-group">
            <label>Search Trips</label>

            <input
              type="text"
              placeholder="Search by ID, vehicle or distance..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Vehicle Filter */}
          <div className="filter-group">
            <label>Vehicle Type</label>

            <select
              value={vehicleFilter}
              onChange={(e) => setVehicleFilter(e.target.value)}
            >
              <option value="all">All Vehicles</option>
              <option value="petrol">Petrol</option>
              <option value="ev">Electric Vehicle</option>
            </select>
          </div>

          {/* Start Date */}
          <div className="filter-group">
            <label>From Date</label>

            <input
              type="date"
              value={startDate}
              max={endDate || undefined}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          {/* End Date */}
          <div className="filter-group">
            <label>To Date</label>

            <input
              type="date"
              value={endDate}
              min={startDate || undefined}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          {/* Sorting */}
          <div className="filter-group">
            <label>Sort By</label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest_distance">Highest Distance</option>
              <option value="lowest_distance">Lowest Distance</option>
              <option value="highest_cost">Highest Cost</option>
              <option value="lowest_cost">Lowest Cost</option>
            </select>
          </div>

        </div>

        {/* Results Count */}
        <div className="filter-results">
          <p>
            Showing <strong>{sortedTrips.length}</strong> of{" "}
            <strong>{trips.length}</strong> trips
          </p>
        </div>

      </div>

      {/* Filtered and Sorted Trip List */}
      {sortedTrips.length === 0 ? (

        <div className="empty-history">
          <h3>
            {trips.length === 0
              ? "No Trips Found"
              : "No Matching Trips"}
          </h3>

          <p>
            {trips.length === 0
              ? "Your saved trips will appear here."
              : "Try changing your search or filter options."}
          </p>

          {trips.length > 0 && (
            <button
              className="clear-filter-btn"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}
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

              {sortedTrips.map((trip) => (

                <tr key={trip.id}>

                  <td>#{trip.id}</td>

                  <td>
                    <span
                      className={`vehicle-badge ${trip.vehicle_type}`}
                    >
                      {String(trip.vehicle_type || "").toUpperCase()}
                    </span>
                  </td>

                  <td>{trip.distance_km} km</td>

                  <td>
                    ₹{Number(trip.total_cost || 0).toFixed(2)}
                  </td>

                  <td>
                    ₹{Number(trip.cost_per_km || 0).toFixed(2)}
                  </td>

                  <td>
                    {trip.created_at
                      ? new Date(trip.created_at).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td>
                    <div className="history-actions">

                      {/* View Details */}
                      <button
                        className="view-details-btn"
                        onClick={() => {
                          setEditingTripId(null);
                          setSelectedTripId(trip.id);
                        }}
                      >
                        View Details
                      </button>

                      {/* Edit */}
                      <button
                        className="edit-btn"
                        onClick={() => {
                          setSelectedTripId(null);
                          setEditingTripId(trip.id);
                        }}
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        className="delete-btn"
                        onClick={() => deleteTrip(trip.id)}
                      >
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

      {/* Edit Trip Component */}
      {editingTripId !== null && (
        <EditTrip
          tripId={editingTripId}
          onClose={() => setEditingTripId(null)}
          onUpdated={handleTripUpdated}
        />
      )}

      {/* Trip Details Modal */}
      {selectedTripId !== null && (
        <TripDetails
          tripId={selectedTripId}
          onClose={() => setSelectedTripId(null)}
        />
      )}

    </div>
  );
}

export default TripHistory;
