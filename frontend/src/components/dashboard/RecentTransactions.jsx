import React from 'react'

const RecentTransactions = ({ transactions = [] }) => {
  const sampleTransactions = [
    { id: 1, type: 'Purchase', product: 'Steel Rods', quantity: 100, amount: '$1,200', date: '2 hours ago', status: 'Completed' },
    { id: 2, type: 'Sale', product: 'Wood Planks', quantity: 50, amount: '$750', date: '5 hours ago', status: 'Completed' },
    { id: 3, type: 'Purchase', product: 'Aluminum Sheets', quantity: 200, amount: '$2,400', date: '1 day ago', status: 'Pending' },
    { id: 4, type: 'Sale', product: 'Copper Wires', quantity: 30, amount: '$450', date: '2 days ago', status: 'Completed' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-700'
      case 'Pending': return 'bg-yellow-100 text-yellow-700'
      case 'Failed': return 'bg-red-100 text-red-700'
      default: return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[#00072D]">Recent Transactions</h3>
        <button className="text-[#84eab3] hover:text-[#00072D] text-sm font-medium transition-colors">
          View All →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#84eab3]/20 text-slate-700">
              <th className="text-left p-3 text-sm font-medium">Type</th>
              <th className="text-left p-3 text-sm font-medium">Product</th>
              <th className="text-left p-3 text-sm font-medium">Quantity</th>
              <th className="text-left p-3 text-sm font-medium">Amount</th>
              <th className="text-left p-3 text-sm font-medium">Date</th>
              <th className="text-left p-3 text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {sampleTransactions.map(transaction => (
              <tr key={transaction.id} className="border-b border-slate-200 hover:bg-slate-50">
                <td className="p-3 text-sm">
                  <span className={`font-medium ${
                    transaction.type === 'Purchase' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="p-3 text-sm font-medium text-slate-900">{transaction.product}</td>
                <td className="p-3 text-sm text-slate-600">{transaction.quantity}</td>
                <td className="p-3 text-sm font-medium text-slate-900">{transaction.amount}</td>
                <td className="p-3 text-sm text-slate-600">{transaction.date}</td>
                <td className="p-3 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentTransactions