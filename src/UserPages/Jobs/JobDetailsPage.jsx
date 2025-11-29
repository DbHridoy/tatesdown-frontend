import React, { useState } from "react";
import JobDetails from "../../UserComponents/Jobs/JobDetails";
import JobInfo from "../../UserComponents/Jobs/JobInfo";

// Job Header Component
const JobHeader = ({
  jobTitle,
  jobStatus,
  startDate,
  clientName,
  clientContact,
}) => (
  <div className="flex justify-between items-center mb-6">
    <div>
      <h2 className="text-2xl font-semibold">{jobTitle}</h2>
      <p className="text-sm text-gray-500">Start Date: {startDate}</p>
    </div>
    <div className="flex items-center space-x-4">
      <span
        className={`py-1 px-3 rounded-full text-xs font-semibold ${
          jobStatus === "In Progress"
            ? "bg-blue-100 text-blue-600"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {jobStatus}
      </span>
      <button className="text-sm text-blue-600 hover:underline">
        Edit Jobs
      </button>
      <button className="text-sm text-red-600 hover:underline">
        Close Job
      </button>
    </div>
  </div>
);

// Financial Details Component
const FinancialDetails = ({ contractValue, budgetSpent, budgetRemaining }) => {
  const budgetProgress = (budgetSpent / contractValue) * 100;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">Financial Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contract Value
          </label>
          <input
            type="text"
            value={`$${contractValue}`}
            readOnly
            className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Budget Spent
          </label>
          <input
            type="text"
            value={`$${budgetSpent}`}
            readOnly
            className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Remaining
          </label>
          <input
            type="text"
            value={`$${budgetRemaining}`}
            readOnly
            className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-600">Budget Progress</p>
        <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${budgetProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// DocumentControl Component
const DocumentControl = ({ documents }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg mb-6">
    <h3 className="text-xl font-semibold mb-4">DC (Document Control)</h3>
    <div className="mb-4 flex justify-end">
      <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">
        + Add Document
      </button>
    </div>
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 text-left">Document Name</th>
          <th className="px-4 py-2 text-left">Type</th>
          <th className="px-4 py-2 text-left">Uploaded By</th>
          <th className="px-4 py-2 text-left">Date</th>
          <th className="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((doc, index) => (
          <tr key={index} className="border-t">
            <td className="px-4 py-2">{doc.name}</td>
            <td className="px-4 py-2">{doc.type}</td>
            <td className="px-4 py-2">{doc.uploadedBy}</td>
            <td className="px-4 py-2">{doc.date}</td>
            <td className="px-4 py-2">
              <button className="text-blue-600 hover:underline">
                Download
              </button>
              <span className="mx-2">|</span>
              <button className="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Shared Notes Component
const SharedNotes = ({ notes }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold">Shared Notes</h3>
    <div className="mt-4">
      {notes.map((note, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm mb-4">
          <p className="font-semibold">{note.author}</p>
          <p className="text-sm text-gray-600">{note.timestamp}</p>
          <p className="text-gray-700 mt-2">{note.content}</p>
        </div>
      ))}
    </div>
  </div>
);

// Add Note Input Component
const NoteInput = () => (
  <div className="mt-6">
    <textarea
      className="w-full p-4 border border-gray-300 rounded-lg"
      placeholder="Add a note for the team..."
      rows="4"
    ></textarea>
    <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
      Post Note
    </button>
  </div>
);

// Main JobDetails Page Component
const JobDetailsPage = () => {
  const [budgetSpent] = useState(0);
  const [budgetRemaining] = useState(5000);
  const totalBudget = 5000;

  const documents = [
    { name: "Building Plans - Final.pdf" },
    { name: "Contract Amendment - v2.docx" },
    { name: "Material Cost Breakdown.xlsx" },
  ];

  const notes = [
    {
      author: "Jennifer Martinez (Sales Representative)",
      timestamp: "03/10/2024 at 2:45 PM",
      content:
        "Client requested additional electrical outlets in conference rooms. Need to revise quote and timeline. Estimated additional cost: $8,500",
    },
    {
      author: "Michael Torres (Project Manager)",
      timestamp: "03/11/2024 at 9:15 AM",
      content:
        "Reviewed the request. We can accommodate this with minimal timeline impact. I'll coordinate with the electrical contractor. Should be ready to schedule by end of week.",
    },
  ];
  const [contractValue] = useState(5000);




  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Job Header */}
      <JobHeader
        jobTitle="Kitchen Remodel"
        jobStatus="In Progress"
        startDate="2025-11-25"
        clientName="Jane Smith"
        clientContact="(555) 123-4567"
      />
      <JobInfo />
      {/* Job Details */}
      <JobDetails
        jobTitle="Commercial Building Renovation - Phase 2"
        startDate="03/15/2025"
        endDate="06/30/2025"
        location="450 Market Street, San Francisco, CA 94102"
        description="Complete renovation of commercial office space including HVAC system upgrade, electrical rewiring, new flooring installation, and interior wall modifications. Project includes coordination with building management and compliance with local building codes."
      />

      {/* Financial Details */}
      <FinancialDetails
        contractValue={contractValue}
        budgetSpent={budgetSpent}
        budgetRemaining={budgetRemaining}
      />

      {/* Document Control */}
      <DocumentControl documents={documents} />

      {/* Shared Notes */}
      <SharedNotes notes={notes} />

      {/* Add a New Note */}
      <NoteInput />
    </div>
  );
};

export default JobDetailsPage;
