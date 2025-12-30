import React, { useState, useEffect } from "react";
import { useCreateNewJobMutation } from "../../../redux/api/jobApi";
import { useGetAllQuotesQuery } from "../../../redux/api/quoteApi";

const AddNewJobModal = ({ onClose }) => {
  const { data: quoteData } = useGetAllQuotesQuery();
  const quotes = quoteData?.data ?? [];

  const [createNewJob, { isLoading: isCreating }] = useCreateNewJobMutation();

  // 🔹 Form State
  const [selectedQuoteId, setSelectedQuoteId] = useState(quotes[0]?._id || "");
  const [title, setTitle] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [jobStatus, setJobStatus] = useState("Scheduled");
  const [description, setDescription] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  // Update estimatedPrice when quote changes
  useEffect(() => {
    const selectedQuote = quotes.find((q) => q._id === selectedQuoteId);
    if (selectedQuote) {
      setEstimatedPrice(selectedQuote.estimatedPrice);
      setTitle(`Job for ${selectedQuote.clientId.clientName}`);
    }
  }, [selectedQuoteId, quotes]);

  const handleCreateJob = async () => {
    if (!selectedQuoteId || !startDate || !downPayment) {
      alert("Please fill required fields");
      return;
    }

    const selectedQuote = quotes.find((q) => q._id === selectedQuoteId);
    const payload={
        quoteId: selectedQuote._id,
        title,
        description,
        estimatedPrice: selectedQuote.estimatedPrice,
        downPayment: Number(downPayment),
        startDate: new Date(startDate),
        status: jobStatus,
      }
      console.log("payload",payload)
    try {
      await createNewJob(payload).unwrap();

      onClose(); // close modal after creation
    } catch (error) {
      console.error("Failed to create job:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          &times;
        </button>

        <h1 className="text-3xl font-bold mb-6 text-center">Add New Job</h1>

        {/* Select Quote */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Quote *</label>
          <select
            value={selectedQuoteId}
            onChange={(e) => setSelectedQuoteId(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            {quotes.map((quote) => (
              <option key={quote._id} value={quote._id}>
                {quote.customQuoteId} - {quote.clientId.clientName}
              </option>
            ))}
          </select>
        </div>

        {/* Job Title */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Job Title *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Job Title"
          />
        </div>

        {/* Prices */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Estimated Price</label>
            <input
              value={estimatedPrice}
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div className="flex-1">
            <label className="block font-semibold mb-1">Down Payment *</label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Start Date */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Start Date *</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Job Status</label>
          <select
            value={jobStatus}
            onChange={(e) => setJobStatus(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option>Scheduled</option>
            <option>In Progress</option>
            <option>On Hold</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-6 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleCreateJob}
            disabled={isCreating}
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            {isCreating ? "Creating..." : "Create Job"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewJobModal;

