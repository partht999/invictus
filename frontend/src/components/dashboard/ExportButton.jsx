import React, { useState } from 'react'

const ExportButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  const exportOptions = [
    {
      format: 'PDF',
      icon: '📄',
      label: 'PDF Report',
      description: 'Professional summary report',
      onClick: () => handleExport('PDF')
    },
    {
      format: 'CSV', 
      icon: '📊',
      label: 'CSV Data',
      description: 'Raw data for analysis',
      onClick: () => handleExport('CSV')
    },
    {
      format: 'Excel',
      icon: '📈',
      label: 'Excel Spreadsheet',
      description: 'Formatted spreadsheet',
      onClick: () => handleExport('Excel')
    }
  ]

  const handleExport = (format) => {
    setIsOpen(false)
    
    // Simulate export process
    console.log(`Exporting as ${format}...`)
    
    // Show success message
    alert(`📤 Exporting dashboard data as ${format}...\n(This would download a file in real implementation)`)
    
    // In real implementation, you would:
    // - Generate PDF using libraries like jsPDF
    // - Create CSV/Excel files and trigger download
    // - Call backend API for report generation
  }

  return (
    <div className="relative">
      {/* Main Export Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#00072D] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#00072D]/80 transition-colors flex items-center space-x-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>Export</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 z-50">
          <div className="p-2">
            <div className="px-3 py-2 border-b border-slate-200">
              <p className="text-sm font-semibold text-[#00072D]">Export Options</p>
              <p className="text-xs text-slate-500">Choose export format</p>
            </div>
            
            {exportOptions.map((option, index) => (
              <button
                key={option.format}
                onClick={option.onClick}
                className="w-full text-left px-3 py-3 rounded-lg hover:bg-slate-50 transition-colors flex items-start space-x-3 group"
              >
                <span className="text-xl mt-1">{option.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 group-hover:text-[#00072D]">
                    {option.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {option.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ExportButton