import { FiPlus } from "react-icons/fi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../redux/slice/authSlice";

function FAB() {
  const role = useSelector(selectUserRole);
  const navigate = useNavigate();
  const [fabOpen, setFabOpen] = useState(false);

  const toggleFab = () => setFabOpen((prev) => !prev);

  // Helper function to navigate and close FAB
  const handleClick = (path) => {
    navigate(path);
    setFabOpen(false); // close FAB after clicking
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-50 space-y-3">
      {/* Expanded Buttons */}
      {fabOpen && role !== "production-manager" && (
        <div className="flex flex-col items-end space-y-3 mb-2">
          <button
            onClick={() => handleClick(`/s/${role}/add-client`)}
            className="flex items-center justify-center w-48 p-2 h-12 rounded-2xl bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition"
          >
            Add Client
          </button>

          {role === "sales-rep" && (
            <>
              <button
                onClick={() => handleClick(`/s/${role}/add-new-quote`)}
                className="flex items-center justify-center w-48 p-2 h-12 rounded-2xl bg-green-500 text-white shadow-lg hover:bg-green-600 transition"
              >
                Add Quote
              </button>
              <button
                onClick={() => handleClick(`/s/${role}/add-job`)}
                className="flex items-center justify-center w-48 p-2 h-12 rounded-2xl bg-red-500 text-white shadow-lg hover:bg-red-600 transition"
              >
                Add Job
              </button>
            </>
          )}
        </div>
      )}

      {/* Main FAB */}
      <button
        className={`flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-transform duration-300 ${
          fabOpen ? "rotate-45" : ""
        }`}
        onClick={toggleFab}
      >
        <FiPlus className="text-2xl" />
      </button>
    </div>
  );
}

export default FAB;
