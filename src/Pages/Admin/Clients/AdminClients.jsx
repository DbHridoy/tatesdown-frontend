import React, { useState, useMemo } from "react";
import { FaRegEdit, FaUser } from "react-icons/fa";
import { IoClose, IoPersonSharp } from "react-icons/io5";
import { LuEye, LuPhone } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const AdminClients = () => {
  const navigate = useNavigate();
  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-200 text-blue-800";
      case "In progress":
        return "bg-yellow-200 text-yellow-800";
      case "Closed":
        return "bg-gray-200 text-gray-800";
      case "Pending":
        return "bg-orange-200 text-orange-800";
      case "Completed":
        return "bg-green-200 text-green-800";
      default:
        return "";
    }
  };
  // Initial filter state
  const [filters, setFilters] = useState({
    salesRep: "All Sales Reps",
    status: "All Statuses",
    timeRange: "All Time Ranges",
    cluster: "All Clusters",
  });

  // Dummy data
  const data = [
    {
      id: "L1234",
      clientName: "John Doe",
      cluster: "North Shore",
      salesRep: "Rep A",
      status: "New",
      startDate: "2025/11/25",
    },
    {
      id: "Q1234",
      clientName: "Jane Smith",
      cluster: "Inner West",
      salesRep: "Rep B",
      status: "In progress",
      startDate: "2025/11/24",
    },
    {
      id: "J1234",
      clientName: "Mark Johnson",
      cluster: "Eastern Suburbs",
      salesRep: "Rep C",
      status: "Closed",
      startDate: "2025/11/20",
    },
    {
      id: "L1234",
      clientName: "Sarah Williams",
      cluster: "North Shore",
      salesRep: "Rep D",
      status: "Pending",
      startDate: "2025/11/15",
    },
    {
      id: "J1234",
      clientName: "Robert Brown",
      cluster: "Inner West",
      salesRep: "Rep B",
      status: "Completed",
      startDate: "2025/11/10",
    },
    {
      id: "L5678",
      clientName: "Emily Davis",
      cluster: "North Shore",
      salesRep: "Rep A",
      status: "New",
      startDate: "2025/10/05",
    },
    {
      id: "Q5678",
      clientName: "Chris Lee",
      cluster: "Inner West",
      salesRep: "Rep B",
      status: "In progress",
      startDate: "2025/09/20",
    },
    // Add more dummy data as needed
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  ("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  // Filter logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return (
        (filters.salesRep === "All Sales Reps" ||
          item.salesRep === filters.salesRep) &&
        (filters.status === "All Statuses" || item.status === filters.status) &&
        (filters.timeRange === "All Time Ranges" ||
          item.startDate >= "2025/01/01") && // You can modify this to handle different time ranges
        (filters.cluster === "All Clusters" || item.cluster === filters.cluster)
      );
    });
  }, [filters, data]);

  // Pagination calculation
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle filter change
  const handleFilterChange = (e, filterName) => {
    setFilters({ ...filters, [filterName]: e.target.value });
    setCurrentPage(1); // Reset to first page on filter change
  };

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="p-6 mb-2 border rounded-lg shadow-sm">
        <div className="flex justify-between mb-4 ">
          <div>
            <h3 className="mb-4 font-semibold">Filters</h3>
          </div>
          <div>
            <button
              className="text-blue-500"
              onClick={() =>
                setFilters({
                  salesRep: "All Sales Reps",
                  status: "All Statuses",
                  timeRange: "All Time Ranges",
                  cluster: "All Clusters",
                })
              }
            >
              Reset All
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-[16px] mb-2"> Sales Rep</p>
            <select
              value={filters.salesRep}
              onChange={(e) => handleFilterChange(e, "salesRep")}
              className="px-4 py-2 border rounded-md"
            >
              <option>All Sales Reps</option>
              <option>Rep A</option>
              <option>Rep B</option>
              <option>Rep C</option>
            </select>
          </div>

          <div>
            <p className="text-[16px] mb-2"> Status</p>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange(e, "status")}
              className="p-2 border rounded-md"
            >
              <option>All Statuses</option>
              <option>New</option>
              <option>In progress</option>
              <option>Closed</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>
          </div>

          <div>
            <p className="text-[16px] mb-2"> Time Range</p>
            <select
              value={filters.timeRange}
              onChange={(e) => handleFilterChange(e, "timeRange")}
              className="p-2 border rounded-md"
            >
              <option>All Time Ranges</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>

          <div>
            <p className="text-[16px] mb-2"> Cluster</p>
            <select
              value={filters.cluster}
              onChange={(e) => handleFilterChange(e, "cluster")}
              className="p-2 border rounded-md"
            >
              <option>All Clusters</option>
              <option>North Shore</option>
              <option>Inner West</option>
              <option>Eastern Suburbs</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 mb-4">
        <p className="text-xl">248 total records</p>
      </div>

      {/* Table */}
      <table className="min-w-full border-collapse table-auto">
        <thead>
          <tr className="bg-[#D9EBF8] ">
            <th className="px-6 py-3 text-left">ID</th>
            <th className="px-6 py-3 text-left">Client Name</th>
            <th className="px-6 py-3 text-left">Cluster</th>
            <th className="px-6 py-3 text-left">Sales Rep</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Start Date</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((job) => (
            <tr key={job.id} className="border-b">
              <td className="py-3 px-6 text-[#007CCD]">{job.id}</td>
              <td className="px-6 py-3">
                <div className="flex item-center gap-x-3">
                  <div className="w-[50px] h-[50px] rounded-full bg-[#C4C4C4]"></div>
                  <p className="mt-3"> {job.clientName}</p>
                </div>
              </td>
              <td className="px-6 py-3">{job.cluster}</td>
              <td className="px-6 py-3">{job.salesRep}</td>
              <td className="px-6 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                    job.status
                  )}`}
                >
                  {job.status}
                </span>
              </td>
              <td className="px-6 py-3">{job.startDate}</td>
              <td className="flex gap-2 px-6 py-3">
                <div
                  className="text-gray-500 hover:text-blue-500"
                  onClick={() => {
                    setSelectedLead(job);
                    setIsModalOpen(true);
                  }}
                >
                  <LuEye size={20} />
                </div>
                <div
                  className="text-gray-500 hover:text-blue-500"
                  onClick={() => {
                    setSelectedLead(job);
                    setIsEditModalOpen(true);
                  }}
                >
                  <FaRegEdit size={20} />
                </div>
                <div onClick={()=>navigate("/s/admin/impersonate-view")} className="text-gray-500 hover:text-red-500">
                  <IoPersonSharp size={20} />
                </div>
                <div
                  className="text-gray-500 hover:text-red-500"
                  onClick={() => {
                    setSelectedLead(job);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  <RiDeleteBinLine size={20} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <span>
          Showing {indexOfFirstItem + 1}-{indexOfLastItem} of{" "}
          {filteredData.length} Jobs
        </span>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-md"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(Math.ceil(filteredData.length / pageSize))].map(
            (_, index) => (
              <button
                key={index}
                className={`py-2 px-4 border rounded-md ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
          <button
            className="px-4 py-2 rounded-md"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredData.length / pageSize)}
          >
            Next
          </button>
        </div>
      </div>

      {/* ====================Lead Details Modal ====================*/}
      {isModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[600px] rounded-xl shadow-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b">
              <div>
                <h2 className="text-xl font-semibold">Lead Details</h2>
                <p className="mt-1 text-gray-500">ID: {selectedLead.id}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)}>
                {" "}
                <IoClose size={20} />{" "}
              </button>
            </div>

            {/* Lead ID */}

            {/* Client Information */}
            <div className="p-4 mt-5 border rounded-lg">
              <h3 className="mb-2 font-semibold">Client Information</h3>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-[60px] h-[60px] bg-gray-300 rounded-full"></div>
                <div>
                  <p className="text-lg font-semibold">
                    {selectedLead.clientName}
                  </p>
                  <p className="text-gray-500">Client since Jan 2025</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="mb-3">
                  <p className="font-medium">Phone *</p>
                  <input
                    type="text"
                    disabled
                    className="w-full px-3 py-2 border rounded-md"
                    defaultValue="12325-54856"
                  />
                </div>

                <div className="mb-3">
                  <p className="font-medium">Email *</p>
                  <input
                    disabled
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    defaultValue="sample@gmail.com"
                  />
                </div>
              </div>

              <div>
                <p className="font-medium">Address *</p>
                <input
                  type="text"
                  disabled
                  className="w-full px-3 py-2 border rounded-md"
                  defaultValue="1234 Main St, City, State, ZIP"
                />
              </div>
            </div>

            {/* Call History */}
            <div className="mt-5">
              <h3 className="mb-2 font-semibold">Call History</h3>
              <div className="flex justify-between p-3 mb-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-[#D9EBF8] w-12 h-12 rounded-full flex items-center justify-center">
                    <LuPhone />
                  </div>
                  <div>
                    <p className="font-medium">Outbound Call</p>
                    <p className="text-sm text-gray-500">
                      Discussed project details. Client interested.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">2 days ago</p>
              </div>

              <div className="flex justify-between p-3 mb-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-[#D9EBF8] w-12 h-12 rounded-full flex items-center justify-center">
                    <LuPhone />
                  </div>
                  <div>
                    <p className="font-medium">Outbound Call</p>
                    <p className="text-sm text-gray-500">
                      Discussed project details. Client interested.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">2 days ago</p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-between mt-6">
              <button
                className="px-5 flex gap-x-2 items-center py-2 border border-[#000000CC] rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                <IoClose />
                <span>Cancel</span>
              </button>

              <button onClick={()=>navigate("/s/admin/impersonate-view")} className="px-5 py-2 flex items-center gap-x-4 text-white bg-[#007CCD] rounded-md">
                <FaUser />
                <span>Impersonate View</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/*=========================== edit Modal =========================== */}
      {isEditModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[600px] rounded-xl shadow-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b">
              <div>
                <h2 className="text-xl font-semibold">Lead Details</h2>
                <p className="mt-1 text-gray-500">ID: {selectedLead.id}</p>
              </div>
              <button onClick={() => setIsEditModalOpen(false)}>
                {" "}
                <IoClose size={20} />{" "}
              </button>
            </div>

            {/* Lead ID */}

            {/* Client Information */}
            <div className="p-4 mt-5 border rounded-lg">
              <h3 className="mb-2 font-semibold">Client Information</h3>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-[60px] h-[60px] bg-gray-300 rounded-full"></div>
                <div>
                  <p className="text-lg font-semibold">
                    {selectedLead.clientName}
                  </p>
                  <p className="text-gray-500">Client since Jan 2025</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="mb-3">
                  <p className="font-medium">Phone *</p>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    defaultValue="12325-54856"
                  />
                </div>

                <div className="mb-3">
                  <p className="font-medium">Email *</p>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    defaultValue="sample@gmail.com"
                  />
                </div>
              </div>

              <div>
                <p className="font-medium">Address *</p>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  defaultValue="1234 Main St, City, State, ZIP"
                />
              </div>
            </div>

            {/* Call History */}
            <div className="mt-5">
              <h3 className="mb-2 font-semibold">Call History</h3>
              <div className="flex justify-between p-3 mb-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-[#D9EBF8] w-12 h-12 rounded-full flex items-center justify-center">
                    <LuPhone />
                  </div>
                  <div>
                    <p className="font-medium">Outbound Call</p>
                    <p className="text-sm text-gray-500">
                      Discussed project details. Client interested.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">2 days ago</p>
              </div>

              <div className="flex justify-between p-3 mb-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-[#D9EBF8] w-12 h-12 rounded-full flex items-center justify-center">
                    <LuPhone />
                  </div>
                  <div>
                    <p className="font-medium">Outbound Call</p>
                    <p className="text-sm text-gray-500">
                      Discussed project details. Client interested.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">2 days ago</p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-between mt-6">
              <button
                className="px-5 flex gap-x-2 items-center py-2 border border-[#000000CC] rounded-md"
                onClick={() => setIsEditModalOpen(false)}
              >
                <IoClose />
                <span>Cancel</span>
              </button>

              <button onClick={()=>navigate("/s/admin/impersonate-view")} className="px-5 py-2 flex items-center gap-x-4 text-white bg-[#007CCD] rounded-md">
                <FaUser />
                <span>Impersonate View</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ====================Delete Modal ====================*/}
      {isDeleteModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg w-96">
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold text-red-500">Delete User</div>
               <button  onClick={() => setIsModalOpen(false)}>
                {" "}
                <IoClose size={20} />{" "}
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Are you sure you want to delete this user? This action cannot be undone.
            </div>
            <div className="mt-4">
              <input
                type="text"
                value="Sarah Mitchell"
                readOnly
                className="w-full p-2 mb-2 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                value="john@example.com"
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
               onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-500 border rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
               onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Yes, Delete
              </button>
           
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClients;
