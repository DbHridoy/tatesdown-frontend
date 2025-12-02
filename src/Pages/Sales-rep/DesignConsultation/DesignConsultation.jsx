import React, { useState } from 'react';

// Custom Select Component for Dropdown
const CustomSelect = ({ label, options, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      value={value}
      onChange={onChange}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const DesignConsultation = () => {
  const [jobInfo, setJobInfo] = useState({
    clientName: 'John Doe',
    jobTitle: 'Kitchen Remodel',
    jobId: 'J1234',
    currentStatus: 'Pending Design Consultation',
  });

  const [productDetails, setProductDetails] = useState({
    product: 'Sherwin-Williams Product',
    colorCode: '',
    estimatedGallons: '',
  });

  const [upsellDetails, setUpsellDetails] = useState({
    upsellDescription: '',
    upsellItem: '',
    addedHours: '',
  });

  const [scheduling, setScheduling] = useState({
    estimatedStartDate: '12/01/2025',
  });

  const [contractFile, setContractFile] = useState(null);

  const handleFileChange = (e) => {
    setContractFile(e.target.files[0]);
  };

  const handleSave = () => {
    // Handle the save logic here
    console.log('Form Data:', {
      jobInfo,
      productDetails,
      upsellDetails,
      scheduling,
      contractFile,
    });
  };

  const productOptions = ['Sherwin-Williams Product', 'Product A', 'Product B'];
  const colorOptions = ['White', 'Blue', 'Red', 'Green'];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Add Design Consultation</h2>

      {/* Job Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Selecting a job</label>
          <input
            type="text"
            value={jobInfo.clientName}
            readOnly
            className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            value={jobInfo.jobTitle}
            readOnly
            className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Job ID</label>
          <input
            type="text"
            value={jobInfo.jobId}
            readOnly
            className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Job Status</label>
          <input
            type="text"
            value={jobInfo.currentStatus}
            readOnly
            className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Sherwin-Williams Product Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Sherwin-Williams Product Details</h3>
        <CustomSelect
          label="Sherwin-Williams Product"
          options={productOptions}
          value={productDetails.product}
          onChange={(e) =>
            setProductDetails({ ...productDetails, product: e.target.value })
          }
        />
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Color Codes</label>
          <select
            className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={productDetails.colorCode}
            onChange={(e) =>
              setProductDetails({ ...productDetails, colorCode: e.target.value })
            }
          >
            {colorOptions.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Estimated Gallons</label>
          <input
            type="number"
            value={productDetails.estimatedGallons}
            onChange={(e) =>
              setProductDetails({ ...productDetails, estimatedGallons: e.target.value })
            }
            className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Upsell Opportunities */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Upsell Opportunities</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upsell Description</label>
          <input
            type="text"
            value={upsellDetails.upsellDescription}
            onChange={(e) =>
              setUpsellDetails({ ...upsellDetails, upsellDescription: e.target.value })
            }
            className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Upsell Item</label>
            <input
              type="text"
              value={upsellDetails.upsellItem}
              onChange={(e) =>
                setUpsellDetails({ ...upsellDetails, upsellItem: e.target.value })
              }
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Added Hours</label>
            <input
              type="number"
              value={upsellDetails.addedHours}
              onChange={(e) =>
                setUpsellDetails({ ...upsellDetails, addedHours: e.target.value })
              }
              className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Scheduling */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Scheduling</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estimated Start Date</label>
          <input
            type="date"
            value={scheduling.estimatedStartDate}
            onChange={(e) =>
              setScheduling({ ...scheduling, estimatedStartDate: e.target.value })
            }
            className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Contract Upload */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Contract Upload</h3>
        <div className="border-2 border-dashed p-6 rounded-md text-center">
          <input
            type="file"
            onChange={handleFileChange}
            className="text-blue-600 cursor-pointer"
          />
          <p className="text-gray-500 mt-2">Click to upload contract files (PDF, DOCX, XLSX, etc.)</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button className="bg-gray-300 text-white px-6 py-3 rounded-lg">Cancel</button>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          onClick={handleSave}
        >
          Save & Update Job
        </button>
      </div>
    </div>
  );
};

export default DesignConsultation;
