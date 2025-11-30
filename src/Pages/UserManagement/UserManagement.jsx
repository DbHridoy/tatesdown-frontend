import React, { useState, useMemo } from "react";
import { FaRegEdit, FaUser } from "react-icons/fa";
import { IoClose, IoPersonSharp } from "react-icons/io5";
import { LuEye, LuPhone } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";

const UserManagement = () => {
  // Filters
  const [filters, setFilters] = useState({
    salesRep: "All",
  });

  // Dummy user data
  const [data, setData] = useState([
    { id: "U1234", name: "John Doe", email: "john.doe@example.com", role: "Admin" },
    { id: "U1235", name: "Jane Smith", email: "jane.smith@example.com", role: "Manager" },
    { id: "U1236", name: "Mark Johnson", email: "mark.johnson@example.com", role: "Editor" },
    { id: "U1237", name: "Sarah Williams", email: "sarah.williams@example.com", role: "Viewer" },
    { id: "U1238", name: "Robert Brown", email: "robert.brown@example.com", role: "Manager" },
    { id: "U1239", name: "Emily Davis", email: "emily.davis@example.com", role: "Editor" },
    { id: "U1240", name: "Chris Lee", email: "chris.lee@example.com", role: "Viewer" },
  ]);

  // Modals
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModal, setIsViewModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false); // New state for Add User Modal

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Sales Rep", // Default role
    password: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filtering (simple)
  const filteredData = useMemo(() => {
    return data;
  }, [filters]);

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle adding a new user
  const handleAddUser = () => {
    const newUserId = `U${(data.length + 1234).toString()}`;
    const newUserData = { ...newUser, id: newUserId };
    setData([...data, newUserData]);
    setIsAddModal(false); // Close modal after adding user
    setNewUser({ name: "", email: "", role: "Sales Rep", password: "" }); // Reset form
  };

  // Handle editing an existing user
  const handleEditUser = () => {
    const updatedData = data.map((user) =>
      user.id === selectedUser.id ? { ...user, ...newUser } : user
    );
    setData(updatedData);
    setIsEditModal(false);
    setSelectedUser(null);
  };

  // Handle deleting a user
  const handleDeleteUser = () => {
    const updatedData = data.filter((user) => user.id !== selectedUser.id);
    setData(updatedData);
    setIsDeleteModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="p-6 mb-4 bg-white border rounded-lg shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium">Filter:</span>

            <select
              value={filters.salesRep}
              onChange={(e) => setFilters({ ...filters, salesRep: e.target.value })}
              className="px-4 py-2 text-sm bg-white border rounded-md"
            >
              <option>All</option>
              <option>Rep A</option>
              <option>Rep B</option>
            </select>

            <input
              type="text"
              placeholder="🔍 Search User"
              className="w-64 px-4 py-2 text-sm border rounded-md md:w-80"
            />
          </div>

          <button className="flex items-center gap-2 px-6 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700" onClick={() => setIsAddModal(true)}>
            <span className="text-lg">+</span> Add User
          </button>
        </div>
      </div>

      {/* Total Records */}
      <div className="mt-6 mb-4">
        <p className="text-xl">{filteredData.length} total records</p>
      </div>

      {/* Table */}
      <table className="min-w-full border-collapse table-auto">
        <thead>
          <tr className="bg-[#D9EBF8]">
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Role</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentItems.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="flex items-center px-6 py-3 gap-x-3">
                <div className="w-[50px] h-[50px] rounded-full bg-[#C4C4C4]" />
                {user.name}
              </td>
              <td className="px-6 py-3">{user.role}</td>
              <td className="px-6 py-3">{user.email}</td>

              <td className="flex gap-3 px-6 py-3">
                <LuEye
                  size={20}
                  className="text-gray-600 cursor-pointer hover:text-blue-500"
                  onClick={() => {
                    setSelectedUser(user);
                    setIsViewModal(true);
                  }}
                />
                <FaRegEdit
                  size={20}
                  className="text-gray-600 cursor-pointer hover:text-blue-500"
                  onClick={() => {
                    setSelectedUser(user);
                    setNewUser(user);
                    setIsEditModal(true);
                  }}
                />
                <RiDeleteBinLine
                  size={20}
                  className="text-gray-600 cursor-pointer hover:text-red-500"
                  onClick={() => {
                    setSelectedUser(user);
                    setIsDeleteModal(true);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <span>
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)} of{" "}
          {filteredData.length}
        </span>

        <div className="flex gap-2">
          {[...Array(Math.ceil(filteredData.length / pageSize))].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`py-2 px-4 border rounded-md ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* View Modal */}
      {isViewModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[600px] p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b">
              <h2 className="text-xl font-semibold">User Details</h2>
              <IoClose
                size={24}
                onClick={() => setIsViewModal(false)}
                className="cursor-pointer"
              />
            </div>
            <div className="flex gap-6 mt-4">
              <div className="w-16 h-16 rounded-full bg-[#C4C4C4]" />
              <div>
                <p className="text-lg font-medium">{selectedUser.name}</p>
                <p className="text-sm text-gray-500">ID: {selectedUser.id}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    value={selectedUser.name}
                    className="w-full p-2 bg-gray-100 border rounded-md"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    value={selectedUser.email}
                    className="w-full p-2 bg-gray-100 border rounded-md"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Phone Number</label>
                  <input
                    type="text"
                    value={selectedUser.phoneNumber}
                    className="w-full p-2 bg-gray-100 border rounded-md"
                    readOnly
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Account Information</h3>
                <div>
                  <label className="block text-sm font-medium">Role</label>
                  <input
                    type="text"
                    value={selectedUser.role}
                    className="w-full p-2 bg-gray-100 border rounded-md"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Created Date</label>
                  <input
                    type="text"
                    value={selectedUser.createdDate}
                    className="w-full p-2 bg-gray-100 border rounded-md"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Last Login</label>
                  <input
                    type="text"
                    value={selectedUser.lastLogin}
                    className="w-full p-2 bg-gray-100 border rounded-md"
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-4 py-2 text-gray-600 border rounded-md"
                onClick={() => setIsViewModal(false)}
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-white bg-red-600 rounded-md" onClick={handleDeleteUser}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {isAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[500px] p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b">
              <h2 className="text-xl font-semibold">Add New User</h2>
              <IoClose size={24} onClick={() => setIsAddModal(false)} className="cursor-pointer" />
            </div>

            <div className="mt-4 space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border rounded"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-2 border rounded"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Role"
                className="w-full p-2 border rounded"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button className="px-4 py-2 border rounded" onClick={() => setIsAddModal(false)}>
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-blue-600 rounded"
                onClick={handleAddUser} // Add the user to data
              >
                Save User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[500px] p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b">
              <h2 className="text-xl font-semibold">Edit User</h2>
              <IoClose size={24} onClick={() => setIsEditModal(false)} className="cursor-pointer" />
            </div>

            <div className="mt-4 space-y-4">
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button className="px-4 py-2 border rounded" onClick={() => setIsEditModal(false)}>
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-blue-600 rounded"
                onClick={handleEditUser}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold text-red-500">Delete User</h2>
              <IoClose size={24} onClick={() => setIsDeleteModal(false)} className="cursor-pointer" />
            </div>

            <p className="mt-4 text-gray-700">
              Are you sure you want to delete <b>{selectedUser.name}</b>? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-5">
              <button className="px-4 py-2 border rounded" onClick={() => setIsDeleteModal(false)}>
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-red-600 rounded"
                onClick={handleDeleteUser}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
