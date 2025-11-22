import React from "react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Manage Products",
      description: "Add, edit or view products",
      icon: "📦",
      onClick: () => navigate("/products"),
      type: "primary",
    },
    {
      title: "Receive Stock",
      description: "Record incoming inventory",
      icon: "📥",
      onClick: () => navigate("/receipts"),
      type: "secondary",
    },
    {
      title: "Ship Orders",
      description: "Process outgoing deliveries",
      icon: "📤",
      onClick: () => navigate("/deliveries"),
      type: "outlined",
    },
  ];

  const getButtonStyle = (type) => {
    const base =
      "rounded-2xl p-6 text-left transition-all duration-300 font-medium flex flex-col items-start min-h-[140px] justify-between border shadow-sm hover:shadow-lg";

    const styles = {
      primary: `${base} bg-[#00072D] text-white border-transparent hover:scale-[1.03]`,
      secondary: `${base} bg-[#84eab3] text-[#00072D] border-transparent hover:scale-[1.03]`,
      outlined: `${base} border-[#84eab3] text-[#00072D] hover:bg-[#84eab3]/10 hover:scale-[1.03]`,
    };

    return styles[type] || styles.primary;
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-[#00072D]">Quick Actions</h3>
        <span className="text-sm text-slate-500">Frequently used</span>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={getButtonStyle(action.type)}
          >
            <div className="text-4xl">{action.icon}</div>

            <div className="w-full mt-4">
              <h4 className="font-semibold text-lg mb-1">{action.title}</h4>
              <p className="text-sm opacity-90 leading-relaxed">
                {action.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
