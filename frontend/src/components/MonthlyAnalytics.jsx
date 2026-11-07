
import React from "react";
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

function MonthlyAnalytics({ trips }) {

  // Group trips by month
  const monthlyMap = {};

  trips.forEach((trip) => {
    if (!trip.created_at) return;

    const date = new Date(trip.created_at);

    if (Number.isNaN(date.getTime())) return;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const monthKey = `${year}-${month}`;

    if (!monthlyMap[monthKey]) {
      monthlyMap[monthKey] = {
        monthKey,
        month: date.toLocaleDateString("en-IN", {
          month: "short",
          year: "numeric"
        }),
        petrolExpense: 0,
        evExpense: 0,
        totalExpense: 0,
        totalTrips: 0
      };
    }

    const cost = Number(trip.total_cost) || 0;
    const vehicleType = String(
      trip.vehicle_type || ""
    ).toLowerCase();

    monthlyMap[monthKey].totalExpense += cost;
    monthlyMap[monthKey].totalTrips += 1;

    if (vehicleType === "petrol") {
      monthlyMap[monthKey].petrolExpense += cost;
    }

    if (vehicleType === "ev") {
      monthlyMap[monthKey].evExpense += cost;
    }
  });

  // Sort months chronologically
  const monthlyData = Object.values(monthlyMap)
    .sort((a, b) => a.monthKey.localeCompare(b.monthKey))
    .map((item) => ({
      ...item,
      petrolExpense: Number(item.petrolExpense.toFixed(2)),
      evExpense: Number(item.evExpense.toFixed(2)),
      totalExpense: Number(item.totalExpense.toFixed(2))
    }));

  const totalMonthlyExpenses = monthlyData.reduce(
    (total, item) => total + item.totalExpense,
    0
  );

  const totalMonthlyTrips = monthlyData.reduce(
    (total, item) => total + item.totalTrips,
    0
  );

  if (monthlyData.length === 0) {
    return (
      <div className="monthly-analytics-section">
        <div className="monthly-header">
          <h2>Monthly Analytics</h2>
          <p>Track your monthly travel expenses and trips.</p>
        </div>

        <div className="monthly-empty">
          <h3>No Monthly Data Available</h3>
          <p>Save some trips to view your monthly analytics.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="monthly-analytics-section">

      {/* Header */}
      <div className="monthly-header">
        <h2>Monthly Analytics</h2>
        <p>
          Analyze your monthly travel expenses and journey activity.
        </p>
      </div>

      {/* Monthly Summary Cards */}
      <div className="monthly-summary-grid">

        <div className="monthly-summary-card">
          <h3>{monthlyData.length}</h3>
          <p>Months Recorded</p>
        </div>

        <div className="monthly-summary-card">
          <h3>₹{totalMonthlyExpenses.toFixed(2)}</h3>
          <p>Total Recorded Expenses</p>
        </div>

        <div className="monthly-summary-card">
          <h3>{totalMonthlyTrips}</h3>
          <p>Total Recorded Trips</p>
        </div>

      </div>

      {/* Monthly Expense Chart */}
      <div className="monthly-chart-card">

        <div className="monthly-chart-heading">
          <h3>Monthly Expense Comparison</h3>
          <p>Petrol vs Electric Vehicle expenditure.</p>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={monthlyData}
            margin={{
              top: 15,
              right: 20,
              left: 10,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              tickFormatter={(value) => `₹${value}`}
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toFixed(2)}`,
                undefined
              ]}
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

      {/* Monthly Trip Count Chart */}
      <div className="monthly-chart-card">

        <div className="monthly-chart-heading">
          <h3>Monthly Trip Activity</h3>
          <p>Number of journeys completed each month.</p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={monthlyData}
            margin={{
              top: 15,
              right: 20,
              left: 10,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12 }}
            />

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

      {/* Monthly Expense Table */}
      <div className="monthly-table-card">

        <h3>Monthly Expense Summary</h3>

        <div className="monthly-table-wrapper">
          <table className="monthly-table">

            <thead>
              <tr>
                <th>Month</th>
                <th>Trips</th>
                <th>Petrol</th>
                <th>EV</th>
                <th>Total Expense</th>
              </tr>
            </thead>

            <tbody>
              {monthlyData.map((item) => (
                <tr key={item.monthKey}>
                  <td>{item.month}</td>
                  <td>{item.totalTrips}</td>
                  <td>₹{item.petrolExpense.toFixed(2)}</td>
                  <td>₹{item.evExpense.toFixed(2)}</td>
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

    </div>
  );
}

export default MonthlyAnalytics;
