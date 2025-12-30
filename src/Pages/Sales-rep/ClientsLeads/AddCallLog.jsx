import { useState } from "react";

const CALL_STATUS_OPTIONS = [
  "Not Called",
  "Picked-Up: Appointment Booked",
  "Picked-Up: No Appointment",
  "No Pickup",
];

const AddCallLog = ({ closeModal, clientId, onSubmit }) => {
  const [callDate, setCallDate] = useState("");
  const [callTime, setCallTime] = useState("");
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!callDate || !callTime || !status) {
      alert("Please fill all required fields");
      return;
    }
    const callAt = new Date(`${callDate}T${callTime}`).toISOString();
    const formData = {
      clientId,
      callAt,
      status,
      note,
    };
    onSubmit?.(formData); // Pass the form data to parent
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
          <h2 className="text-xl font-semibold text-gray-800">Add Call Log</h2>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Call Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={callDate}
                onChange={(e) => setCallDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Call Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={callTime}
                onChange={(e) => setCallTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCallLog;
