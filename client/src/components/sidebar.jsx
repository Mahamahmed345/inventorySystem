import React from 'react';
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-64 h-screen bg-green-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-8 text-green-100">Dashboard</h2>
      <ul className="space-y-4">
        <li className="hover:text-green-300 cursor-pointer">Overview</li>
        <li className="hover:text-green-300 cursor-pointer">Reports</li>
        <li className="hover:text-green-300 cursor-pointer">Settings</li>
        {/* ✅ Add FileUpload Button */}
        <li
          className="hover:text-green-300 cursor-pointer"
          onClick={() => navigate("/FileUpload")}
        >
          File Upload
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
