import JobDetailsHeader from "../../../Components/Sales-rep/Jobs/JobDetailsHeader";
import SharedNotes from "../../../Components/Sales-rep/Jobs/SharedNotes";
import FinancialDetails from "../../../Components/Sales-rep/Jobs/FinancialDetails";
import DC from "../../../Components/Sales-rep/Jobs/DC";
import { useEffect, useState } from "react";
import {
  useGetJobByIdQuery,
  useUpdateJobMutation,
} from "../../../redux/api/jobApi";
import { useParams } from "react-router-dom";

const formatDateInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

const statusOptions = [
  "Ready to Schedule",
  "Scheduled and Open",
  "Scheduled",
  "Pending Close",
  "Closed",
  "Cancelled",
];

const PmJobDetailsPage = () => {
  const { jobId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [formJob, setFormJob] = useState({
    title: "",
    status: "",
    startDate: "",
    price: 0,
    downPayment: 0,
    budgetSpent: 0,
    totalHours: 0,
    setupCleanup: 0,
    powerwash: 0,
    laborHours: 0,
  });

  const { data, isLoading, isError } = useGetJobByIdQuery(jobId, {
    skip: !jobId,
  });
  const [updateJob, { isLoading: isSaving }] = useUpdateJobMutation();

  const job = data?.data;

  if (isLoading) return <p className="p-6">Loading job details...</p>;
  if (isError || !job) return <p className="p-6 text-red-500">Job not found</p>;

  const client = job.clientId;
  const quote = job.quoteId;
  const salesRep = job.salesRepId;

  useEffect(() => {
    if (!job) return;
    setFormJob({
      title: job.title ?? "",
      status: job.status ?? "",
      startDate: formatDateInput(job.startDate),
      price: job.price ?? 0,
      downPayment: job.downPayment ?? 0,
      budgetSpent: job.budgetSpent ?? 0,
      totalHours: job.totalHours ?? 0,
      setupCleanup: job.setupCleanup ?? 0,
      powerwash: job.powerwash ?? 0,
      laborHours: job.laborHours ?? 0,
    });
  }, [job]);

  const handleCancel = () => {
    setFormJob({
      title: job.title ?? "",
      status: job.status ?? "",
      startDate: formatDateInput(job.startDate),
      price: job.price ?? 0,
      downPayment: job.downPayment ?? 0,
      budgetSpent: job.budgetSpent ?? 0,
      totalHours: job.totalHours ?? 0,
      setupCleanup: job.setupCleanup ?? 0,
      powerwash: job.powerwash ?? 0,
      laborHours: job.laborHours ?? 0,
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!jobId) return;
    await updateJob({
      id: jobId,
      data: {
        clientId: job.clientId,
        quoteId: job.quoteId,
        salesRepId: job.salesRepId,
        title: formJob.title,
        status: formJob.status,
        startDate: formJob.startDate ? new Date(formJob.startDate) : undefined,
        price: Number(formJob.price) || 0,
        downPayment: Number(formJob.downPayment) || 0,
        budgetSpent: Number(formJob.budgetSpent) || 0,
        totalHours: Number(formJob.totalHours) || 0,
        setupCleanup: Number(formJob.setupCleanup) || 0,
        powerwash: Number(formJob.powerwash) || 0,
        laborHours: Number(formJob.laborHours) || 0,
      },
    }).unwrap();
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Edit/Save Buttons */}
      <div className="flex justify-end space-x-2">
        {isEditing ? (
          <>
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded-md disabled:opacity-60"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-md disabled:opacity-60"
              disabled={isSaving}
            >
              Save
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Edit
          </button>
        )}
      </div>
      {/* Job Header */}
      <JobDetailsHeader job={job} isEditing={isEditing} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-white shadow-md rounded-md border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Job Details
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoField
              label="Title"
              value={formJob.title}
              isEditing={isEditing}
              onChange={(value) =>
                setFormJob((prev) => ({ ...prev, title: value }))
              }
            />
            <InfoField
              label="Status"
              value={formJob.status}
              isEditing={isEditing}
              asSelect
              options={[...new Set([formJob.status, ...statusOptions])].filter(
                Boolean
              )}
              onChange={(value) =>
                setFormJob((prev) => ({ ...prev, status: value }))
              }
            />
            <InfoField
              label="Start Date"
              value={formJob.startDate}
              isEditing={isEditing}
              type="date"
              onChange={(value) =>
                setFormJob((prev) => ({ ...prev, startDate: value }))
              }
            />
            <InfoField label="Job ID" value={job.customJobId} readOnly />
            <InfoField
              label="Price"
              value={formJob.price}
              isEditing={isEditing}
              type="number"
              onChange={(value) =>
                setFormJob((prev) => ({ ...prev, price: value }))
              }
            />
            <InfoField
              label="Down Payment"
              value={formJob.downPayment}
              isEditing={isEditing}
              type="number"
              onChange={(value) =>
                setFormJob((prev) => ({ ...prev, downPayment: value }))
              }
            />
            <InfoField
              label="Budget Spent"
              value={formJob.budgetSpent}
              isEditing={isEditing}
              type="number"
              onChange={(value) =>
                setFormJob((prev) => ({ ...prev, budgetSpent: value }))
              }
            />
            <InfoField
              label="Total Hours"
              value={formJob.totalHours}
              isEditing={isEditing}
              type="number"
              onChange={(value) =>
                setFormJob((prev) => ({ ...prev, totalHours: value }))
              }
            />
            <InfoField
              label="Setup/Cleanup"
              value={formJob.setupCleanup}
              isEditing={isEditing}
              type="number"
              onChange={(value) =>
                setFormJob((prev) => ({ ...prev, setupCleanup: value }))
              }
            />
            <InfoField
              label="Powerwash"
              value={formJob.powerwash}
              isEditing={isEditing}
              type="number"
              onChange={(value) =>
                setFormJob((prev) => ({ ...prev, powerwash: value }))
              }
            />
            <InfoField
              label="Labor Hours"
              value={formJob.laborHours}
              isEditing={isEditing}
              type="number"
              onChange={(value) =>
                setFormJob((prev) => ({ ...prev, laborHours: value }))
              }
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white shadow-md rounded-md border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Sales Rep Information
            </h2>
            <div className="space-y-2 text-gray-700">
              <InfoLine label="Name" value={salesRep?.fullName} />
              <InfoLine label="Email" value={salesRep?.email} />
              <InfoLine label="Phone" value={salesRep?.phoneNumber} />
              <InfoLine label="Address" value={salesRep?.address} />
            </div>
          </div>

          <div className="p-6 bg-white shadow-md rounded-md border">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Quote Summary
            </h2>
            <div className="space-y-2 text-gray-700">
              <InfoLine label="Estimated Price" value={quote?.estimatedPrice} />
              <InfoLine label="Status" value={quote?.status} />
              <InfoLine
                label="Booked On Spot"
                value={quote?.bookedOnSpot ? "Yes" : "No"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Top Section: Client Info + Financials */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Info */}
        <div className="p-6 bg-white shadow-md rounded-md border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Client Information
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {client?.clientName || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Partner:</span>{" "}
              {client?.partnerName || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {client?.email || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {client?.phoneNumber || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {client?.address || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Lead Source:</span>{" "}
              {client?.leadSource || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Lead Status:</span>{" "}
              {client?.leadStatus || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Rating:</span>{" "}
              {client?.rating || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Custom Client ID:</span>{" "}
              {client?.customClientId || "N/A"}
            </p>
          </div>
        </div>

        {/* Financial Details */}
        <FinancialDetails
          job={{
            estimatedPrice: quote?.estimatedPrice || job.estimatedPrice,
            downPayment: job.downPayment,
            budgetSpent: job.budgetSpent,
            downPaymentStatus: job.downPaymentStatus,
            totalHours: job.totalHours,
            setupCleanup: job.setupCleanup,
            powerwash: job.powerwash,
            labourHours: job.labourHours,
          }}
          isEditing={false}
        />
      </div>


      {/* Notes Section */}
      <SharedNotes notes={job.notes} />
    </div>
  );
};

const InfoLine = ({ label, value }) => (
  <p>
    <span className="font-semibold">{label}:</span> {value || "N/A"}
  </p>
);

const InfoField = ({
  label,
  value,
  isEditing,
  type = "text",
  onChange,
  readOnly = false,
  asSelect = false,
  options = [],
}) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    {isEditing && !readOnly ? (
      asSelect ? (
        <select
          className="w-full rounded-md border px-3 py-2 text-sm"
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className="w-full rounded-md border px-3 py-2 text-sm"
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )
    ) : (
      <div className="rounded-md border px-3 py-2 text-sm text-gray-800">
        {value !== undefined && value !== null && value !== ""
          ? value
          : "N/A"}
      </div>
    )}
  </div>
);

export default PmJobDetailsPage;
