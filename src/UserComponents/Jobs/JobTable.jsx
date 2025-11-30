import React, { useState } from "react";

const JobTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const jobs = [
    {
      id: "J1234",
      client: "John Doe",
      jobTitle: "Kitchen Remodel",
      price: "$1,500.00",
      status: "Scheduled",
      startDate: "2025-11-25",
    },
    {
      id: "J1234",
      client: "Jane Smith",
      jobTitle: "Kitchen Remodel",
      price: "$5,000",
      status: "In Progress",
      startDate: "2025-11-22",
    },
    {
      id: "J1234",
      client: "Mark Johnson",
      jobTitle: "Kitchen Remodel",
      price: "$3,500",
      status: "Closed",
      startDate: "2025-11-15",
    },
    {
      id: "J1234",
      client: "Sarah Williams",
      jobTitle: "Kitchen Remodel",
      price: "$1,200",
      status: "In Progress",
      startDate: "2025-11-20",
    },
    {
      id: "J1234",
      client: "Robert Brown",
      jobTitle: "Kitchen Remodel",
      price: "$8,750",
      status: "Pending Close",
      startDate: "2025-11-10",
    },
    // Add more jobs here for pagination
  ];

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePagination = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="overflow-x-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Jobs</h2>
        <table className="min-w-full h-96 table-auto">
          <thead>
            <tr className="bg-blue-100 text-sm font-medium text-gray-600">
              <th className="py-3 px-6 text-left">Jobs ID</th>
              <th className="py-3 px-6 text-left">Client Name</th>
              <th className="py-3 px-6 text-left">Job Title</th>
              <th className="py-3 px-6 text-left">Estimated Price</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Start Date</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.map((job, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-6 text-sm text-gray-600">{job.id}</td>
                <td className="py-3 px-6 text-sm text-gray-600">
                  {job.client}
                </td>
                <td className="py-3 px-6 text-sm text-gray-600">
                  {job.jobTitle}
                </td>
                <td className="py-3 px-6 text-sm text-gray-600">{job.price}</td>
                <td
                  className={`py-3 px-6 text-sm font-medium text-white rounded-full ${
                    job.status === "Scheduled"
                      ? "bg-blue-500"
                      : job.status === "In Progress"
                      ? "bg-blue-300"
                      : job.status === "Closed"
                      ? "bg-gray-400"
                      : "bg-green-500"
                  }`}
                >
                  {job.status}
                </td>
                <td className="py-3 px-6 text-sm text-gray-600">
                  {job.startDate}
                </td>
                <td className="py-3 px-6 text-sm text-blue-600 cursor-pointer">
                  👁️
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-6">
          <span className="text-sm text-gray-600">
            Showing {indexOfFirstJob + 1}-
            {Math.min(indexOfLastJob, jobs.length)} of {jobs.length} Jobs
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() =>
                handlePagination(currentPage > 1 ? currentPage - 1 : 1)
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">{currentPage}</span>
            <button
              onClick={() =>
                handlePagination(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                )
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTable;
