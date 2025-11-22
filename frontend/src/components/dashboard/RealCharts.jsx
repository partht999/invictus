import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList
} from "recharts";

const RealCharts = ({ products }) => {
  // If no products, show demo data
  const demoData = [
    { name: "Product A", stock: 40, minStock: 20 },
    { name: "Product B", stock: 15, minStock: 30 },
    { name: "Product C", stock: 70, minStock: 50 },
    { name: "Product D", stock: 25, minStock: 10 },
  ];

  const chartData = (products && products.length > 0
    ? products.map((product) => ({
        name:
          product.name.length > 12
            ? product.name.slice(0, 12) + "…" 
            : product.name,
        stock: product.current_stock,
        minStock: product.min_stock,
      }))
    : demoData
  );

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-8">
      <h3 className="text-xl font-semibold text-[#00072D] mb-6">
        Stock Levels Overview
      </h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            barCategoryGap="15%"
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
              }}
              wrapperStyle={{ outline: "none" }}
            />

            <Legend />

            <Bar
              dataKey="stock"
              name="Current Stock"
              fill="#84eab3"
              radius={[6, 6, 0, 0]}
            >
              <LabelList dataKey="stock" position="top" fill="#00072D" />
            </Bar>

            <Bar
              dataKey="minStock"
              name="Min Stock"
              fill="#00072D"
              radius={[6, 6, 0, 0]}
            >
              <LabelList dataKey="minStock" position="top" fill="#00072D" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RealCharts;
