
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

  // Fetch monthly analytics from backend
  useEffect(() => {
    fetchAnalytics();
  }, []);

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
  ).map((item) => ({
    ...item,

    monthKey: `${item.year}-${String(
      new Date(
        `${item.month} 1, ${item.year}`
      ).getMonth() + 1
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
  }));

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

      {/* Summary Cards */}
      <div className="monthly-summary-grid">

        <div className="monthly-summary-card">
          <h3>
            {Number(analytics.total_trips) || 0}
          </h3>
          <p>Total Trips</p>
        </div>

        <div className="monthly-summary-card">
          <h3>
            {Number(
              analytics.total_distance
            ).toFixed(2)} km
          </h3>
          <p>Total Distance</p>
        </div>

        <div className="monthly-summary-card">
          <h3>
            ₹{Number(
              analytics.total_expenses
            ).toFixed(2)}
          </h3>
          <p>Total Expenses</p>
        </div>

        <div className="monthly-summary-card">
          <h3>
            ₹{Number(
              analytics.petrol_expense
            ).toFixed(2)}
          </h3>
          <p>Petrol Expenses</p>
        </div>

        <div className="monthly-summary-card">
          <h3>
            ₹{Number(
              analytics.ev_expense
            ).toFixed(2)}
          </h3>
          <p>EV Expenses</p>
        </div>

      </div>

      {/* Monthly Data */}
      {monthlyData.length === 0 ? (

        <div className="monthly-empty">
          <h3>No Monthly Data Available</h3>

          <p>
            Save some trips to view your monthly analytics.
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
              <BarChart data={monthlyData}>

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
              <BarChart data={monthlyData}>

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
              <LineChart data={monthlyData}>

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

                  {monthlyData.map((item) => (

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
