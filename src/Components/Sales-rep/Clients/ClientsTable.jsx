import {
  AddToListIcon,
  Delete01Icon,
  Delete02Icon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

// LeadRow Component for Table Rows
const LeadRow = ({ client, handleDelete }) => {
  const navigate = useNavigate(); // Hook for navigation
  
  return (
    <tr className="border-t">
      {/* Client Name */}
      <td className="px-4 py-3 flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-2xl text-gray-700">{client.name[0]}</span>
        </div>
        <div>
          <p className="font-semibold text-gray-700">{client.name}</p>
          <p className="text-sm text-gray-500">{client.phone}</p>
          <p className="text-sm text-gray-500">{client.email}</p>
        </div>
      </td>

      {/* Lead Source */}
      <td className="px-4 py-3 text-sm text-gray-600">
        <span
          className={`inline-block px-4 py-1 rounded-full ${client.leadSourceColor}`}
        >
          {client.leadSource}
        </span>
      </td>

      {/* Lead Rating */}
      <td className="px-4 py-3 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500">{client.rating}</span>
          <span className="text-sm text-gray-500">({client.ratingCount})</span>
        </div>
      </td>

      {/* Call Status */}
      <td className="px-4 py-3 text-sm">
        <span
          className={`inline-block px-4 py-1 rounded-full ${client.callStatusColor}`}
        >
          {client.callStatus}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3 text-sm">
        <div className="flex space-x-3">
          <button
            onClick={() => handleDelete(client)}
            className="text-red-500 hover:text-red-700 text-xl"
          >
            <HugeiconsIcon icon={Delete02Icon} />
          </button>
          <button className="text-blue-500 hover:text-blue-700 text-xl">
            <HugeiconsIcon icon={AddToListIcon} />
          </button>
          <button
            onClick={() => navigate("/client-details")}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            <HugeiconsIcon icon={ViewIcon} />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Modal Component for Delete Confirmation
const DeleteConfirmationModal = ({ showModal, client, onCancel, onConfirm }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Confirm Deletion</h3>
        <p className="text-sm text-gray-600">Are you sure you want to delete the record for {client.name}?</p>
        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(client)}
            className="px-4 py-2 bg-red-500 rounded-lg text-sm text-white hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// LeadTable Component
const LeadTable = ({ leads, currentPage, totalPages, onPageChange, handleDelete }) => (
  <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
    <table className="min-w-full table-auto">
      <thead className="bg-blue-200">
        <tr>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
            Client Name
          </th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
            Lead Source
          </th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
            Lead Rating
          </th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
            Call Status
          </th>
          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {leads.map((client, index) => (
          <LeadRow key={index} client={client} handleDelete={handleDelete} />
        ))}
      </tbody>
    </table>

    {/* Pagination */}
    <div className="flex justify-between items-center p-4">
      <span className="text-sm text-gray-500">
        Showing {currentPage * 5 - 4} - {Math.min(currentPage * 5, 247)} of 247 clients
      </span>
      <div className="space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`px-4 py-2 text-sm rounded-lg ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
);

// Main ClientsTable Component
const ClientsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false); // State for showing the modal
  const [clientToDelete, setClientToDelete] = useState(null); // Client to delete

  const leads = [
    {
      name: "Sarah Mitchell",
      phone: "555-12345",
      email: "johan.do@gmail.com",
      leadSource: "Inbound",
      leadSourceColor: "bg-green-200 text-green-800",
      rating: "★★★★☆",
      ratingCount: 4,
      callStatus: "Picked-up yes",
      callStatusColor: "bg-blue-500 text-white",
    },
    {
      name: "Jane Smith",
      phone: "555-12345",
      email: "johan.do@gmail.com",
      leadSource: "Social",
      leadSourceColor: "bg-blue-200 text-blue-800",
      rating: "★★★☆☆",
      ratingCount: 3,
      callStatus: "No Pickup",
      callStatusColor: "bg-red-500 text-white",
    },
    // ... More clients
  ];

  const totalPages = Math.ceil(leads.length / 5);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = (client) => {
    setClientToDelete(client); // Set client to delete
    setShowModal(true); // Show modal
  };

  const confirmDelete = (client) => {
    // Logic to delete the client
    console.log(`Client deleted: ${client.name}`);
    setShowModal(false); // Hide modal
  };

  const cancelDelete = () => {
    setShowModal(false); // Hide modal
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Lead List</h2>
      <LeadTable
        leads={leads}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        handleDelete={handleDelete}
      />

      {/* Delete Confirmation Modal */}
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
