import React from 'react';

const MilesDriven = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Container for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Miles Driven Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
            <div className="flex-shrink-0">
              <span className="text-blue-500 text-3xl">
                <i className="fas fa-road"></i> {/* Example Icon */}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Miles Driven</h3>
              <p className="text-2xl font-semibold text-gray-800">150 miles</p>
            </div>
          </div>

          {/* Total Deduction Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
            <div className="flex-shrink-0">
              <span className="text-blue-500 text-3xl">
                <i className="fas fa-car"></i> {/* Example Icon */}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Deduction</h3>
              <p className="text-2xl font-semibold text-gray-800">$87</p>
              <p className="text-sm text-gray-500">Based on $0.58 per mile</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default MilesDriven;
