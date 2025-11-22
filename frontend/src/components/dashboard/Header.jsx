import React from 'react'

const Header = ({ onLogout }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-[#84eab3] p-2 rounded-lg">
                <span className="text-[#00072D] font-bold text-sm">IM</span>
              </div>
              <span className="text-xl font-bold text-[#00072D]">InventoryMaster</span>
            </div>
            
            <nav className="ml-8 hidden md:flex space-x-1">
              <a href="/dashboard" className="bg-[#84eab3]/30 text-[#84eab3] px-4 py-2 rounded-lg text-sm font-medium">Dashboard</a>
              <a href="/products" className="text-slate-700 hover:bg-slate-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Products</a>
              <a href="/receipts" className="text-slate-700 hover:bg-slate-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Receipts</a>
              <a href="/deliveries" className="text-slate-700 hover:bg-slate-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Deliveries</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{user.name || 'User'}</p>
              <p className="text-xs text-slate-500">{user.email || ''}</p>
            </div>
            
            <button
              onClick={onLogout}
              className="bg-[#00072D] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#00072D]/90 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header