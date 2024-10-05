import React from 'react';
import { useNavigate } from 'react-router-dom';
import Months from './Months';
import { Link } from "react-router-dom";


export default function Sidebar() {
  const navigate = useNavigate();

  const handleUpdateClick = (month) => {
    // Navigate to the /read/:month route when the button is clicked
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:flex flex-col w-64 bg-gray-800">
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white font-bold uppercase">
            Salary Tracker
          </span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-gray-800">
            <button
              onClick={() => handleUpdateClick('september')}
              className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
            >
              Home
            </button>
            <Link
              to="/create"
              className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700"
            >
              Add Month
            </Link>
          </nav>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
          <div className="flex items-center px-4">
            <button className="text-gray-500 focus:outline-none focus:text-gray-700">
              Welcome Rayan!
            </button>
          </div>
        </div>
        <div className="p-4">
          <Months />
        </div>
      </div>
    </div>
  );
}
