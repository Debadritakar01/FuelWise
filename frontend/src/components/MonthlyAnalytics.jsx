
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

function MonthlyAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentDate = new Date();

  const [selectedMonth, setSelectedMonth] = useState("all");

  const [selectedYear, setSelectedYear] = useState(
    String(currentDate.getFullYear())
  );

  // Fetch monthly analytics
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial loading and automatic refresh
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

  // Loading state
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

  // Error state
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

  // Prepare monthly data
  const monthlyData = (
    analytics?.monthly_data || []
  ).map((item) => {
    const monthNumber =
      new Date(`${item.month} 1, ${item.year}`)
        .getMonth() + 1;

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
  });

  // Available years
  const availableYears = [
    ...new Set(
      monthlyData.map((item) => String(item.year))
    )
  ].sort((a, b) => Number(b) - Number(a));

  // Apply month and year filters
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

  // Calculate filtered totals
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
        totals.evExpense + item.evExpense
    }),
    {
      totalTrips: 0,
      totalDistance: 0,
      totalExpenses: 0,
      petrolExpense: 0,
      evExpense: 0
    }
  );

  return (
    <div className="monthly-analytics-section">

      {/* Header */}
      <div className="monthly-header">
        <h2>Monthly Analytics</h2>

        <p>
          Analyze your monthly travel expenses,
          distance and journey activity.
        </p>
      </div>

      {/* Month and Year Filters */}
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
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
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
            setSelectedYear(
              String(currentDate.getFullYear())
            );
          }}
        >
          Reset Filters
        </button>

      </div>

      {/* Summary Cards */}
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
            ₹{filteredTotals.totalExpenses.toFixed(2)}
          </h3>
          <p>Total Expenses</p>
        </div>

        <div className="monthly-summary-card">
          <h3>
            ₹{filteredTotals.petrolExpense.toFixed(2)}
          </h3>
          <p>Petrol Expenses</p>
        </div>

        <div className="monthly-summary-card">
          <h3>
            ₹{filteredTotals.evExpense.toFixed(2)}
          </h3>
          <p>EV Expenses</p>
        </div>

      </div>

      {/* Filtered Monthly Data */}
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

          {/* Monthly Expense Comparison */}
          <div className="monthly-chart-card">

            <div className="monthly-chart-heading">
              <h3>Monthly Expense Comparison</h3>

              <p>
                Petrol vs Electric Vehicle expenditure.
              </p>
            </div>

            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <BarChart data={filteredMonthlyData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="month" />

                <YAxis
                  tickFormatter={(value) =>
                    `₹${value}`
                  }
                />

                <Tooltip
                  formatter={(value) =>
                    `₹${Number(value).toFixed(2)}`
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

          {/* Monthly Distance Comparison */}
          <div className="monthly-chart-card">

            <div className="monthly-chart-heading">
              <h3>Monthly Distance Comparison</h3>

              <p>
                Compare petrol and EV travel distance
                month by month.
              </p>
            </div>

            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <BarChart data={filteredMonthlyData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="month" />

                <YAxis
                  tickFormatter={(value) =>
                    `${value} km`
                  }
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

          {/* Monthly Trip Activity */}
          <div className="monthly-chart-card">

            <div className="monthly-chart-heading">
              <h3>Monthly Trip Activity</h3>

              <p>
                Number of journeys completed each month.
              </p>
            </div>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <LineChart data={filteredMonthlyData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />

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

          {/* Monthly Summary Table */}
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
                        ₹{item.petrolExpense.toFixed(2)}
                      </td>

                      <td>
                        ₹{item.evExpense.toFixed(2)}
                      </td>

                      <td>
                        <strong>
                          ₹{item.totalExpense.toFixed(2)}
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
