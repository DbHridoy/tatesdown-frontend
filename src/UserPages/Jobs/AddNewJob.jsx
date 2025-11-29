import React, { useState } from 'react';

const AddNewJob = () => {
  const [jobStatus, setJobStatus] = useState('Scheduled');
  const [downpaymentAmount, setDownpaymentAmount] = useState('0.00');

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Job</h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          {/* Client Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Client Selection *
            </label>
            <input
              type="text"
              placeholder="Search for select existing client"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Job Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Job Title *
            </label>
            <input
              type="text"
              placeholder="e.g., Kitchen remodel, Office Painting"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Estimated Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
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
                className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Start Date *
            </label>
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Job Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Job Status
            </label>
            <div className="flex flex-wrap gap-2">
              {['Scheduled', 'In Progress', 'On Hold', 'Completed', 'Cancelled'].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setJobStatus(status)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    jobStatus === status
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Job Description / Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Job Description / Notes
            </label>
            <textarea
              placeholder="Add any additional details about the job......"
              rows="4"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 pt-6">
            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>

              {/* Downpayment Amount */}
              <div className="w-full sm:w-auto">
                <label className="block text-sm font-semibold text-gray-800 mb-2 text-center sm:text-left">
                  Downpayment Amount *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    value={downpaymentAmount}
                    onChange={(e) => setDownpaymentAmount(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full sm:w-48 pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center sm:text-left"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Assign Sales Rep */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Assign Sales Rep
            </label>
            <select className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Mike Thompson</option>
              <option>Sarah Johnson</option>
              <option>David Wilson</option>
              <option>Emily Brown</option>
            </select>
          </div>

          {/* Create Job Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            Create Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewJob;