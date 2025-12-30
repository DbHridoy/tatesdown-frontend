import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetQuoteByIdQuery,
  useUpdateQuoteMutation,
} from "../../../redux/api/quoteApi";

const QuoteDetails = () => {
  const { quoteId } = useParams();
  const navigate = useNavigate();

  const { data: quoteData, isLoading } = useGetQuoteByIdQuery(quoteId);
  const [updateQuote, { isLoading: isUpdating }] = useUpdateQuoteMutation();

  const quote = quoteData?.data;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [bidSheetFile, setBidSheetFile] = useState(null);

  /* ---------------- Init editable data ---------------- */
  useEffect(() => {
    if (quote) {
      setFormData({
        estimatedPrice: quote.estimatedPrice,
        expiryDate: quote.expiryDate?.split("T")[0],
        notes: quote.notes || "",
        status: quote.status,
        bookedOnSpot: quote.bookedOnSpot,
      });
      setBidSheetFile(null); // reset file on load
    }
  }, [quote]);

  /* ---------------- Handlers ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBidSheetChange = (e) => {
    const file = e.target.files[0];
    if (file) setBidSheetFile(file);
  };

  const handleSave = async () => {
    try {
      const payload = new FormData();

      // append text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          payload.append(key, value);
        }
      });

      // append file ONLY if changed
      if (bidSheetFile) {
        payload.append("bidSheet", bidSheetFile);
      }
      payload.append("_dummy", "true");
      // ✅ correct debug
      for (let [key, value] of payload.entries()) {
        console.log(key, value);
      }

      await updateQuote({
        id: quote._id,
        body: payload,
      }).unwrap();

      setIsEditing(false);
      setBidSheetFile(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setBidSheetFile(null);
    setFormData({
      estimatedPrice: quote.estimatedPrice,
      expiryDate: quote.expiryDate?.split("T")[0],
      notes: quote.notes || "",
      status: quote.status,
      bookedOnSpot: quote.bookedOnSpot,
    });
  };

  const handleConvertToJob = () => {
    navigate(`/s/sales-rep/jobs/create-job/${quote._id}`);
  };

  if (isLoading || !quote) {
    return <div className="p-6">Loading...</div>;
  }

  const {
    clientId,
    estimatedPrice,
    expiryDate,
    notes,
    status,
    bookedOnSpot,
    bidSheet,
    createdAt,
    customQuoteId,
  } = quote;

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Quote Details</h1>
          <p className="text-gray-600">
            <strong>Quote ID:</strong> {customQuoteId}
          </p>
        </div>

        {/* Summary */}
        <div className="bg-white border rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Client</p>
              <p className="font-semibold">{clientId.clientName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Estimated Price</p>
              {isEditing ? (
                <input
                  type="number"
                  name="estimatedPrice"
                  value={formData.estimatedPrice}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 w-full"
                />
              ) : (
                <p className="font-semibold text-green-600">
                  ${estimatedPrice}
                </p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">Quote Date</p>
              <p>{new Date(createdAt).toLocaleDateString()}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Status</p>
              {isEditing ? (
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              ) : (
                <span className="font-medium">{status}</span>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-white border rounded-lg p-6 mb-6">
          <div className="mb-4">
            <p className="text-sm text-gray-500">Expiry Date</p>
            {isEditing ? (
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
            ) : (
              <p>{new Date(expiryDate).toLocaleDateString()}</p>
            )}
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500">Booked on Spot</p>
            <p>{bookedOnSpot === "true" ? "Yes" : "No"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Notes</p>
            {isEditing ? (
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="border rounded p-3 w-full"
              />
            ) : (
              <p>{notes || "-"}</p>
            )}
          </div>
        </div>

        {/* Bid Sheet */}
        <div className="bg-white border rounded-lg p-6 mb-6">
          <h3 className="font-semibold mb-3">Bid Sheet</h3>

          {bidSheet && !isEditing && (
            <a
              href={bidSheet}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Current Bid Sheet
            </a>
          )}

          {isEditing && (
            <div className="space-y-2">
              {bidSheet && (
                <p className="text-sm text-gray-600">
                  Current file will be replaced if you upload a new one
                </p>
              )}

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleBidSheetChange}
              />

              {bidSheetFile && (
                <p className="text-sm text-green-600">
                  Selected: {bidSheetFile.name}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isUpdating}
                className="flex-1 bg-blue-600 text-white py-3 rounded"
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 border py-3 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleConvertToJob}
                className="flex-1 bg-green-600 text-white py-3 rounded"
              >
                Convert to Job
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 border py-3 rounded"
              >
                Edit Quote
              </button>
              <button className="flex-1 bg-red-600 text-white py-3 rounded">
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteDetails;
