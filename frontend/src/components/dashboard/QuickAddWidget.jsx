import React, { useState } from 'react'

const QuickAddWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', quantity: '', category: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Adding: ${formData.quantity} ${formData.name} to ${formData.category}`)
    setFormData({ name: '', quantity: '', category: '' })
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#84eab3] text-[#00072D] rounded-full shadow-lg hover:bg-[#84eab3]/80 transition-all flex items-center justify-center text-2xl z-40"
      >
        +
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96">
            <h3 className="text-lg font-semibold text-[#00072D] mb-4">Quick Add Item</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Item name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#84eab3]"
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#84eab3]"
                required
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#84eab3]"
                required
              >
                <option value="">Select Category</option>
                <option value="raw">Raw Materials</option>
                <option value="finished">Finished Goods</option>
              </select>
              <div className="flex space-x-3">
                <button type="submit" className="flex-1 bg-[#84eab3] text-[#00072D] py-2 rounded-lg font-medium">
                  Add Item
                </button>
                <button type="button" onClick={() => setIsOpen(false)} className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg font-medium">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
export default QuickAddWidget