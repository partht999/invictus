// src/components/auth/AuthForm.jsx
import React from 'react';

const AuthForm = ({
  title,
  subtitle,
  fields,
  onSubmit,
  loading,
  error,
  submitText,
  footer
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#00072D]">StockMaster</h1>
          <p className="text-slate-600 mt-2">{subtitle}</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-slate-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                required={field.required}
                value={field.value}
                onChange={field.onChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#84eab3] focus:outline-none transition"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00072D] text-white rounded-lg px-4 py-2 hover:bg-[#00072D]/80 focus:outline-none focus:ring-2 focus:ring-[#84eab3] transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : submitText}
          </button>
        </form>

        {footer && (
          <div className="mt-6 text-center">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;