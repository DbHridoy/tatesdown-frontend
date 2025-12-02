import React, { useState } from "react";

const AddNewJob = ({ closeModal }) => {
  const [jobStatus, setJobStatus] = useState("Scheduled");

  return (
    <div className="bg-white rounded-lg shadow-lg w-full  mx-auto overflow-auto p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Add New Job</h1>
      </div>

      <div className="space-y-6">
        {/* Client Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Client Selection *
          </label>
          <input
            type="text"
            placeholder="Search or select existing client"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Job Title *
          </label>
          <input
            type="text"
            placeholder="e.g., Kitchen remodel, Office Painting"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-row justify-between">
          {/* Estimated Price */}
          <div className="w-1/2 pr-2">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Estimated Price *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                $
              </span>
              <input
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Estimated Price *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                $
              </span>
              <input
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Start Date *
          </label>
          <input
            type="text"
            placeholder="mm/dd/yyyy"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Job Status & Assign Sales Rep */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Job Status */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Job Status
            </label>
            <select
              value={jobStatus}
              onChange={(e) => setJobStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Assign Sales Rep */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Assign Sales Rep
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Mike Thompson</option>
              <option>Sarah Johnson</option>
              <option>David Wilson</option>
              <option>Emily Brown</option>
            </select>
          </div>
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Job Description / Notes
          </label>
          <textarea
            placeholder="Add any additional details about the job..."
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Downpayment & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            type="button"
            onClick={closeModal}
            className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              type="submit"
              className="py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Create Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewJob;
