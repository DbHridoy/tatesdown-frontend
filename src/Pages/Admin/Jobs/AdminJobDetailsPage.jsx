import JobDetailsHeader from "../../../Components/Sales-rep/Jobs/JobDetailsHeader";
import SharedNotes from "../../../Components/Sales-rep/Jobs/SharedNotes";
// import FinancialDetails from "../../../Components/Sales-rep/Jobs/FinancialDetails";
// import DC from "../../../Components/Sales-rep/Jobs/DC";
import { useEffect, useMemo, useState } from "react";
import {
  useGetJobByIdQuery,
  useUpdateJobMutation,
} from "../../../redux/api/jobApi";
import { useGetAllUsersQuery } from "../../../redux/api/userApi";
import { useParams } from "react-router-dom";
// import DesignConsultationCreate from "./DesignConsultation";

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

const AdminJobDetailsPage = () => {
  const { jobId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [showDcForm, setShowDcForm] = useState(false);
  const [formJob, setFormJob] = useState({
    title: "",
    status: "",
    startDate: "",
    estimatedStartDate: "",
    price: 0,
    downPayment: 0,
    downPaymentStatus: "",
    budgetSpent: 0,
    totalHours: 0,
    setupCleanup: 0,
    powerwash: 0,
    laborHours: 0,
  });
  const [assignedSalesRepId, setAssignedSalesRepId] = useState("");
  const [assignedProductionManagerId, setAssignedProductionManagerId] =
    useState("");
  const [isEditingAssignment, setIsEditingAssignment] = useState(false);

  const { data, isLoading, isError } = useGetJobByIdQuery(jobId, { skip: !jobId });
  const [updateJob, { isLoading: isSaving }] = useUpdateJobMutation();
  const { data: salesRepsData } = useGetAllUsersQuery({
    page: 1,
    limit: 0,
    filters: { role: "Sales Rep" },
  });
  const { data: productionManagersData } = useGetAllUsersQuery({
    page: 1,
    limit: 0,
    filters: { role: "Production Manager" },
  });

  const job = data?.data;
  const salesReps = salesRepsData?.data ?? [];
  const productionManagers = productionManagersData?.data ?? [];
  const designConsultation = useMemo(() => {
    if (!job?.designConsultation?.length) return null;
    return job.designConsultation[job.designConsultation.length - 1];
  }, [job?.designConsultation]);

  useEffect(() => {
    if (!job) return;
    setFormJob({
      title: job.title ?? "",
      status: job.status ?? "",
      startDate: formatDateInput(job.startDate),
      estimatedStartDate: formatDateInput(job.estimatedStartDate),
      price: job.price ?? 0,
      downPayment: job.downPayment ?? 0,
      downPaymentStatus: job.downPaymentStatus ?? "",
      budgetSpent: job.budgetSpent ?? 0,
      totalHours: job.totalHours ?? 0,
      setupCleanup: job.setupCleanup ?? 0,
      powerwash: job.powerwash ?? 0,
      laborHours: job.laborHours ?? 0,
    });
    setAssignedSalesRepId(
      typeof job.salesRepId === "string"
        ? job.salesRepId
        : job.salesRepId?._id || ""
    );
    setAssignedProductionManagerId(
      typeof job.productionManagerId === "string"
        ? job.productionManagerId
        : job.productionManagerId?._id || ""
    );
    setIsEditingAssignment(false);
  }, [job]);

  if (isLoading) return <p className="p-6">Loading job details...</p>;
  if (isError || !job) return <p className="p-6 text-red-500">Job not found</p>;

  const client = job.clientId;
  const quote = job.quoteId;
  const salesRep = job.salesRepId;
  const productionManager = job.productionManagerId;

  const handleCancel = () => {
    setFormJob({
      title: job.title ?? "",
      status: job.status ?? "",
      startDate: formatDateInput(job.startDate),
      estimatedStartDate: formatDateInput(job.estimatedStartDate),
      price: job.price ?? 0,
      downPayment: job.downPayment ?? 0,
      downPaymentStatus: job.downPaymentStatus ?? "",
      budgetSpent: job.budgetSpent ?? 0,
      totalHours: job.totalHours ?? 0,
      setupCleanup: job.setupCleanup ?? 0,
      powerwash: job.powerwash ?? 0,
      laborHours: job.laborHours ?? 0,
    });
    setIsEditing(false);
  };

  const handleAssignmentSave = async () => {
    if (!jobId) return;
    const currentSalesRepId =
      typeof job.salesRepId === "string"
        ? job.salesRepId
        : job.salesRepId?._id || "";
    const currentProductionManagerId =
      typeof job.productionManagerId === "string"
        ? job.productionManagerId
        : job.productionManagerId?._id || "";
    const updates = {};

    if (
      assignedSalesRepId &&
      assignedSalesRepId !== currentSalesRepId
    ) {
      updates.salesRepId = assignedSalesRepId;
    }
    if (
      assignedProductionManagerId &&
      assignedProductionManagerId !== currentProductionManagerId
    ) {
      updates.productionManagerId = assignedProductionManagerId;
    }

    if (Object.keys(updates).length === 0) {
      setIsEditingAssignment(false);
      return;
    }

    await updateJob({
      id: jobId,
      data: updates,
    }).unwrap();
    setIsEditingAssignment(false);
  };

  const handleSave = async () => {
    if (!jobId) return;
    await updateJob({
      id: jobId,
      data: {
        clientId: job.clientId,
        quoteId: job.quoteId,
        salesRepId: assignedSalesRepId || job.salesRepId,
        productionManagerId:
          assignedProductionManagerId || job.productionManagerId,
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
    <div className="p-4 sm:p-6 space-y-6">
      {/* Edit/Save Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-2">
        {/* {isEditing ? (
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
        )} */}
      </div>
      {/* Job Header */}
      {/* <JobDetailsHeader job={job} isEditing={isEditing} /> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 sm:p-6 bg-white shadow-md rounded-md border">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
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
              label="Estimated Start Date"
              value={formJob.estimatedStartDate}
              isEditing={isEditing}
              type="date"
              onChange={(value) =>
                setFormJob((prev) => ({ ...prev, estimatedStartDate: value }))
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
              label="Down Payment Status"
              value={formJob.downPaymentStatus}
              readOnly
            />
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
          <div className="p-4 sm:p-6 bg-white shadow-md rounded-md border">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Sales Rep Information
            </h2>
            <div className="space-y-2 text-sm sm:text-base text-gray-700">
              <InfoLine label="Name" value={salesRep?.fullName} />
              <InfoLine label="Email" value={salesRep?.email} />
              <InfoLine label="Phone" value={salesRep?.phoneNumber} />
              <InfoLine label="Address" value={salesRep?.address} />
            </div>
          </div>
          <div className="p-4 sm:p-6 bg-white shadow-md rounded-md border">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Production Manager Information
            </h2>
            <div className="space-y-2 text-sm sm:text-base text-gray-700">
              <InfoLine label="Name" value={productionManager?.fullName} />
              <InfoLine label="Email" value={productionManager?.email} />
              <InfoLine label="Phone" value={productionManager?.phoneNumber} />
              <InfoLine label="Address" value={productionManager?.address} />
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-white shadow-md rounded-md border">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Quote Summary
            </h2>
            <div className="space-y-2 text-sm sm:text-base text-gray-700">
              <InfoLine label="Estimated Price" value={quote?.estimatedPrice} />
              <InfoLine label="Status" value={quote?.status} />
              <InfoLine
                label="Booked on the spot"
                value={quote?.bookedOnSpot ? "Yes" : "No"}
              />
            </div>
          </div>
          <div className="p-4 sm:p-6 bg-white shadow-md rounded-md border">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Client Information
            </h2>
            <div className="space-y-2 text-sm sm:text-base text-gray-700">
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
        </div>
      </div>

      <div className="p-4 sm:p-6 bg-white shadow-md rounded-md border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Assignment
          </h2>
          {isEditingAssignment ? (
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  setAssignedSalesRepId(
                    typeof job.salesRepId === "string"
                      ? job.salesRepId
                      : job.salesRepId?._id || ""
                  );
                  setAssignedProductionManagerId(
                    typeof job.productionManagerId === "string"
                      ? job.productionManagerId
                      : job.productionManagerId?._id || ""
                  );
                  setIsEditingAssignment(false);
                }}
                className="w-full sm:w-auto border px-4 py-2 rounded-md text-sm sm:text-base disabled:opacity-60"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                onClick={handleAssignmentSave}
                className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md text-sm sm:text-base disabled:opacity-60"
                disabled={isSaving}
              >
                Save Assignment
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingAssignment(true)}
              className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md text-sm sm:text-base"
            >
              Edit Assignment
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Sales Rep
            </label>
            <select
              className="w-full rounded-md border px-3 py-2 text-sm sm:text-base"
              value={assignedSalesRepId}
              onChange={(e) => setAssignedSalesRepId(e.target.value)}
              disabled={!isEditingAssignment}
            >
              <option value="">Select Sales Rep</option>
              {salesReps.map((rep) => (
                <option key={rep._id} value={rep._id}>
                  {rep.fullName}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Production Manager
            </label>
            <select
              className="w-full rounded-md border px-3 py-2 text-sm sm:text-base"
              value={assignedProductionManagerId}
              onChange={(e) => setAssignedProductionManagerId(e.target.value)}
              disabled={!isEditingAssignment}
            >
              <option value="">Select Production Manager</option>
              {productionManagers.map((pm) => (
                <option key={pm._id} value={pm._id}>
                  {pm.fullName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 bg-white shadow-md rounded-md border">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Design Consultation
        </h2>
        {job.designConsultation?.length ? (
          <div className="space-y-4">
            {job.designConsultation.map((dc) => (
              <div key={dc._id} className="rounded-md border p-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <InfoLine label="Product" value={dc.product} />
                  <InfoLine label="Color Code" value={dc.colorCode} />
                  <InfoLine
                    label="Estimated Gallons"
                    value={dc.estimatedGallons}
                  />
                  <InfoLine
                    label="Upsell Description"
                    value={dc.upsellDescription}
                  />
                  <InfoLine label="Upsell Value" value={dc.upsellValue} />
                  <InfoLine label="Added Hours" value={dc.addedHours} />
                  <InfoLine
                    label="Estimated Start Date"
                    value={
                      dc.estimatedStartDate
                        ? new Date(dc.estimatedStartDate).toLocaleDateString()
                        : "N/A"
                    }
                  />
                  <InfoLine
                    label="File"
                    value={
                      dc.file ? (
                        <a
                          href={dc.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View file
                        </a>
                      ) : (
                        "N/A"
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No design consultation data.</p>
        )}
      </div>

      {/* <DC
        jobId={jobId}
        actionLabel={designConsultation ? "Edit DC" : "Add DC"}
        onAction={() => setShowDcForm((prev) => !prev)}
      />

      {showDcForm && (
        <DesignConsultationCreate
          jobId={jobId}
          initialData={designConsultation}
          mode={designConsultation ? "edit" : "create"}
          onCancel={() => setShowDcForm(false)}
          onSaved={() => setShowDcForm(false)}
        />
      )} */}

      {/* Notes Section */}
      <SharedNotes notes={job.notes} />
    </div>
  );
};

const InfoLine = ({ label, value }) => (
  <p className="text-sm sm:text-base">
    <span className="font-semibold">{label}:</span>{" "}
    {value !== undefined && value !== null && value !== "" ? value : "N/A"}
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
          className="w-full rounded-md border px-3 py-2 text-sm sm:text-base"
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
          className="w-full rounded-md border px-3 py-2 text-sm sm:text-base"
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )
    ) : (
      <div className="rounded-md border px-3 py-2 text-sm sm:text-base text-gray-800">
        {value !== undefined && value !== null && value !== ""
          ? value
          : "N/A"}
      </div>
    )}
  </div>
);

export default AdminJobDetailsPage;
