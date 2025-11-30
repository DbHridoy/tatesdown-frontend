import { useState } from "react";

const ExpenseFilter = () => {
  const [status, setStatus] = useState('All Statuses');
  const [month, setMonth] = useState('All Months');

  return (
    <div className="">
      <div className="mx-auto mb-6">
        {/* Title and Filters */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Submitted Mileage Logs</h1>
          
          {/* Filters and Export buttons */}
          <div className="flex items-center space-x-4">
            {/* Status Dropdown */}
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="block appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Statuses</option>
                <option>Approved</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Month Dropdown */}
            <div className="relative">
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="block appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Months</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                {/* Add more months here */}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Export Buttons */}
            <button className="flex items-center bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              {/* <DownloadIcon className="w-5 h-5 mr-2" /> */}
              Export to CSV
            </button>
            <button className="flex items-center bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              {/* <DownloadIcon className="w-5 h-5 mr-2" /> */}
              Export to PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseFilter;
