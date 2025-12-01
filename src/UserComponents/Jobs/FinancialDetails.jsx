import React, { useState } from 'react';

const FinancialDetails = () => {
  const [contractValue, setContractValue] = useState(0);
  const [budgetSpent, setBudgetSpent] = useState(0);
  const [remaining, setRemaining] = useState(contractValue - budgetSpent);

  const handleContractValueChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setContractValue(value);
    setRemaining(value - budgetSpent);
  };

  const handleBudgetSpentChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setBudgetSpent(value);
    setRemaining(contractValue - value);
  };

  const progress = contractValue === 0 ? 0 : (budgetSpent / contractValue) * 100;

  return (
    <div className="mb-6 p-6 bg-white shadow-md rounded-md border">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Financial Details</h2>

      <div className="flex space-x-8 mb-6">
        {/* Contract Value */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Contract Value</label>
          <input
            type="number"
            value={contractValue}
            onChange={handleContractValueChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="$ 0.00"
          />
        </div>

        {/* Budget Spent */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Budget Spent</label>
          <input
            type="number"
            value={budgetSpent}
            onChange={handleBudgetSpentChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="$ 0.00"
          />
        </div>

        {/* Remaining */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Remaining</label>
          <input
            type="number"
            value={remaining}
            readOnly
            className="w-full mt-1 p-3 border border-gray-300 rounded-md bg-gray-100"
            placeholder="$ 0.00"
          />
        </div>
      </div>

      {/* Budget Progress Bar */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Budget Progress</label>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
              {progress.toFixed(0)}%
            </div>
          </div>
          <div className="flex mb-2">
            <div
              className="w-full bg-gray-200 rounded-full"
              style={{ height: '8px', backgroundColor: '#e1e1e1' }}
            >
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialDetails;
