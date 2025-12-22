import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetQuoteByIdQuery } from "../../../redux/api/quoteApi";
import { useCreateNewJobMutation } from "../../../redux/api/jobApi";

const AddNewJob = () => {
  const { quoteId } = useParams();
  const navigate = useNavigate();

  const { data: quoteData, isLoading } = useGetQuoteByIdQuery(quoteId);
  const quote = quoteData?.data;

  const [createNewJob, { isLoading: isCreating }] =
    useCreateNewJobMutation();

  // 🔹 Form State
  const [title, setTitle] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [jobStatus, setJobStatus] = useState("Scheduled");
  const [description, setDescription] = useState("");

  if (isLoading || !quote) {
    return <div className="p-6">Loading...</div>;
  }

  const handleCreateJob = async () => {
    try {
      await createNewJob({
        quoteId: quote._id,
        clientId: quote.clientId._id,
        salesRepId: quote.salesRepId._id,
        title,
        description,
        estimatedPrice: quote.estimatedPrice,
        downPayment: Number(downPayment),
        startDate: new Date(startDate),
        status: jobStatus,
      }).unwrap();

      navigate("/s/sales-rep/jobs");
    } catch (error) {
      console.error("Failed to create job:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Job</h1>

      {/* Client */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Client</label>
        <input
          value={quote.clientId.clientName}
          readOnly
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* Job Title */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Job Title *</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Kitchen Remodel"
        />
      </div>

      {/* Prices */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Estimated Price</label>
          <input
            value={quote.estimatedPrice}
            readOnly
            className="w-full border px-3 py-2 rounded"
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
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 border rounded"
        >
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
  );
};

export default AddNewJob;
