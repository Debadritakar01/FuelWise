
import React, { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line
} from "recharts";

import "./MonthlyAnalytics.css";

const API_URL = "http://127.0.0.1:8000";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function MonthlyAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentDate = new Date();
  const currentYear = String(currentDate.getFullYear());

  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // =====================================
  // FETCH MONTHLY ANALYTICS
  // =====================================

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/analytics/monthly`
      );

      if (!response.ok) {
        throw new Error(
          "Unable to fetch monthly analytics."
        );
      }

      const data = await response.json();

      setAnalytics(data);

    } catch (err) {
      setError(
        err.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // INITIAL LOAD AND AUTO REFRESH
  // =====================================

  useEffect(() => {
    fetchAnalytics();

    const handleTripsUpdated = () => {
      fetchAnalytics();
    };

    window.addEventListener(
      "tripsUpdated",
      handleTripsUpdated
    );

    return () => {
      window.removeEventListener(
        "tripsUpdated",
        handleTripsUpdated
      );
    };
  }, []);

  // =====================================
  // LOADING STATE
  // =====================================

  if (loading) {
    return (
      <div className="monthly-analytics-section">
        <h2>Monthly Analytics</h2>

        <div className="monthly-empty">
          Loading monthly analytics...
        </div>
      </div>
    );
  }

  // =====================================
  // ERROR STATE
  // =====================================

  if (error) {
    return (
      <div className="monthly-analytics-section">
        <h2>Monthly Analytics</h2>

        <div className="monthly-empty">
          <h3>Something went wrong</h3>

          <p>{error}</p>

          <button onClick={fetchAnalytics}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  // =====================================
  // PREPARE MONTHLY DATA
  // =====================================

  const monthlyData = (
    analytics?.monthly_data || []
  ).map((item) => {
    const monthNumber =
      MONTHS.indexOf(item.month) + 1;

    return {
      ...item,

      monthNumber,

      monthKey: `${item.year}-${String(
        monthNumber
      ).padStart(2, "0")}`,

      month: `${item.month.substring(0, 3)} ${item.year}`,

      petrolExpense:
        Number(item.petrol_expense) || 0,

      evExpense:
        Number(item.ev_expense) || 0,

      totalExpense:
        Number(item.total_expenses) || 0,

      totalTrips:
        Number(item.total_trips) || 0,

      totalDistance:
        Number(item.total_distance) || 0,

      petrolDistance:
        Number(item.petrol_distance) || 0,

      evDistance:
        Number(item.ev_distance) || 0
    };
  }).filter((item) => item.monthNumber > 0);

  // =====================================
  // AVAILABLE YEARS
  // =====================================

  const availableYears = [
    ...new Set([
      currentYear,
      ...monthlyData.map((item) =>
        String(item.year)
      )
    ])
  ].sort((a, b) => Number(b) - Number(a));

  // =====================================
  // APPLY MONTH AND YEAR FILTERS
  // =====================================

  const filteredMonthlyData = monthlyData.filter(
    (item) => {
      const yearMatch =
        String(item.year) === selectedYear;

      const monthMatch =
        selectedMonth === "all" ||
        item.monthNumber === Number(selectedMonth);

      return yearMatch && monthMatch;
    }
  );

  // =====================================
  // CALCULATE FILTERED TOTALS
  // =====================================

  const filteredTotals = filteredMonthlyData.reduce(
    (totals, item) => ({
      totalTrips:
        totals.totalTrips + item.totalTrips,

      totalDistance:
        totals.totalDistance + item.totalDistance,

      totalExpenses:
        totals.totalExpenses + item.totalExpense,

      petrolExpense:
        totals.petrolExpense + item.petrolExpense,

      evExpense:
        totals.evExpense + item.evExpense,

      petrolDistance:
        totals.petrolDistance + item.petrolDistance,

      evDistance:
        totals.evDistance + item.evDistance
    }),
    {
      totalTrips: 0,
      totalDistance: 0,
      totalExpenses: 0,
      petrolExpense: 0,
      evExpense: 0,
      petrolDistance: 0,
      evDistance: 0
    }
  );

  // =====================================
  // FORMAT CURRENCY
  // =====================================

  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;

  // =====================================
  // SMART MONTHLY SPENDING INSIGHTS
  // =====================================

  const monthsWithTrips = filteredMonthlyData.filter(
    (item) => item.totalTrips > 0
  );

  const monthsWithExpenses = monthsWithTrips.filter(
    (item) => item.totalExpense > 0
  );

  // Highest spending month
  const highestSpendingMonth =
    monthsWithExpenses.length > 0
      ? [...monthsWithExpenses].sort(
          (a, b) => b.totalExpense - a.totalExpense
        )[0]
      : null;

  // Lowest spending month
  const lowestSpendingMonth =
    monthsWithExpenses.length > 0
      ? [...monthsWithExpenses].sort(
          (a, b) => a.totalExpense - b.totalExpense
        )[0]
      : null;

  // Highest travel distance month
  const highestDistanceMonth =
    monthsWithTrips.length > 0
      ? [...monthsWithTrips].sort(
          (a, b) => b.totalDistance - a.totalDistance
        )[0]
      : null;

  // Average monthly spending
  const averageMonthlySpending =
    monthsWithExpenses.length > 0
      ? filteredTotals.totalExpenses /
        monthsWithExpenses.length
      : 0;

  // Petrol spending percentage
  const petrolSpendingPercentage =
    filteredTotals.totalExpenses > 0
      ? (filteredTotals.petrolExpense /
          filteredTotals.totalExpenses) * 100
      : 0;

  // EV spending percentage
  const evSpendingPercentage =
    filteredTotals.totalExpenses > 0
      ? (filteredTotals.evExpense /
          filteredTotals.totalExpenses) * 100
      : 0;

  // =====================================
  // FUELWISE SAVINGS INSIGHTS
  // =====================================

  const petrolCostPerKm =
    filteredTotals.petrolDistance > 0
      ? filteredTotals.petrolExpense /
        filteredTotals.petrolDistance
      : 0;

  const evCostPerKm =
    filteredTotals.evDistance > 0
      ? filteredTotals.evExpense /
        filteredTotals.evDistance
      : 0;

  const hasComparableData =
    filteredTotals.petrolDistance > 0 &&
    filteredTotals.evDistance > 0;

  const comparisonDistance =
    filteredTotals.totalDistance;

  const estimatedPetrolCost =
    petrolCostPerKm * comparisonDistance;

  const estimatedEVCost =
    evCostPerKm * comparisonDistance;

  const estimatedSavings =
    estimatedPetrolCost - estimatedEVCost;

  const savingsPercentage =
    estimatedPetrolCost > 0
      ? (estimatedSavings / estimatedPetrolCost) * 100
      : 0;

  let recommendation = "";

  if (hasComparableData) {
    if (estimatedSavings > 0) {
      recommendation =
        "Based on your recorded running costs, EV travel could be more economical.";
    } else if (estimatedSavings < 0) {
      recommendation =
        "Based on your recorded running costs, petrol travel is currently more economical.";
    } else {
      recommendation =
        "Both vehicle types have similar running costs based on your records.";
    }
  }

  // =====================================
  // MAIN DASHBOARD
  // =====================================

  return (
    <div className="monthly-analytics-section">

      {/* HEADER */}

      <div className="monthly-header">
        <h2>Monthly Analytics</h2>

        <p>
          Analyze your monthly travel expenses,
          distance and journey activity.
        </p>
      </div>

      {/* MONTH AND YEAR FILTERS */}

      <div className="monthly-filters">

        <div className="monthly-filter-group">
          <label htmlFor="monthFilter">
            Select Month
          </label>

          <select
            id="monthFilter"
            value={selectedMonth}
            onChange={(e) =>
              setSelectedMonth(e.target.value)
            }
          >
            <option value="all">All Months</option>

            {MONTHS.map((month, index) => (
              <option
                key={month}
                value={String(index + 1)}
              >
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="monthly-filter-group">
          <label htmlFor="yearFilter">
            Select Year
          </label>

          <select
            id="yearFilter"
            value={selectedYear}
            onChange={(e) =>
              setSelectedYear(e.target.value)
            }
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setSelectedMonth("all");
            setSelectedYear(currentYear);
          }}
        >
          Reset Filters
        </button>

      </div>

      {/* SUMMARY CARDS */}

      <div className="monthly-summary-grid">

        <div className="monthly-summary-card">
          <h3>{filteredTotals.totalTrips}</h3>
          <p>Total Trips</p>
        </div>

        <div className="monthly-summary-card">
          <h3>
            {filteredTotals.totalDistance.toFixed(2)} km
          </h3>
          <p>Total Distance</p>
        </div>

        <div className="monthly-summary-card">
          <h3>
            {formatCurrency(filteredTotals.totalExpenses)}
          </h3>
          <p>Total Expenses</p>
        </div>

        <div className="monthly-summary-card">
          <h3>
            {formatCurrency(filteredTotals.petrolExpense)}
          </h3>
          <p>Petrol Expenses</p>
        </div>

        <div className="monthly-summary-card">
          <h3>
            {formatCurrency(filteredTotals.evExpense)}
          </h3>
          <p>EV Expenses</p>
        </div>

      </div>

      {/* SMART MONTHLY SPENDING INSIGHTS */}

      <div className="smart-insights-section">

        <div className="monthly-chart-heading">
          <h3>📊 Smart Monthly Spending Insights</h3>

          <p>
            Understand your travel expenses and spending
            patterns for the selected period.
          </p>
        </div>

        <div className="smart-insights-grid">

          <div className="smart-insight-card">
            <span>Highest Spending Month</span>

            <h2>
              {highestSpendingMonth
                ? formatCurrency(highestSpendingMonth.totalExpense)
                : "₹0.00"}
            </h2>

            <p>
              {highestSpendingMonth
                ? highestSpendingMonth.month
                : "No expense data"}
            </p>
          </div>

          <div className="smart-insight-card">
            <span>Lowest Spending Month</span>

            <h2>
              {lowestSpendingMonth
                ? formatCurrency(lowestSpendingMonth.totalExpense)
                : "₹0.00"}
            </h2>

            <p>
              {lowestSpendingMonth
                ? lowestSpendingMonth.month
                : "No expense data"}
            </p>
          </div>

          <div className="smart-insight-card">
            <span>Average Monthly Spending</span>

            <h2>
              {formatCurrency(averageMonthlySpending)}
            </h2>

            <p>
              Average per month with recorded expenses
            </p>
          </div>

          <div className="smart-insight-card">
            <span>Highest Travel Distance</span>

            <h2>
              {highestDistanceMonth
                ? `${highestDistanceMonth.totalDistance.toFixed(2)} km`
                : "0 km"}
            </h2>

            <p>
              {highestDistanceMonth
                ? highestDistanceMonth.month
                : "No travel data"}
            </p>
          </div>

        </div>

        {/* PETROL VS EV SPENDING */}

        <div className="spending-percentage-card">

          <h3>Petrol vs EV Spending Distribution</h3>

          <p>
            See how your total travel expenses are distributed.
          </p>

          <div className="spending-percentage-row">

            <div className="spending-percentage-label">
              <strong>Petrol</strong>

              <strong>
                {petrolSpendingPercentage.toFixed(1)}%
              </strong>
            </div>

            <div className="spending-progress">
              <div
                className="spending-progress-petrol"
                style={{
                  width: `${petrolSpendingPercentage}%`
                }}
              />
            </div>

            <p>
              {formatCurrency(filteredTotals.petrolExpense)}
            </p>

          </div>

          <div className="spending-percentage-row">

            <div className="spending-percentage-label">
              <strong>Electric Vehicle</strong>

              <strong>
                {evSpendingPercentage.toFixed(1)}%
              </strong>
            </div>

            <div className="spending-progress">
              <div
                className="spending-progress-ev"
                style={{
                  width: `${evSpendingPercentage}%`
                }}
              />
            </div>

            <p>
              {formatCurrency(filteredTotals.evExpense)}
            </p>

          </div>

        </div>

      </div>

      {/* FUELWISE SAVINGS INSIGHTS */}

      <div className="savings-insights-section">

        <div className="monthly-chart-heading">
          <h3>⚡ FuelWise Savings Insights</h3>

          <p>
            Compare petrol and EV running costs
            using your recorded travel data.
          </p>
        </div>

        {hasComparableData ? (
          <>

            <div className="savings-insights-grid">

              <div className="savings-insight-card">
                <h4>Petrol Cost / KM</h4>

                <h2>
                  {formatCurrency(petrolCostPerKm)}
                </h2>
              </div>

              <div className="savings-insight-card">
                <h4>EV Cost / KM</h4>

                <h2>
                  {formatCurrency(evCostPerKm)}
                </h2>
              </div>

              <div className="savings-insight-card">
                <h4>Estimated Petrol Cost</h4>

                <h2>
                  {formatCurrency(estimatedPetrolCost)}
                </h2>
              </div>

              <div className="savings-insight-card">
                <h4>Estimated EV Cost</h4>

                <h2>
                  {formatCurrency(estimatedEVCost)}
                </h2>
              </div>

            </div>

            <div className="savings-highlight-card">

              <h3>
                {estimatedSavings >= 0
                  ? "Potential EV Savings"
                  : "Petrol is Currently Cheaper"}
              </h3>

              <h2>
                {formatCurrency(Math.abs(estimatedSavings))}
              </h2>

              <p>
                Estimated comparison over{" "}
                {comparisonDistance.toFixed(2)} km
                using your recorded average running costs.
              </p>

              <p>
                {estimatedSavings >= 0
                  ? `${savingsPercentage.toFixed(2)}% potential savings with EV.`
                  : `${Math.abs(savingsPercentage).toFixed(2)}% higher EV running cost.`}
              </p>

              <strong>{recommendation}</strong>

            </div>

          </>
        ) : (

          <div className="monthly-empty">
            <h3>Not Enough Comparison Data</h3>

            <p>
              Save at least one petrol trip and one EV trip
              in the selected period to generate savings
              insights.
            </p>
          </div>

        )}

      </div>

      {/* FILTERED MONTHLY DATA */}

      {filteredMonthlyData.length === 0 ? (

        <div className="monthly-empty">
          <h3>No Monthly Data Available</h3>

          <p>
            No trips found for the selected month and year.
            Try selecting another period.
          </p>
        </div>

      ) : (

        <>

          {/* MONTHLY EXPENSE COMPARISON */}

          <div className="monthly-chart-card">

            <div className="monthly-chart-heading">
              <h3>Monthly Expense Comparison</h3>

              <p>
                Petrol vs Electric Vehicle expenditure.
              </p>
            </div>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={filteredMonthlyData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis
                  tickFormatter={(value) => `₹${value}`}
                />

                <Tooltip
                  formatter={(value) =>
                    formatCurrency(value)
                  }
                />

                <Legend />

                <Bar
                  dataKey="petrolExpense"
                  name="Petrol Expense"
                  fill="#f59e0b"
                  radius={[5, 5, 0, 0]}
                />

                <Bar
                  dataKey="evExpense"
                  name="EV Expense"
                  fill="#16a36a"
                  radius={[5, 5, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

          {/* MONTHLY DISTANCE COMPARISON */}

          <div className="monthly-chart-card">

            <div className="monthly-chart-heading">
              <h3>Monthly Distance Comparison</h3>

              <p>
                Compare petrol and EV travel distance
                month by month.
              </p>
            </div>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={filteredMonthlyData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis
                  tickFormatter={(value) => `${value} km`}
                />

                <Tooltip
                  formatter={(value) =>
                    `${Number(value).toFixed(2)} km`
                  }
                />

                <Legend />

                <Bar
                  dataKey="petrolDistance"
                  name="Petrol Distance"
                  fill="#f59e0b"
                  radius={[5, 5, 0, 0]}
                />

                <Bar
                  dataKey="evDistance"
                  name="EV Distance"
                  fill="#16a36a"
                  radius={[5, 5, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

          {/* MONTHLY TRIP ACTIVITY */}

          <div className="monthly-chart-card">

            <div className="monthly-chart-heading">
              <h3>Monthly Trip Activity</h3>

              <p>
                Number of journeys completed each month.
              </p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredMonthlyData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="totalTrips"
                  name="Total Trips"
                  stroke="#1677d2"
                  strokeWidth={3}
                  activeDot={{ r: 7 }}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>

          {/* MONTHLY SUMMARY TABLE */}

          <div className="monthly-table-card">

            <h3>Monthly Travel Summary</h3>

            <div className="monthly-table-wrapper">

              <table className="monthly-table">

                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Trips</th>
                    <th>Total Distance</th>
                    <th>Petrol Distance</th>
                    <th>EV Distance</th>
                    <th>Petrol Expense</th>
                    <th>EV Expense</th>
                    <th>Total Expense</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredMonthlyData.map((item) => (

                    <tr key={item.monthKey}>

                      <td>{item.month}</td>

                      <td>{item.totalTrips}</td>

                      <td>
                        {item.totalDistance.toFixed(2)} km
                      </td>

                      <td>
                        {item.petrolDistance.toFixed(2)} km
                      </td>

                      <td>
                        {item.evDistance.toFixed(2)} km
                      </td>

                      <td>
                        {formatCurrency(item.petrolExpense)}
                      </td>

                      <td>
                        {formatCurrency(item.evExpense)}
                      </td>

                      <td>
                        <strong>
                          {formatCurrency(item.totalExpense)}
                        </strong>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </>

      )}

    </div>
  );
}

export default MonthlyAnalytics;
