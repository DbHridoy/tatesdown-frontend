import React, { useState } from 'react';

const AddNewQuote = () => {
  const [bookedOnSpot, setBookedOnSpot] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Quote</h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-8">
          {/* Client Selection */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Client Selection *
            </h2>
            <input
              type="text"
              placeholder="Search existing client or type to add new..."
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-2">
              Can't find the client? Type their name to create a new client profile.
            </p>
          </div>

          {/* Estimated Price */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Estimated Price *
            </h2>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                $
              </span>
              <input
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Bid Sheet */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Bid Sheet</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
              <div className="text-gray-500 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-gray-700 font-medium">Click to upload or drag and drop</p>
              <p className="text-gray-500 text-sm mt-1">PDF or image files (Max 10MB)</p>
            </div>
          </div>

          {/* Booked on the Spot */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Booked on the Spot?</h2>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bookedOnSpot"
                  checked={bookedOnSpot === true}
                  onChange={() => setBookedOnSpot(true)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bookedOnSpot"
                  checked={bookedOnSpot === false}
                  onChange={() => setBookedOnSpot(false)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">No</span>
              </label>
            </div>
          </div>

          {/* Quote Expiry Date */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quote Expiry Date</h2>
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Additional Details */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Additional Details</h2>
            <textarea
              placeholder="Add any additional details or notes about this quote......"
              rows="4"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Save Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewQuote;