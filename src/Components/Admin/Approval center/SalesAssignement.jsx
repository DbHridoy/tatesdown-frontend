import { Users } from "lucide-react";
import React, { useState } from "react";
import SalesRepresentativeModal from "./SalesRepresentativeModal";

function SalesAssignement() {
  const [open, setOpen] = useState(false);
  const leadAssignmentData = [
    {
      leadId: "L12345",
      client: "John Doe",
      rep: "Rep A",
      status: "Waiting Assignment",
    },
    {
      leadId: "L12345",
      client: "John Doe",
      rep: "Rep A",
      status: "Waiting Assignment",
    },
  ];
   const reps = [
    "John Doe",
    "Sarah Parker",
    "Michael Smith",
    "Aisha Rahman",
    "David Miller",
  ];
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Lead Assignment Approvals
            </h2>
            <p className="text-sm text-gray-600">
              Review and approve lead assignments
            </p>
          </div>
        </div>
        <span className="font-semibold text-blue-600">2 Pending</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 uppercase">
                Lead ID
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 uppercase">
                Client Info
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 uppercase">
                Amount Requested
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 uppercase">
                Approval Status
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leadAssignmentData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {item.leadId}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-800">{item.client}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-800">{item.rep}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {/* <button className="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-500 rounded hover:bg-red-600">
                          Reject
                        </button> */}
                    <button
                      onClick={() => setOpen(true)}
                      className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                    >
                      Assign
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SalesRepresentativeModal
        isOpen={open}
        onClose={() => setOpen(false)}
        reps={reps}
      />
    </div>
  );
}

export default SalesAssignement;
