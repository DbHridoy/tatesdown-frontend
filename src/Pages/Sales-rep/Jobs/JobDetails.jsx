import JobDetailsHeader from "../../../Components/Sales-rep/Jobs/JobDetailsHeader";
import JobDetails from "../../../Components/Sales-rep/Jobs/JobDetails";
import FinancialDetails from "../../../Components/Sales-rep/Jobs/FinancialDetails";
import DocumentControl from "../../../Components/Sales-rep/Jobs/DocumentControl";
import SharedNotes from "../../../Components/Sales-rep/Jobs/SharedNotes";
import { useState } from "react";
// Main JobDetails Page Component
const JobDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      <div>
        <p>Job Details</p>
      </div>
      <JobDetailsHeader />
      <JobDetails />
      <FinancialDetails />
      <DocumentControl />
      <SharedNotes />

      {isEditing ? (
        <div className="flex justify-end">
          <button
            onClick={() => setIsEditing(false)}
            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Edit
          </button>
        </div>
      )}
    </>
  );
};

export default JobDetails;
