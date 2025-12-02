import React, { useState } from "react";

const QuoteDetails = () => {
  const [bidSheetFile, setBidSheetFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBidSheetFile(file);
    }
  };

  const handleFileRemove = () => {
    setBidSheetFile(null);
  };

  return (
    <div className="min-h-screen">
      <div className=" mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quote Details
          </h1>
          <p className="text-lg text-gray-600">
            <strong>Quote ID:</strong> 01234
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Quote Summary Table */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Client Name</div>
                <div className="text-lg font-semibold text-gray-800">
                  John Doe
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">
                  Estimated Price
                </div>
                <div className="text-lg font-semibold text-green-600">
                  $ 1,500.00
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Quote Date</div>
                <div className="text-lg font-semibold text-gray-800">
                  November 20, 2025
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Status</div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Open
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Quote Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Quote Information
            </h2>

            <div className="space-y-4">
              {/* Expiry Date */}
              <div className="flex items-start">
                <div className="w-32 flex-shrink-0">
                  <span className="text-sm font-medium text-gray-700">
                    Expiry Date:
                  </span>
                </div>
                <div className="text-gray-900">December 20, 2025</div>
              </div>

              {/* Booked on Spot */}
              <div className="flex items-start">
                <div className="w-32 flex-shrink-0">
                  <span className="text-sm font-medium text-gray-700">
                    Booked on Spot:
                  </span>
                </div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  No
                </div>
              </div>

              {/* Additional Notes */}
              <div className="flex items-start">
                <div className="w-32 flex-shrink-0">
                  <span className="text-sm font-medium text-gray-700">
                    Additional Notes:
                  </span>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-800 leading-relaxed">
                      Client requested a follow-up next week to discuss
                      additional features and pricing options.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bid Sheet Upload */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Bid Sheet
            </h3>

            {bidSheetFile ? (
              // File Preview
              <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-gray-50">
                <div className="flex items-center">
                  <svg
                    className="w-8 h-8 text-gray-500 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-800">
                      {bidSheetFile.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {(bidSheetFile.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleFileRemove}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              // File Upload Area
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  id="bidSheetUpload"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                />
                <label htmlFor="bidSheetUpload" className="cursor-pointer">
                  <div className="text-gray-500 mb-2">
                    <svg
                      className="w-12 h-12 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    PDF or image files (Max 10MB)
                  </p>
                </label>
              </div>
            )}
          </div>

          {/* Client Contact Information */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Client Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                
                <div>
                  <div className="font-medium text-gray-800">
                    Sarah Mitchell
                  </div>
                  <div className="text-sm text-gray-600">
                    123 main st, sydney
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="font-medium text-gray-800">(555) 123-4567</div>
              </div>

              <div className="flex items-start">
                <div className="font-medium text-gray-800">
                  john.doe@email.com
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button className="flex-1 py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
            Convert to Job
          </button>
          <button className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Edit Quote
          </button>
          <button className="flex-1 py-3 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetails;
