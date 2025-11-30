import React from 'react';
// import { CalendarIcon } from '@heroicons/react/outline'; // Importing Heroicons for the calendar icon

const MileageLogList = () => {
  // Sample data for mileage logs
  const mileageLogs = [
    { date: 'January 2025', miles: 150, deduction: 87.0, status: 'Pending' },
    { date: 'January 2025', miles: 150, deduction: 133.0, status: 'Approved' },
    { date: 'January 2025', miles: 150, deduction: 107.0, status: 'Approved' },
    { date: 'January 2025', miles: 150, deduction: 55.0, status: 'Pending' },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6">
          {mileageLogs.map((log, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between"
            >
              {/* Left section: Date and Miles Driven */}
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                  {/* <CalendarIcon className="h-6 w-6" /> */}
                </div>
                <div>
                  <p className="text-sm text-gray-600">{log.date}</p>
                  <p className="text-lg font-semibold text-gray-800">{log.miles} miles driven</p>
                </div>
              </div>

              {/* Right section: Deduction, Status, and View Details */}
              <div className="text-right">
                <p className="text-sm text-gray-600">Deduction</p>
                <p className="text-xl font-semibold text-gray-800">${log.deduction}</p>

                <span
                  className={`inline-block px-3 py-1 rounded-full mt-2 text-sm ${
                    log.status === 'Pending' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                  }`}
                >
                  {log.status}
                </span>

                <button
                  className="ml-4 py-2 px-4 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MileageLogList;
