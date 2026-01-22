import React, { useState, useEffect } from "react";
import { useCreateNewJobMutation } from "../../../redux/api/jobApi";
import { useGetAllQuotesQuery, useGetQuoteByIdQuery } from "../../../redux/api/quoteApi";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAddNoteMutation } from "../../../redux/api/clientApi";

const AddNewJob = () => {
  // Read quoteId from URL
  const [searchParams] = useSearchParams();
  const quoteIdFromUrl = searchParams.get("quoteId");

  const { data: quoteData } = useGetAllQuotesQuery({ filters: { status: "Pending" } });
  const { data: quoteByIdData } = useGetQuoteByIdQuery(quoteIdFromUrl, {
    skip: !quoteIdFromUrl,
  });
  const quoteFromUrl = quoteByIdData?.data;
  const quotesFromList = quoteData?.data ?? [];
  const quotes = quoteFromUrl
    ? [quoteFromUrl, ...quotesFromList.filter((q) => q._id !== quoteFromUrl._id)]
    : quotesFromList;
  console.log("Line:10-quotes", quotes);
  const navigate = useNavigate();

  const [createNewJob, { isLoading: isCreating }] = useCreateNewJobMutation();
  const [createJobNote, { isLoading: isCreatingJobNote }] = useAddNoteMutation();

  // Form state
  const [selectedQuoteId, setSelectedQuoteId] = useState("");
  const [title, setTitle] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [estimatedStartDate, setEstimatedStartDate] = useState("");
  const [description, setDescription] = useState("");
  const [additionalNote, setAdditionalNote] = useState("");
  const [price, setPrice] = useState(0);
  const [estimatedGallons, setEstimatedGallons] = useState("");
  const [contractFile, setContractFile] = useState(null);

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
      setPrice(selectedQuote.estimatedPrice);
      setTitle(`Job for ${selectedQuote.clientId.clientName}`);
      const noteText = Array.isArray(selectedQuote.notes)
        ? selectedQuote.notes.find((note) => note.quoteId === selectedQuote._id)?.note || ""
        : selectedQuote.notes || "";
      setDescription(noteText);
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
    if (
      !selectedQuoteId ||
      !estimatedStartDate ||
      !downPayment ||
      !estimatedGallons ||
      !contractFile
    ) {
      alert(
        "Please fill required fields: Quote, Start Date, Down Payment, Estimated Gallons, Contract"
      );
      return;
    }

    // Get clientId from selected quote
    const selectedQuote = quotes.find((q) => q._id === selectedQuoteId);
    if (!selectedQuote) return;

    const clientId = selectedQuote.clientId._id;
    const payload = new FormData();
    payload.append("quoteId", selectedQuote._id);
    payload.append("clientId", clientId);
    payload.append("title", title);
    payload.append("price", String(price));
    payload.append("downPayment", String(Number(downPayment)));
    payload.append("estimatedStartDate", estimatedStartDate);
    payload.append("totalHours", String(Number(totalHours)));
    payload.append("setupCleanup", String(Number(setupCleanup)));
    payload.append("powerwash", String(Number(powerwash)));
    payload.append("labourHours", String(labourHours));
    payload.append("estimatedGallons", String(Number(estimatedGallons)));
    payload.append("contract", contractFile);

    try {
      const createdJob = await createNewJob(payload).unwrap();
      const createdJobId = createdJob?.data?._id || createdJob?._id;
      if (!createdJobId) {
        throw new Error("Job creation did not return an id");
      }
      const notesToCreate = [description, additionalNote]
        .map((note) => note.trim())
        .filter(Boolean);

      for (const note of notesToCreate) {
        const formData = new FormData();
        formData.append("jobId", createdJobId);
        formData.append("note", note);
        await createJobNote({
          jobId: createdJobId,
          clientId,
          formData,
        }).unwrap();
      }
      toast.success("Job created successfully!");
      navigate("/sales-rep/jobs");
    } catch (error) {
      toast.error("Failed to create job");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 sm:px-6">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full section-pad">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Add New Job
        </h1>

        {/* Select Quote */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Quote *</label>
          <select
            value={selectedQuoteId}
            onChange={(e) => setSelectedQuoteId(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm sm:text-base"
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
            className="w-full border px-3 py-2 rounded text-sm sm:text-base"
          />
        </div>

        {/* Total Hours */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Total Hours *</label>
          <input
            type="number"
            value={totalHours}
            onChange={(e) => setTotalHours(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm sm:text-base"
          />
        </div>

        {/* Setup/Cleanup */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Setup/Cleanup *</label>
          <input
            type="number"
            value={setupCleanup}
            onChange={(e) => setSetupCleanup(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm sm:text-base"
          />
        </div>

        {/* Powerwash */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Powerwash *</label>
          <input
            type="number"
            value={powerwash}
            onChange={(e) => setPowerwash(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm sm:text-base"
          />
        </div>

        {/* Labour Hours (auto-calculated) */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Labour Hours</label>
          <input
            type="number"
            value={labourHours}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100 text-sm sm:text-base"
          />
        </div>

        {/* Prices */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Price</label>
            <input
              value={price}
              className="w-full border px-3 py-2 rounded bg-gray-100 text-sm sm:text-base"
              readOnly
            />
          </div>

          <div className="flex-1">
            <label className="block font-semibold mb-1">Down Payment *</label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className="w-full border px-3 py-2 rounded text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Estimated Gallons *</label>
          <input
            type="number"
            value={estimatedGallons}
            onChange={(e) => setEstimatedGallons(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm sm:text-base"
          />
        </div>

        {/* Start Date */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Preferred Start Date *
          </label>
          <input
            type="date"
            value={estimatedStartDate}
            onChange={(e) => setEstimatedStartDate(e.target.value)}
            className="w-full border px-3 py-2 rounded text-sm sm:text-base"
          />
        </div>




        {!!description.trim() && (
          <div className="mb-6">
            <label className="block font-semibold mb-1">Existing Client Note</label>
            <div className="w-full border px-3 py-2 rounded bg-gray-50 text-gray-700 text-sm sm:text-base">
              {description}
            </div>
          </div>
        )}

        <div className="mb-6">
          <label className="block font-semibold mb-1">Add New Note</label>
          <textarea
            value={additionalNote}
            onChange={(e) => setAdditionalNote(e.target.value)}
            rows={4}
            className="w-full border px-3 py-2 rounded text-sm sm:text-base"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-1">Contract *</label>
          <input
            type="file"
            onChange={(e) => setContractFile(e.target.files?.[0] || null)}
            className="w-full text-sm sm:text-base"
            required
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-2 border rounded text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateJob}
            disabled={isCreating}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded text-sm sm:text-base"
          >
            {isCreating ? "Creating..." : "Create Job"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewJob;
