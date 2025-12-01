import JobDetailsHeader from "../../UserComponents/Jobs/JobDetailsHeader";
import JobDetails from "../../UserComponents/Jobs/JobDetails";
import FinancialDetails from "../../UserComponents/Jobs/FinancialDetails";
import DocumentControl from "../../UserComponents/Jobs/DocumentControl";
import SharedNotes from "../../UserComponents/Jobs/SharedNotes";
import { useState } from "react";
// Main JobDetails Page Component
const JobDetailsPage = () => {
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
      
      {isEditing? (
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
      ): (
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

export default JobDetailsPage;
