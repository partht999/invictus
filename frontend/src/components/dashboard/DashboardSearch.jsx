import React, { useState } from 'react'

const DashboardSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products, transactions..."
              value={searchTerm}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#84eab3] focus:border-transparent"
            />
            <span className="absolute left-3 top-3 text-slate-400">🔍</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#84eab3] focus:border-transparent">
            <option>All Categories</option>
            <option>Raw Materials</option>
            <option>Finished Goods</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default DashboardSearch