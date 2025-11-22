import React from 'react'

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login - Coming Soon</h2>
        <p className="text-center text-gray-600">Authentication system in progress...</p>
        <button 
          onClick={() => window.location.href = '/dashboard'}
          className="w-full bg-blue-500 text-white p-3 rounded mt-4"
        >
          Go to Dashboard (Temporary)
        </button>
      </div>
    </div>
  )
}

export default Login