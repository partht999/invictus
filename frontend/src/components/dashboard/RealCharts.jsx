import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const RealCharts = ({ products }) => {
  const chartData = products.map(product => ({
    name: product.name,
    stock: product.current_stock,
    minStock: product.min_stock
  }))

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-[#00072D] mb-6">Stock Levels</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stock" fill="#84eab3" name="Current Stock" />
            <Bar dataKey="minStock" fill="#00072D" name="Min Stock" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RealCharts