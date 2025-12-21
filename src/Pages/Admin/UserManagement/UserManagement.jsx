import React, { useState, useMemo } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { useCreatUserMutation } from "../../../redux/api/userApi";

const UserManagement = () => {
  const [createUser] = useCreatUserMutation();

  /* -------------------- DATA -------------------- */
  const [data, setData] = useState([
    { id: "U1234", name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: "U1235", name: "Jane Smith", email: "jane@example.com", role: "Manager" },
    { id: "U1236", name: "Mark Johnson", email: "mark@example.com", role: "Editor" },
  ]);

  /* -------------------- MODALS -------------------- */
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModal, setIsViewModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);

  /* -------------------- FORM STATE -------------------- */
  const [formUser, setFormUser] = useState({
    fullName: "",
    email: "",
    role: "",
    password: "",
    cluster: "",
  });

  /* -------------------- PAGINATION -------------------- */
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => data, [data]);

  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);

  /* -------------------- HANDLERS -------------------- */
  const resetForm = () =>
    setFormUser({
      fullName: "",
      email: "",
      role: "",
      password: "",
      cluster: "",
    });

  const handleAddUser = async () => {
    console.log(formUser);
    const newUser = {
      ...formUser
    };

    await createUser(newUser).unwrap(); 
    setData([...data, newUser]);
    resetForm();
    setIsAddModal(false);
  };

  const handleEditUser = () => {
    setData((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id ? { ...u, ...formUser } : u
      )
    );
    resetForm();
    setIsEditModal(false);
  };

  const handleDeleteUser = () => {
    setData((prev) => prev.filter((u) => u.id !== selectedUser.id));
    setIsDeleteModal(false);
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <button
          className="px-5 py-2 text-white bg-blue-600 rounded-lg"
          onClick={() => setIsAddModal(true)}
        >
          + Add User
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full border">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">{user.email}</td>
              <td className="flex gap-3 p-3">
                <LuEye
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedUser(user);
                    setIsViewModal(true);
                  }}
                />
                <FaRegEdit
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedUser(user);
                    setFormUser(user);
                    setIsEditModal(true);
                  }}
                />
                <RiDeleteBinLine
                  className="cursor-pointer text-red-500"
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

      {/* ADD / EDIT MODAL */}
      {(isAddModal || isEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white w-[450px] p-6 rounded-lg">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {isAddModal ? "Add User" : "Edit User"}
              </h3>
              <IoClose
                className="cursor-pointer"
                onClick={() => {
                  setIsAddModal(false);
                  setIsEditModal(false);
                  resetForm();
                }}
              />
            </div>

            <div className="space-y-3">
              <input
                className="w-full p-2 border rounded"
                placeholder="Full Name"
                value={formUser.fullName}
                onChange={(e) =>
                  setFormUser({ ...formUser, fullName: e.target.value })
                }
              />

              <input
                className="w-full p-2 border rounded"
                placeholder="Email"
                value={formUser.email}
                onChange={(e) =>
                  setFormUser({ ...formUser, email: e.target.value })
                }
              />

              <select
                className="w-full p-2 border rounded"
                value={formUser.role}
                onChange={(e) =>
                  setFormUser({ ...formUser, role: e.target.value })
                }
              >
                <option value="">Select Role</option>
                <option value="sales-rep">Sales Rep</option>
                <option value="production-manager">Production Manager</option>
              </select>

              {formUser.role === "sales-rep" && (
                <input
                  className="w-full p-2 border rounded"
                  placeholder="Cluster"
                  value={formUser.cluster}
                  onChange={(e) =>
                    setFormUser({ ...formUser, cluster: e.target.value })
                  }
                />
              )}

              <input
                type="password"
                className="w-full p-2 border rounded"
                placeholder="Password"
                value={formUser.password}
                onChange={(e) =>
                  setFormUser({ ...formUser, password: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                className="px-4 py-2 border rounded"
                onClick={() => {
                  setIsAddModal(false);
                  setIsEditModal(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={isAddModal ? handleAddUser : handleEditUser}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {isDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white w-[380px] p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              Delete User
            </h3>
            <p>
              Are you sure you want to delete <b>{selectedUser.name}</b>?
            </p>

            <div className="flex justify-end gap-3 mt-5">
              <button
                className="px-4 py-2 border rounded"
                onClick={() => setIsDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
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
