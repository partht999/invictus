import React, { useState } from 'react'

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Steel Rods running low', type: 'warning', read: false },
    { id: 2, message: 'New stock received', type: 'info', read: false },
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="relative">
      <button className="p-2 text-gray-600 hover:text-gray-900 relative">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.24 8.56a5.97 5.97 0 01-4.66-7.5 5.97 5.97 0 017.5 4.66 5.97 5.97 0 01-2.84 2.84z" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  )
}

export default NotificationBell