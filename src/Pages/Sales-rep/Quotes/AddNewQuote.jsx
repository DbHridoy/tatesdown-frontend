import React, { useState } from "react";
import { useCreateQuoteMutation } from "../../../redux/api/quoteApi";
import { useGetAllClientsQuery } from "../../../redux/api/clientApi";
import { selectCurrentUser } from "../../../redux/slice/authSlice";
import { useSelector } from "react-redux";
const AddNewQuote = () => {
  const [selectedClient, setSelectedClient] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [bookedOnSpot, setBookedOnSpot] = useState(null);
  const [expiryDate, setExpiryDate] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const currentUser=useSelector(selectCurrentUser);
  const { data, isLoading } = useGetAllClientsQuery();
  const clients = data?.data || [];

  const [createQuote, { isLoading: isSubmitting, error }] =
    useCreateQuoteMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClient || !estimatedPrice) {
      alert("Client and estimated price are required");
      return;
    }

    console.log(currentUser)

    const formData = new FormData();
    formData.append("clientId", selectedClient);
    formData.append("salesRepId", currentUser._id);
    formData.append("estimatedPrice", estimatedPrice);
    formData.append("bookedOnSpot", bookedOnSpot);
    formData.append("expiryDate", expiryDate);
    formData.append("notes", notes);
    if (file) formData.append("bidSheet", file);

    try {
      const res = await createQuote(formData).unwrap();
      console.log("Quote created:", res);
      alert("Quote created successfully!");
    } catch (err) {
      console.error("Failed to create quote:", err);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Add New Quote
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white border rounded-lg shadow-sm p-6 space-y-8"
      >
        {/* Client Selection */}
        <div>
          <label className="block text-lg font-semibold mb-3">
            Client Selection *
          </label>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.clientName}
              </option>
            ))}
          </select>
        </div>

        {/* Estimated Price */}
        <div>
          <label className="block text-lg font-semibold mb-3">
            Estimated Price *
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              $
            </span>

            <input
              type="number"
              inputMode="decimal"
              value={estimatedPrice}
              onChange={(e) =>
                setEstimatedPrice(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className="w-full rounded-lg border py-3 pl-8 pr-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Bid Sheet */}
        <div>
          <label className="block text-lg font-semibold mb-3">Bid Sheet</label>
          <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer block hover:border-gray-400">
            <input
              type="file"
              hidden
              accept="image/*,.pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <p className="font-medium text-gray-700">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-500 mt-1">
              PDF or image files (Max 10MB)
            </p>
            {file && <p className="text-sm text-green-600 mt-2">{file.name}</p>}
          </label>
        </div>

        {/* Booked on the Spot */}
        <div>
          <label className="block text-lg font-semibold mb-3">
            Booked on the Spot?
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={bookedOnSpot === true}
                onChange={() => setBookedOnSpot(true)}
              />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={bookedOnSpot === false}
                onChange={() => setBookedOnSpot(false)}
              />
              No
            </label>
          </div>
        </div>

        {/* Expiry Date */}
        <div>
          <label className="block text-lg font-semibold mb-3">
            Quote Expiry Date
          </label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-lg font-semibold mb-3">
            Additional Details
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="4"
            className="w-full px-3 py-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add any additional details..."
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            className="flex-1 border py-3 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Save Quote"}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">
            Failed to create quote
          </p>
        )}
      </form>
    </div>
  );
};

export default AddNewQuote;
