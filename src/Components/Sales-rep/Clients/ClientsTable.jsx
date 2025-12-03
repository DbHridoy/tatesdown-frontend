import { useState } from "react";
import { AddToListIcon, Delete02Icon, ViewIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "react-router-dom";

const LeadRow = ({ client, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <tr className="border-t hover:bg-gray-50 transition-colors duration-200">
      <td className="px-3 sm:px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <span className="text-lg sm:text-xl text-gray-700 font-medium">
              {client.name[0]}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 truncate">{client.name}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
              <a
                href={`tel:${client.phone}`}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline truncate"
              >
                {client.phone}
              </a>
              <a
                href={`mailto:${client.email}`}
                className="text-sm text-gray-600 hover:text-gray-800 hover:underline truncate hidden sm:block"
              >
                {client.email}
              </a>
            </div>
          </div>
        </div>
      </td>
      
      <td className="px-3 sm:px-4 py-3 text-sm text-gray-700 hidden md:table-cell">
        <span className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm ${client.leadSourceColor}`}>
          {client.leadSource}
        </span>
      </td>
      
      <td className="px-3 sm:px-4 py-3 text-sm text-gray-700 hidden lg:table-cell">
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500 text-sm">{client.rating}</span>
          <span className="text-xs text-gray-500">({client.ratingCount})</span>
        </div>
      </td>
      
      <td className="px-3 sm:px-4 py-3 text-sm">
        <span className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap ${client.callStatusColor}`}>
          {client.callStatus}
        </span>
      </td>
      
      <td className="px-3 sm:px-4 py-3 text-sm">
        <div className="flex justify-end sm:justify-start space-x-2">
          <button
            onClick={() => handleDelete(client)}
            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
            aria-label={`Delete ${client.name}`}
          >
            <HugeiconsIcon icon={Delete02Icon} className="w-5 h-5" />
          </button>
          <button
            className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors hidden sm:block"
            aria-label="Add to list"
          >
            <HugeiconsIcon icon={AddToListIcon} className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate("/s/sales-rep/client-details")}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors"
            aria-label={`View details for ${client.name}`}
          >
            <HugeiconsIcon icon={ViewIcon} className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Mobile Card View for Small Screens
const LeadCard = ({ client, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <span className="text-lg text-gray-700 font-medium">
              {client.name[0]}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 truncate">{client.name}</h3>
            <div className="mt-1 space-y-1">
              <a
                href={`tel:${client.phone}`}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline block truncate"
              >
                {client.phone}
              </a>
              <a
                href={`mailto:${client.email}`}
                className="text-sm text-gray-600 hover:text-gray-800 hover:underline block truncate"
              >
                {client.email}
              </a>
            </div>
          </div>
        </div>
        <div className="flex space-x-1 ml-2">
          <button
            onClick={() => handleDelete(client)}
            className="p-1.5 text-red-500 hover:text-red-700"
            aria-label={`Delete ${client.name}`}
          >
            <HugeiconsIcon icon={Delete02Icon} className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate("/s/sales-rep/client-details")}
            className="p-1.5 text-gray-500 hover:text-gray-700"
            aria-label={`View details for ${client.name}`}
          >
            <HugeiconsIcon icon={ViewIcon} className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          <span className={`px-3 py-1 rounded-full text-xs ${client.leadSourceColor}`}>
            {client.leadSource}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs ${client.callStatusColor}`}>
            {client.callStatus}
          </span>
          <div className="flex items-center space-x-1 ml-auto">
            <span className="text-yellow-500 text-sm">{client.rating}</span>
            <span className="text-xs text-gray-500">({client.ratingCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({ showModal, client, onCancel, onConfirm }) => {
  if (!showModal) return null;
  
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md">
        <div className="p-5 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
            Confirm Deletion
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            Are you sure you want to delete the record for <span className="font-medium text-gray-800">{client?.name}</span>?
          </p>
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors duration-200 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(client)}
              className="px-4 py-2.5 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium text-white transition-colors duration-200 w-full sm:w-auto"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [viewMode, setViewMode] = useState("table"); // "table" or "card"

  const leads = [
    {
      name: "Sarah Mitchell",
      phone: "555-12345",
      email: "johan.do@gmail.com",
      leadSource: "Inbound",
      leadSourceColor: "bg-green-100 text-green-800",
      rating: "★★★★☆",
      ratingCount: 4,
      callStatus: "Picked-up yes",
      callStatusColor: "bg-blue-100 text-blue-800",
    },
    {
      name: "Jane Smith",
      phone: "555-12345",
      email: "jane.smith@gmail.com",
      leadSource: "Social",
      leadSourceColor: "bg-blue-100 text-blue-800",
      rating: "★★★☆☆",
      ratingCount: 3,
      callStatus: "No Pickup",
      callStatusColor: "bg-red-100 text-red-800",
    },
    {
      name: "John Doe",
      phone: "555-98765",
      email: "john.doe@example.com",
      leadSource: "Referral",
      leadSourceColor: "bg-purple-100 text-purple-800",
      rating: "★★★★★",
      ratingCount: 5,
      callStatus: "Callback",
      callStatusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      name: "Alex Johnson",
      phone: "555-45678",
      email: "alex.johnson@business.com",
      leadSource: "Website",
      leadSourceColor: "bg-indigo-100 text-indigo-800",
      rating: "★★☆☆☆",
      ratingCount: 2,
      callStatus: "Interested",
      callStatusColor: "bg-green-100 text-green-800",
    },
  ];

  const itemsPerPage = 5;
  const totalPages = Math.ceil(leads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, leads.length);
  const currentLeads = leads.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleDelete = (client) => {
    setClientToDelete(client);
    setShowModal(true);
  };

  const confirmDelete = (client) => {
    console.log(`Deleted ${client.name}`);
    setShowModal(false);
  };

  const cancelDelete = () => setShowModal(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header with View Toggle */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Clients</h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage your client leads and interactions
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {/* <div className="hidden sm:flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${viewMode === "table" ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
                aria-label="Table view"
              >
                Table
              </button>
              <button
                onClick={() => setViewMode("card")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${viewMode === "card" ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
                aria-label="Card view"
              >
                Cards
              </button>
            </div> */}
            {/* <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200">
              Add Client
            </button> */}
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      {viewMode === "table" ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Client Name
                </th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                  Lead Source
                </th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">
                  Lead Rating
                </th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Call Status
                </th>
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentLeads.map((client, idx) => (
                <LeadRow key={idx} client={client} handleDelete={handleDelete} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Mobile Card View
        <div className="p-4 sm:p-6">
          {currentLeads.map((client, idx) => (
            <LeadCard key={idx} client={client} handleDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="px-4 sm:px-6 py-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{startIndex + 1}</span> -{" "}
            <span className="font-semibold">{endIndex}</span> of{" "}
            <span className="font-semibold">{leads.length}</span> clients
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 sm:px-4 sm:py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">←</span>
            </button>
            
            <div className="flex items-center space-x-1">
              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                // Show first page, last page, and pages around current page
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={index}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm rounded-lg transition-colors ${currentPage === pageNum
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  pageNum === currentPage - 2 ||
                  pageNum === currentPage + 2
                ) {
                  return <span key={index} className="px-2 text-gray-500">...</span>;
                }
                return null;
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 sm:px-4 sm:py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">→</span>
            </button>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        showModal={showModal}
        client={clientToDelete}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ClientsTable;