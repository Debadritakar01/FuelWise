
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function CostComparisonChart({ comparison }) {
  if (!comparison?.petrol || !comparison?.electric) {
    return null;
  }

  const data = [
    {
      vehicle: "Petrol",
      cost: Number(comparison.petrol.total_cost),
    },
    {
      vehicle: "Electric",
      cost: Number(comparison.electric.total_cost),
    },
  ];

  return (
    <div className="chart-container">
      <h3>Petrol vs Electric Vehicle Cost</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="vehicle" />

          <YAxis
            tickFormatter={(value) => `₹${value}`}
          />

          <Tooltip
            formatter={(value) => [
              `₹${Number(value).toFixed(2)}`,
              "Trip Cost",
            ]}
          />

          <Legend />

          <Bar
            dataKey="cost"
            name="Total Trip Cost"
            fill="#16a34a"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CostComparisonChart;
