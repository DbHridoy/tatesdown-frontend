import JobDetailsHeader from "../../../Components/Sales-rep/Jobs/JobDetailsHeader";
import SharedNotes from "../../../Components/Sales-rep/Jobs/SharedNotes";
import FinancialDetails from "../../../Components/Sales-rep/Jobs/FinancialDetails";
import { useState } from "react";
import { useGetJobByIdQuery } from "../../../redux/api/jobApi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DC from "../../../Components/Sales-rep/Jobs/DC";

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetJobByIdQuery(jobId, {
    skip: !jobId,
  });
  console.log(data)

  const job = data?.data;
  console.log("job", job);
  // 🔄 Loading state
  if (isLoading) {
    return <p className="p-6">Loading job details...</p>;
  }

  // ❌ Error or not found
  if (isError || !job) {
    return <p className="p-6 text-red-500">Job not found</p>;
  }

  return (
    <>
      <div className="mb-4 flex justify-between">
        <p className="text-xl font-semibold">Job Details</p>
        <button
          className="text-xl font-semibold bg-primarycolor text-white px-4 py-2 rounded"
          onClick={() =>
            navigate(`/s/sales-rep/jobs/${jobId}/design-consultation`)
          }
        >
          + Add DC
        </button>
      </div>

      <JobDetailsHeader job={job} isEditing={isEditing} />

      {/* Optional */}
      {/* <JobDetails job={job} isEditing={isEditing} /> */}

      <FinancialDetails job={job} isEditing={isEditing} />
      <DC job={job} />
      <SharedNotes notes={job.notes} />

      <div className="flex justify-end mt-6">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
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
    </>
  );
};

export default JobDetailsPage;
