
import TripHistory from "./components/TripHistory";
import { useState } from "react";
import CostComparisonChart from "./components/CostComparisonChart";
import "./App.css";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [vehicleType, setVehicleType] = useState("petrol");
  const [distance, setDistance] = useState("100");
  const [mileage, setMileage] = useState("45");
  const [petrolPrice, setPetrolPrice] = useState("105");
  const [efficiency, setEfficiency] = useState("40");
  const [electricityPrice, setElectricityPrice] = useState("8");

  const [result, setResult] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Format currency
  const money = (amount) =>
    `₹${Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  // Calculate individual trip
  const calculateTrip = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    setComparison(null);

    const body = {
      vehicle_type: vehicleType,
      distance: Number(distance),
      ...(vehicleType === "petrol"
        ? {
            mileage: Number(mileage),
            petrol_price: Number(petrolPrice),
          }
        : {
            efficiency: Number(efficiency),
            electricity_price: Number(electricityPrice),
          }),
    };

    try {
      const response = await fetch(`${API_URL}/api/trip/estimate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail?.[0]?.msg ||
          data.detail ||
          "Calculation failed"
        );
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "Could not connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  // Compare Petrol and Electric vehicles
  const compareVehicles = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    setComparison(null);

    const body = {
      distance: Number(distance),
      mileage: Number(mileage),
      petrol_price: Number(petrolPrice),
      efficiency: Number(efficiency),
      electricity_price: Number(electricityPrice),
    };

    try {
      const response = await fetch(`${API_URL}/api/compare`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail?.[0]?.msg ||
          data.detail ||
          "Comparison failed"
        );
      }

      setComparison(data);
    } catch (err) {
      setError(err.message || "Could not connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      {/* Header */}
      <header className="topbar">
        <div className="brand">
          <span className="brand-icon">⚡</span>
          <span>FuelWise</span>
        </div>

        <span className="topbar-label">
          Smart Fuel Intelligence
        </span>
      </header>

      <main className="container">

        {/* Hero Section */}
        <section className="hero">
          <p className="eyebrow">SMART JOURNEY PLANNER</p>

          <h1>
            Plan your trip. <span>Save your fuel.</span>
          </h1>

          <p className="hero-text">
            Estimate your journey cost and compare petrol and electric vehicles.
          </p>
        </section>

        {/* Trip Calculator */}
        <section className="planner">

          <div className="section-heading">
            <div>
              <p className="eyebrow">TRIP CALCULATOR</p>
              <h2>Enter your trip details</h2>
            </div>

            <span className="step-label">
              01 / CALCULATE
            </span>
          </div>

          {/* Vehicle Selection */}
          <div className="field">
            <label>Choose vehicle type</label>

            <div className="vehicle-options">
              <button
                className={
                  vehicleType === "petrol"
                    ? "vehicle-option active"
                    : "vehicle-option"
                }
                onClick={() => {
                  setVehicleType("petrol");
                  setResult(null);
                  setError("");
                }}
                type="button"
              >
                ⛽ Petrol
              </button>

              <button
                className={
                  vehicleType === "ev"
                    ? "vehicle-option active"
                    : "vehicle-option"
                }
                onClick={() => {
                  setVehicleType("ev");
                  setResult(null);
                  setError("");
                }}
                type="button"
              >
                ⚡ Electric (EV)
              </button>
            </div>
          </div>

          {/* Input Fields */}
          <div className="form-grid">

            <div className="field">
              <label htmlFor="distance">
                Trip distance (km)
              </label>

              <input
                id="distance"
                type="number"
                min="0.1"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="Enter distance"
              />
            </div>

            {vehicleType === "petrol" ? (
              <>
                <div className="field">
                  <label htmlFor="mileage">
                    Vehicle mileage (km/L)
                  </label>

                  <input
                    id="mileage"
                    type="number"
                    min="0.1"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    placeholder="Example: 45"
                  />
                </div>

                <div className="field">
                  <label htmlFor="petrolPrice">
                    Petrol price (₹/L)
                  </label>

                  <input
                    id="petrolPrice"
                    type="number"
                    min="0.1"
                    value={petrolPrice}
                    onChange={(e) => setPetrolPrice(e.target.value)}
                    placeholder="Example: 105"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="field">
                  <label htmlFor="efficiency">
                    EV efficiency (km/kWh)
                  </label>

                  <input
                    id="efficiency"
                    type="number"
                    min="0.1"
                    value={efficiency}
                    onChange={(e) => setEfficiency(e.target.value)}
                    placeholder="Example: 40"
                  />
                </div>

                <div className="field">
                  <label htmlFor="electricityPrice">
                    Electricity price (₹/kWh)
                  </label>

                  <input
                    id="electricityPrice"
                    type="number"
                    min="0.1"
                    value={electricityPrice}
                    onChange={(e) => setElectricityPrice(e.target.value)}
                    placeholder="Example: 8"
                  />
                </div>
              </>
            )}

          </div>

          {/* Calculate Button */}
          <button
            className="primary-button"
            onClick={calculateTrip}
            disabled={loading}
          >
            {loading ? "Calculating..." : "Calculate Trip →"}
          </button>

          <p className="hint">
            Enter positive values. The estimate uses the mileage,
            efficiency and prices you provide.
          </p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

        </section>

        {/* Individual Trip Result */}
        {result && (
          <section className="results">

            <p className="eyebrow">YOUR ESTIMATE</p>

            <h2>{result.vehicle_type} trip summary</h2>

            <div className="result-grid">

              <div className="result-card">
                <span>Trip distance</span>
                <strong>{result.distance_km} km</strong>
              </div>

              <div className="result-card">
                <span>
                  {vehicleType === "petrol"
                    ? "Fuel required"
                    : "Energy required"}
                </span>

                <strong>
                  {vehicleType === "petrol"
                    ? `${result.fuel_used_litres} L`
                    : `${result.energy_used_kwh} kWh`}
                </strong>
              </div>

              <div className="result-card highlight">
                <span>Estimated trip cost</span>
                <strong>{money(result.total_cost)}</strong>
              </div>

              <div className="result-card">
                <span>Cost per kilometre</span>
                <strong>{money(result.cost_per_km)}/km</strong>
              </div>

            </div>
          </section>
        )}

        {/* Vehicle Comparison */}
        <section className="compare-section">

          <div>
            <p className="eyebrow">MAKE A SMARTER CHOICE</p>

            <h2>Petrol or Electric?</h2>

            <p>
              Compare the running cost of both vehicle types
              for the same distance.
            </p>
          </div>

          <button
            className="secondary-button"
            onClick={compareVehicles}
            disabled={loading}
          >
            {loading ? "Comparing..." : "Compare Both Vehicles"}
          </button>

        </section>

        {/* Comparison Results */}
        {comparison && (
          <section className="results">

            <p className="eyebrow">
              COMPARISON RESULT · {comparison.distance_km} KM
            </p>

            <h2>{comparison.cheaper_vehicle}</h2>

            <div className="result-grid">

              <div className="result-card">
                <span>Petrol trip cost</span>
                <strong>
                  {money(comparison.petrol.total_cost)}
                </strong>
              </div>

              <div className="result-card">
                <span>EV trip cost</span>
                <strong>
                  {money(comparison.electric.total_cost)}
                </strong>
              </div>

              <div className="result-card highlight">
                <span>Cost difference</span>
                <strong>{money(comparison.savings)}</strong>
              </div>

            </div>

            <p className="hint">
              This comparison uses your entered values and covers
              running energy cost only.
            </p>

            {/* Cost Comparison Chart */}
            <CostComparisonChart comparison={comparison} />

          </section>
        )}

        {/* NEW: Trip History Section */}
        <TripHistory />

        {/* Footer */}
        <footer>
          FuelWise · Smart Fuel Intelligence · Project prototype
        </footer>

      </main>
    </div>
  );
}

export default App;
