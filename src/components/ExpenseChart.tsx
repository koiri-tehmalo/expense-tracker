"use client";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

export default function ExpenseChart({ data }: { data: Record<string, number> }) {
  // แปลง Object เป็น Array ของแต่ละ category
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label={(entry) => `${entry.name}: ${entry.value}฿`} 
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value: number) => `${value} ฿`} />
      <Legend />
    </PieChart>
  );
}
