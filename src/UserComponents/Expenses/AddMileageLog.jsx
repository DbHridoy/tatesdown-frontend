import { useState } from "react";

const AddMileageLog = ({ closeModal }) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [milesDriven, setMilesDriven] = useState("");
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = () => {
    // Handle form submission logic here (e.g., API call)
    console.log({
      month,
      year,
      milesDriven,
      file,
      notes,
    });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Mileage Log</h2>
      <p className="text-gray-600 mb-6">
        Please enter the details of your mileage for the month
      </p>

      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="month"
        >
          Month *
        </label>
        <select
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select month...</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          {/* Add other months */}
        </select>
      </div>

      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="year"
        >
          Year *
        </label>
        <select
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select year...</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          {/* Add other years */}
        </select>
      </div>

      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="milesDriven"
        >
          Total Miles Driven
        </label>
        <input
          type="number"
          id="milesDriven"
          value={milesDriven}
          onChange={(e) => setMilesDriven(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="file"
        >
          PDF Receipt Upload
        </label>
        <input
          type="file"
          id="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <p className="text-xs text-gray-500 mt-1">Upload PDF receipts only</p>
      </div>

      <div className="mb-6">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="notes"
        >
          Notes / Purpose of Trip
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Example: Client meeting at 123 main st."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={closeModal}
          className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save Mileage Log
        </button>
      </div>
    </div>
  );
};

export default AddMileageLog;
