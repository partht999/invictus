import React from 'react'

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-slate-200 rounded-lg animate-pulse"></div>
              <div className="h-6 bg-slate-200 rounded w-40 animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-8 bg-slate-200 rounded animate-pulse"></div>
              <div className="w-20 h-8 bg-slate-200 rounded animate-pulse"></div>
              <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Header Section Skeleton */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="h-8 bg-slate-200 rounded w-64 animate-pulse mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-96 animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-10 bg-slate-200 rounded-lg animate-pulse"></div>
            <div className="w-20 h-10 bg-slate-200 rounded-lg animate-pulse"></div>
            <div className="w-10 h-10 bg-slate-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
        
        {/* Search Bar Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 animate-pulse">
          <div className="h-12 bg-slate-200 rounded-lg"></div>
        </div>

        {/* Quick Stats Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 animate-pulse">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-7 bg-slate-200 rounded w-12 mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-16 mb-1"></div>
                  <div className="h-3 bg-slate-200 rounded w-10"></div>
                </div>
                <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Inventory Alerts & Low Stock Panel Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6 animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-40 mb-4"></div>
          <div className="space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="h-16 bg-slate-100 rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-pulse">
              <div className="flex justify-between items-center">
                <div>
                  <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                  <div className="h-8 bg-slate-200 rounded w-16 mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-20"></div>
                </div>
                <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Metrics Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6 animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-40 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="h-8 bg-slate-200 rounded w-12 mx-auto mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-16 mx-auto mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-10 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Chart Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6 animate-pulse">
          <div className="flex justify-between items-center mb-6">
            <div className="h-6 bg-slate-200 rounded w-40"></div>
            <div className="h-8 bg-slate-200 rounded w-32"></div>
          </div>
          <div className="h-64 bg-slate-100 rounded-lg"></div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-slate-100 rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Main Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Quick Actions Skeleton */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-32 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-6 rounded-xl bg-slate-50 min-h-[120px]">
                  <div className="h-8 bg-slate-200 rounded w-8 mb-3"></div>
                  <div className="h-5 bg-slate-200 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-32"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Activity Skeleton */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-pulse">
            <div className="flex justify-between items-center mb-6">
              <div className="h-6 bg-slate-200 rounded w-32"></div>
              <div className="h-4 bg-slate-200 rounded w-16"></div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center space-x-3 p-3 border border-slate-100 rounded-lg">
                  <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-slate-200 rounded w-24"></div>
                  </div>
                  <div className="w-12 h-6 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-pulse">
          <div className="flex justify-between items-center mb-6">
            <div className="h-6 bg-slate-200 rounded w-40"></div>
            <div className="h-4 bg-slate-200 rounded w-20"></div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
                  <div>
                    <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-slate-200 rounded w-32"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="h-4 bg-slate-200 rounded w-16 mb-2"></div>
                  <div className="h-6 bg-slate-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSkeleton