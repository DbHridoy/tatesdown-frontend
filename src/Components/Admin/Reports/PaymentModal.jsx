import React from "react";

const PaymentModal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">Add Manual Payment</h3>

        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Payment Amount"
            className="p-3 border rounded"
          />
          <input type="date" className="p-3 border rounded" />
        </div>

        <select className="w-full p-3 mb-6 border rounded">
          <option value="cash">Cash</option>
          <option value="bank">Bank</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg"
          >
            Save Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
