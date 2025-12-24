import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

import DataTable from "../../../Components/Common/DataTable";
import { useCreatUserMutation, useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserMutation } from "../../../redux/api/userApi";

const UserManagement = () => {
  /* -------------------- API -------------------- */
  const { data: allUsersData, isLoading } = useGetAllUsersQuery();
  const [createUser] = useCreatUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const users = allUsersData?.data || [];
  const totalItems = users.length;

  /* -------------------- STATE -------------------- */
  const [selectedUser, setSelectedUser] = useState(null);

  const [isAddModal, setIsAddModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isViewModal, setIsViewModal] = useState(false);

  const [formUser, setFormUser] = useState({
    fullName: "",
    email: "",
    role: "",
    password: "",
    cluster: "",
  });

  /* -------------------- HELPERS -------------------- */
  const resetForm = () =>
    setFormUser({
      fullName: "",
      email: "",
      role: "",
      password: "",
      cluster: "",
    });

  /* -------------------- HANDLERS -------------------- */
  const handleAddUser = async () => {
    try {
      await createUser(formUser).unwrap();
      resetForm();
      setIsAddModal(false);
    } catch (err) {
      console.error("Create user failed", err);
    }
  };

  const handleEditUser = async () => {
    if (!selectedUser) return;

    try {
      await updateUser({
        id: selectedUser._id,
        data: {
          fullName: formUser.fullName,
          email: formUser.email,
          role: formUser.role,
          cluster: formUser.cluster,
        },
      }).unwrap();

      resetForm();
      setIsEditModal(false);
    } catch (err) {
      console.error("Update user failed", err);
    }
  };

  /* -------------------- TABLE CONFIG -------------------- */
  const columnData = [
    { label: "No", accessor: "No" },
    { label: "User Name", accessor: "fullName", sortable: true },
    { label: "Role", accessor: "role" },
  ];

  const actionData = [
    {
      label: "View",
      className: "bg-blue-500 text-white p-2 rounded-lg",
      onClick: (item) => {
        setSelectedUser(item);
        setIsViewModal(true);
      },
    },
    {
      label: "Edit",
      className: "bg-yellow-500 text-white p-2 rounded-lg",
      onClick: (item) => {
        setSelectedUser(item);
        setFormUser({
          fullName: item.fullName || "",
          email: item.email || "",
          role: item.role || "",
          cluster: item.cluster || "",
          password: "",
        });
        setIsEditModal(true);
      },
    },
    {
      label: "Delete",
      className: "bg-red-500 text-white p-2 rounded-lg",
      modal: true,
      modalTitle: "Delete User",
      modalMessage: (item) =>
        `Are you sure you want to delete ${item.fullName}?`,
      onConfirm: async (item) => {
        try {
          await deleteUser(item._id).unwrap();
        } catch (err) {
          console.error("Delete failed", err);
        }
      },
    },
  ];

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

      <DataTable
        title="Users"
        data={users}
        totalItems={totalItems}
        columns={columnData}
        actions={actionData}
        loading={isLoading}
      />

      {/* ADD MODAL */}
      {isAddModal && (
        <Modal title="Add User" onClose={() => setIsAddModal(false)}>
          <UserForm formUser={formUser} setFormUser={setFormUser} isAdd />
          <ModalActions
            onCancel={() => {
              resetForm();
              setIsAddModal(false);
            }}
            onSave={handleAddUser}
          />
        </Modal>
      )}

      {/* EDIT MODAL */}
      {isEditModal && (
        <Modal title="Edit User" onClose={() => setIsEditModal(false)}>
          <UserForm formUser={formUser} setFormUser={setFormUser} />
          <ModalActions
            onCancel={() => {
              resetForm();
              setIsEditModal(false);
            }}
            onSave={handleEditUser}
          />
        </Modal>
      )}

      {/* VIEW MODAL */}
      {isViewModal && selectedUser && (
        <Modal title="View User" onClose={() => setIsViewModal(false)}>
          <ViewUser user={selectedUser} />
        </Modal>
      )}
    </div>
  );
};

/* -------------------- REUSABLE COMPONENTS -------------------- */

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <div className="bg-white w-[450px] p-6 rounded-lg">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <IoClose className="cursor-pointer" onClick={onClose} />
      </div>
      {children}
    </div>
  </div>
);

const ModalActions = ({ onCancel, onSave }) => (
  <div className="flex justify-end gap-3 mt-5">
    <button className="px-4 py-2 border rounded" onClick={onCancel}>
      Cancel
    </button>
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded"
      onClick={onSave}
    >
      Save
    </button>
  </div>
);

const UserForm = ({ formUser, setFormUser, isAdd }) => (
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

    {isAdd && (
      <input
        type="password"
        className="w-full p-2 border rounded"
        placeholder="Password"
        value={formUser.password}
        onChange={(e) =>
          setFormUser({ ...formUser, password: e.target.value })
        }
      />
    )}
  </div>
);

const ViewUser = ({ user }) => (
  <div className="space-y-3">
    <Input label="Full Name" value={user.fullName} />
    <Input label="Email" value={user.email} />
    <Input label="Role" value={user.role} />
    <Input label="Cluster" value={user.cluster || "-"} />
  </div>
);

const Input = ({ label, value }) => (
  <input
    className="w-full p-2 border rounded"
    value={`${label}: ${value}`}
    readOnly
  />
);

export default UserManagement;
