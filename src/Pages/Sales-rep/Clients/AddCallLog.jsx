import { useState } from "react";

const CALL_STATUS_OPTIONS = [
  "Not Called",
  "Picked-Up: Appointment Booked",
  "Picked-Up: No Appointment",
  "No Pickup",
];

const AddCallLog = ({ closeModal, clientId, onSubmit }) => {
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [reason, setReason] = useState(""); // New state for reason

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!status) {
      alert("Please select a call outcome");
      return;
    }

    if (status === "Picked-Up: No Appointment" && !reason.trim()) {
      alert("Please provide a reason for 'No Appointment'");
      return;
    }

    const payload = {
      clientId,
      callAt: new Date().toISOString(), // Current local time
      status,
      note,
      reason: status === "Picked-Up: No Appointment" ? reason : undefined,
    };

    //console.log("Payload", payload);
    onSubmit(payload);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Add Call Log
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Call Outcome */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Call Outcome <span className="text-red-500">*</span>
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Select outcome...</option>
              {CALL_STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Reason (conditional) */}
          {status === "Picked-Up: No Appointment" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Reason <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason..."
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1">Call Notes</label>
            <textarea
              rows="4"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter details about the call..."
              className="w-full px-3 py-2 border rounded-lg resize-none"
            />
          </div>

          {/* Timestamp Preview */}
          <div className="text-sm text-gray-500">
            Call Time: {new Date().toLocaleString()}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex gap-3 bg-gray-50">
          <button
            type="button"
            onClick={closeModal}
            className="flex-1 py-2 border rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg"
          >
            Save Call Log
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCallLog;
