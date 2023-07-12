import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const data = [
  { name: 'A', value: 30 },
  { name: 'B', value: 40 },
  { name: 'C', value: 15 },
  { name: 'D', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CircleChart = () => {
  return (
    <PieChart width={600} height={500}>
      <Pie
        dataKey="value"
        data={data}
        cx={300}
        cy={300}
        outerRadius={120}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  );
};

export default CircleChart;