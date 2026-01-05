import React, { useState } from "react";

export default function SalesRepresentativeModal({ isOpen, onClose, reps = [] }) {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;
  console.log('modal',reps)

  const filteredReps = reps.filter((rep) =>
    rep.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white  w-full max-w-md rounded-xl p-6 shadow-lg animate-fadeIn">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Sales Representative</h2>
          <button
            onClick={onClose}
            className="text-gray-500  dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search sales rep..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-lg bg-gray-100 focus:outline-none"
        />

        {/* List */}
        <div className="max-h-64 overflow-y-auto space-y-2">
          {filteredReps.length > 0 ? (
            filteredReps.map((rep, index) => (
              <div
                onClick={onClose}
                key={index}
                className="p-2 rounded-md border hover:bg-gray-100 cursor-pointer"
              >
                {rep}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No representatives found.</p>
          )}
        </div>
      </div>
    </div>
  );
}