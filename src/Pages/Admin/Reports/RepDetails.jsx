import React, { useState } from "react";
import PaymentModal from "../../../Components/Admin/Reports/PaymentModal";
import { useParams } from "react-router-dom";
import EarningBreakdown from "../../../Components/Admin/Reports/EarningBreakdown";
import {
  useGetSalesRepJobsQuery,
  useGetSalesRepDeductionQuery,
} from "../../../redux/api/jobApi";

const RepDetails = () => {
  const [addPaymentModal, setAddPaymentModal] = useState(false);
  const { id } = useParams();
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortKey: "",
    sortOrder: "asc",
    filters: {},
  });
  console.log("repId", id);
  const { data: jobsData = [] } = useGetSalesRepJobsQuery({
    options: params,
    repId: id,
  });

  const { data: deductionData } = useGetSalesRepDeductionQuery(id);

  // Use the rep ID from params
  const jobs = jobsData.data || [];
  const totalItems = jobsData.total || 0;
  const totalEarnings = jobsData.totalEarning || 0;
  const totalDeductions = deductionData?.data || 0;

  return (
    <div className="min-h-screen p-6 text-gray-800 bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">View Details - Rep A</h1>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
        <div className="p-4 bg-white rounded-lg shadow">
          <p>Total Earned</p>
          <h2 className="text-2xl font-bold">${totalEarnings}</h2>
        </div>
        {/* <div className="p-4 bg-white rounded-lg shadow">
          <p>Total Deductions</p>
          <h2 className="text-2xl font-bold text-red-500">${totalDeductions}</h2>
        </div> */}
        <div className="p-4 bg-white rounded-lg shadow">
          <p>Mileage Deductions</p>
          <h2 className="text-2xl font-bold text-blue-500">
            ${totalDeductions}
          </h2>
        </div>
      </div>

      {/* Earnings Breakdown */}
      {/* <EarningBreakdown id={id}/> */}

      {/* Payment History */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Payment History</h3>
          <button
            onClick={() => setAddPaymentModal(true)}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg"
          >
            + Add Payment
          </button>
        </div>

        <table className="w-full mb-3 text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Payment Amount</th>
              <th>Date Paid</th>
              <th>Remaining Owed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { amount: "$300.00", date: "12/05/2025", owed: "$450.00" },
              { amount: "$300.00", date: "12/05/2025", owed: "$450.00" },
            ].map((p, i) => (
              <tr key={i} className="border-b last:border-none">
                <td className="py-2 font-semibold text-blue-600">{p.amount}</td>
                <td>{p.date}</td>
                <td>{p.owed}</td>
                <td className="flex gap-2 text-red-500">
                  <button>✎</button>
                  <button>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between text-sm">
          <p>
            Total Payments Made:{" "}
            <span className="font-semibold text-green-600">$400.00</span>
          </p>
          <p>
            Remaining:{" "}
            <span className="font-semibold text-blue-600">$350.00</span>
          </p>
        </div>
      </div>

      {/* Manual Payment */}
      {addPaymentModal && (
        <PaymentModal
          isOpen={addPaymentModal}
          onClose={() => setAddPaymentModal(false)}
          onSave={() => {
            setAddPaymentModal(false);
          }}
        />
      )}

      {/* Deductions */}
      {/* <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="mb-3 text-lg font-semibold">Deductions</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Deduction Type</th>
              <th>Amount Deducted</th>
              <th>Miles Traveled</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Mileage</td>
              <td className="font-semibold text-red-500">$100</td>
              <td>100 miles</td>
              <td className="font-semibold text-green-600">Approved</td>
            </tr>
            <tr>
              <td className="py-2">Mileage</td>
              <td className="font-semibold text-red-500">$50</td>
              <td>—</td>
              <td className="font-semibold text-yellow-500">Pending</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default RepDetails;
