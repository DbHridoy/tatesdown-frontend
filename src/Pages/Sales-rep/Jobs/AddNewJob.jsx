import React, { useState, useEffect } from "react";
import { useCreateNewJobMutation } from "../../../redux/api/jobApi";
import { useGetAllQuotesQuery } from "../../../redux/api/quoteApi";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddNewJob = () => {
  const { data: quoteData } = useGetAllQuotesQuery({filters:{status:"Pending"}});
  const quotes = quoteData?.data ?? [];
  const navigate = useNavigate();

  const [createNewJob, { isLoading: isCreating }] = useCreateNewJobMutation();

  // Read quoteId from URL
  const [searchParams] = useSearchParams();
  const quoteIdFromUrl = searchParams.get("quoteId");

  // Form state
  const [selectedQuoteId, setSelectedQuoteId] = useState("");
  const [title, setTitle] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  // New fields
  const [totalHours, setTotalHours] = useState("");
  const [setupCleanup, setSetupCleanup] = useState("");
  const [powerwash, setPowerwash] = useState("");
  const [labourHours, setLabourHours] = useState(0);

  // Set selected quote when quotes load or URL param exists
  useEffect(() => {
    if (quotes.length && quoteIdFromUrl) {
      setSelectedQuoteId(quoteIdFromUrl);
    } else if (quotes.length && !selectedQuoteId) {
      setSelectedQuoteId(quotes[0]._id);
    }
  }, [quotes, quoteIdFromUrl]);

  // Auto-fill fields when selectedQuoteId changes
  useEffect(() => {
    const selectedQuote = quotes.find((q) => q._id === selectedQuoteId);
    if (selectedQuote) {
      setEstimatedPrice(selectedQuote.estimatedPrice);
      setTitle(`Job for ${selectedQuote.clientId.clientName}`);
      setDescription(selectedQuote.notes || "");
    }
  }, [selectedQuoteId, quotes]);

  // Compute Labour Hours whenever related fields change
  useEffect(() => {
    const total = parseFloat(totalHours) || 0;
    const setup = parseFloat(setupCleanup) || 0;
    const power = parseFloat(powerwash) || 0;
    setLabourHours(total - setup - power);
  }, [totalHours, setupCleanup, powerwash]);

  const handleCreateJob = async () => {
    if (!selectedQuoteId || !startDate || !downPayment) {
      alert("Please fill required fields: Quote, Start Date, Down Payment");
      return;
    }

    // Get clientId from selected quote
    const selectedQuote = quotes.find((q) => q._id === selectedQuoteId);
    if (!selectedQuote) return;

    const payload = {
      quoteId: selectedQuote._id,
      clientId: selectedQuote.clientId._id, // <- include clientId here
      title,
      description,
      estimatedPrice,
      downPayment: Number(downPayment),
      startDate: new Date(startDate),
      totalHours: Number(totalHours),
      setupCleanup: Number(setupCleanup),
      powerwash: Number(powerwash),
      labourHours,
    };

    try {
      await createNewJob(payload).unwrap();
      toast.success("Job created successfully!");
      navigate("/sales-rep/jobs");
    } catch (error) {
      toast.error("Failed to create job");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Job</h1>

        {/* Select Quote */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Quote *</label>
          <select
            value={selectedQuoteId}
            onChange={(e) => setSelectedQuoteId(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            disabled={!!quoteIdFromUrl}
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
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Total Hours */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Total Hours *</label>
          <input
            type="number"
            value={totalHours}
            onChange={(e) => setTotalHours(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Setup/Cleanup */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Setup/Cleanup *</label>
          <input
            type="number"
            value={setupCleanup}
            onChange={(e) => setSetupCleanup(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Powerwash */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Powerwash *</label>
          <input
            type="number"
            value={powerwash}
            onChange={(e) => setPowerwash(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Labour Hours (auto-calculated) */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Labour Hours</label>
          <input
            type="number"
            value={labourHours}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Prices */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Price</label>
            <input
              value={estimatedPrice}
              className="w-full border px-3 py-2 rounded bg-gray-100"
              readOnly
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
          <label className="block font-semibold mb-1">Preferred Start Date *</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
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
    </div>
  );
};

export default AddNewJob;
