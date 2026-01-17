import React, { useEffect, useState } from 'react'
import { useGetVariablesQuery, useUpsertVariableMutation } from '../../../redux/api/common';

function SalesRepCommission() {
     const { data: variable } = useGetVariablesQuery();
     const salesRepCommission = variable?.data?.salesRepCommissionRate;
     const [upsertVariable] = useUpsertVariableMutation();
     const [isEditable, setIsEditable] = useState(false);
     const [originalCommission, setOriginalCommission] = useState("");

     console.log("Line:11-Salesrepcomission",variable)
    
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        <h2 className=" font-semibold text-gray-900">Sales Rep Commission</h2>
        <div className="relative w-40">
          <span className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2">
            $
          </span>
          <input
            type="number"
            step="0.01"
            value={salesRepCommission}
            disabled={!isEditable}
            onChange={(e) => setSalesRepCommission(e.target.value)}
            className="w-full py-2 pr-3 border border-gray-300 rounded-md pl-7 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            placeholder="0.50"
          />
        </div>

        {!isEditable ? (
          <button
            onClick={() => setIsEditable(true)}
            className="ml-2 px-3 py-1.5 bg-blue-600 text-white rounded-md"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="ml-2 px-3 py-1.5 bg-green-600 text-white rounded-md"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="ml-2 px-3 py-1.5 bg-red-600 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SalesRepCommission