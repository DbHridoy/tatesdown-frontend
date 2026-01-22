import SharedNotes from "../../../Components/Sales-rep/Jobs/SharedNotes";
import DC from "../../../Components/Sales-rep/Jobs/DC";
import JobDetailsOverview from "../../../Components/Common/JobDetailsOverview";
import { useEffect, useMemo, useState } from "react";
import {
  useGetJobByIdQuery,
  useUpdateJobMutation,
} from "../../../redux/api/jobApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/slice/authSlice";
import DesignConsultationCreate from "./DesignConsultation";

const formatDateInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

const statusOptions = [
  "Ready to Schedule",
  "Scheduled and Open",
  "Pending Close",
  "Cancelled",
];

const PmJobDetailsPage = () => {
  const { jobId } = useParams();
  const user = useSelector(selectCurrentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [showDcForm, setShowDcForm] = useState(false);
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

  const { data, isLoading, isError } = useGetJobByIdQuery(jobId, { skip: !jobId });
  const [updateJob, { isLoading: isSaving }] = useUpdateJobMutation();

  const job = data?.data;
  const productionManagerId = job?.productionManagerId?._id ?? job?.productionManagerId;
  const canManageJob = Boolean(productionManagerId && user?._id && productionManagerId === user._id);
  const statusOptionsForEdit = useMemo(
    () => [...new Set([formJob.status, ...statusOptions])].filter(Boolean),
    [formJob.status]
  );
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
      price: job.price ?? 0,
      downPayment: job.downPayment ?? 0,
      budgetSpent: job.budgetSpent ?? 0,
      totalHours: job.totalHours ?? 0,
      setupCleanup: job.setupCleanup ?? 0,
      powerwash: job.powerwash ?? 0,
      laborHours: job.laborHours ?? 0,
    });
  }, [job]);

  if (isLoading) return <p className="p-6">Loading job details...</p>;
  if (isError || !job) return <p className="p-6 text-red-500">Job not found</p>;

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

  const getStatusAction = () => {
    if (job?.status === "Ready to Schedule") {
      return {
        label: "Mark as Scheduled and Open",
        nextStatus: "Scheduled and Open",
      };
    }
    if (job?.status === "Scheduled and Open") {
      return {
        label: "Mark as Pending Close",
        nextStatus: "Pending Close",
      };
    }
    return null;
  };

  const handleStatusUpdate = async (nextStatus) => {
    if (!jobId || !nextStatus) return;
    await updateJob({
      id: jobId,
      data: { status: nextStatus },
    }).unwrap();
  };

  return (
    <div className="page-container space-y-6">
      {/* Edit/Save Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-2">
        {!canManageJob ? null : isEditing ? (
          <>
            <button
              onClick={handleCancel}
              className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-md text-sm sm:text-base disabled:opacity-60"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-md text-sm sm:text-base disabled:opacity-60"
              disabled={isSaving}
            >
              Save
            </button>
            {getStatusAction() && (
              <button
                onClick={() => handleStatusUpdate(getStatusAction().nextStatus)}
                className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-md text-sm sm:text-base disabled:opacity-60"
                disabled={isSaving}
              >
                {getStatusAction().label}
              </button>
            )}
            {job?.status !== "Cancelled" && (
              <button
                onClick={() => handleStatusUpdate("Cancelled")}
                className="w-full sm:w-auto bg-gray-800 text-white px-4 py-2 rounded-md text-sm sm:text-base disabled:opacity-60"
                disabled={isSaving}
              >
                Mark as Cancelled
              </button>
            )}
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md text-sm sm:text-base"
            >
              Edit
            </button>
            {getStatusAction() && (
              <button
                onClick={() => handleStatusUpdate(getStatusAction().nextStatus)}
                className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-md text-sm sm:text-base"
              >
                {getStatusAction().label}
              </button>
            )}
            {job?.status !== "Cancelled" && (
              <button
                onClick={() => handleStatusUpdate("Cancelled")}
                className="w-full sm:w-auto bg-gray-800 text-white px-4 py-2 rounded-md text-sm sm:text-base"
              >
                Mark as Cancelled
              </button>
            )}
          </>
        )}
      </div>
      {/* Job Header */}
      {/* <JobDetailsHeader job={job} isEditing={isEditing} /> */}

      <JobDetailsOverview
        job={job}
        formJob={formJob}
        isEditing={isEditing}
        statusOptions={statusOptionsForEdit}
        onFieldChange={(field, value) =>
          setFormJob((prev) => ({ ...prev, [field]: value }))
        }
        readOnlyFields={[
          {
            label: "Estimated Start Date",
            value: job.estimatedStartDate
              ? new Date(job.estimatedStartDate).toLocaleDateString()
              : null,
          },
          { label: "Down Payment Status", value: job.downPaymentStatus },
          { label: "Estimated Gallons", value: job.estimatedGallons },
        ]}
        readOnlyFieldsPosition="afterStartDate"
        readOnlyFieldKeys={[
          "status",
          "price",
          "downPayment",
          "budgetSpent",
          "totalHours",
          "setupCleanup",
          "powerwash",
          "laborHours",
        ]}
      />

      <DC
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
      )}

      {/* Top Section: Client Info + Financials */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Info */}
        
      </div>


      {/* Notes Section */}
      <SharedNotes notes={job.notes} />
    </div>
  );
};

export default PmJobDetailsPage;
