import React from 'react';

const MileagePage = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Container for Heading and Button */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Expenses / Mileage</h1>
          <p className="text-sm text-gray-500 mt-2">
            Overview of sales performance and metrics
          </p>
        </div>
        {/* Add Mileage Log Button */}
        <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors flex items-center space-x-2">
          <span className="text-lg">+</span>
          <span>Add Mileage Log</span>
        </button>
      </div>

      {/* Other content here */}
    </div>
  );
};

export default MileagePage;
