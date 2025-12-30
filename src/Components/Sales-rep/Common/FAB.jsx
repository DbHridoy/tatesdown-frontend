import { FiPlus, FiEdit, FiTrash2, FiDownload } from "react-icons/fi";
import React, { useState } from "react";

function FAB() {
  const [fabOpen, setFabOpen] = useState(false); // FAB state
  const toggleFab = () => setFabOpen((prev) => !prev);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-50 space-y-3">
      {/* Expanded Buttons */}
      {fabOpen && (
        <div className="flex flex-col items-end space-y-3 mb-2">
          <button
            onClick={() => navigate("/s/sales-rep/add-client")}
            className="flex items-center justify-center w-50 p-2 h-12 rounded-2xl bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition"
          >
            Add Client
          </button>
          <button
            onClick={() => navigate("/s/sales-rep/add-new-quote")}
            className="flex items-center justify-center w-50 p-2 h-12 rounded-2xl bg-green-500 text-white shadow-lg hover:bg-green-600 transition"
          >
            Add Quote
          </button>
          <button
            onClick={() => navigate("/s/sales-rep/add-job")}
            className="flex items-center justify-center w-50 p-2 h-12 rounded-2xl bg-red-500 text-white shadow-lg hover:bg-red-600 transition"
          >
            Add Job
          </button>
        </div>
      )}

      {/* Main FAB */}
      <button
        className={`flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-transform ${
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
