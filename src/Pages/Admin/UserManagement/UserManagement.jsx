import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import DataTable from "../../../Components/Common/DataTable";
import {
  useCreatUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../redux/api/userApi";
import UserForm from "../../../Components/Admin/UserMangement/UserForm";

const UserManagement = () => {
  /* ================= STATE ================= */
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortKey: "fullName",
    sortOrder: "asc",
    filters: { role: "" },
  });

  /* ================= API ================= */
  const { data: allUsersData } = useGetAllUsersQuery(params);
  const [createUser] = useCreatUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const users = allUsersData?.data || [];
  const totalItems = allUsersData?.total;

  //console.log("users", users);

  //console.log("totalItems", totalItems);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [formUser, setFormUser] = useState({
    fullName: "",
    email: "",
    role: "",
    cluster: "",
    password: "",
  });

  const [isAddModal, setIsAddModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isViewModal, setIsViewModal] = useState(false);

  /* ================= SINGLE USER ================= */
  const { data: userData, isFetching: isUserFetching } = useGetUserQuery(
    selectedUserId,
    { skip: selectedUserId === null }
  );

  useEffect(() => {
    if (!userData?.data) return;

    const user = userData.data;
    setFormUser({
      fullName: user.fullName ?? "",
      email: user.email ?? "",
      role: user.role ?? "",
      cluster: user.cluster ?? "",
      password: "",
    });
  }, [userData]);

  /* ================= HELPERS ================= */
  const resetForm = () =>
    setFormUser({
      fullName: "",
      email: "",
      role: "",
      cluster: "",
      password: "",
    });

  const closeAddModal = () => {
    resetForm();
    setIsAddModal(false);
  };

  const closeEditModal = () => {
    resetForm();
    setSelectedUserId(null);
    setIsEditModal(false);
  };

  const closeViewModal = () => {
    setSelectedUserId(null);
    setIsViewModal(false);
  };

  /* ================= ACTIONS ================= */
  const handleAddUser = async () => {
    //console.log("from Add user", formUser);
    await createUser(formUser).unwrap();
    closeAddModal();
  };

  const handleEditUser = async () => {
    await updateUser({
      id: selectedUserId,
      data: {
        fullName: formUser.fullName,
        email: formUser.email,
        role: formUser.role,
        cluster: formUser.cluster,
      },
    }).unwrap();

    closeEditModal();
  };

  /* ================= TABLE CONFIG ================= */
  const tableConfig = {
    columns: [
      { label: "No", accessor: "No" },
      { label: "User Name", accessor: "fullName", sortable: true },
      { label: "Email", accessor: "email" },
      { label: "Role", accessor: "role" },
    ],
    filters: [
      {
        label: "Role",
        accessor: "role",
        options: {
          "Sales Rep": "Sales Rep",
          "Production Manager": "Production Manager",
        },
      },
    ],
    actions: [
      // {
      //   label: "View",
      //   className: "bg-blue-500 text-white p-2 rounded-lg",
      //   onClick: (item) => {
      //     setSelectedUserId(item._id);
      //     setIsViewModal(true);
      //   },
      // },
      {
        label: "Delete",
        className: "bg-red-500 text-white p-2 rounded-lg",
        modal: true,
        modalTitle: "Delete User",
        modalMessage: (item) =>
          `Are you sure you want to delete ${item.fullName}?`,
        onConfirm: (item) => deleteUser(item._id),
      },
    ],
    totalItems: totalItems,
    currentPage: params.page,
    itemsPerPage: params.limit,
    sortKey: params.sortKey,
    sortOrder: params.sortOrder,
    onPageChange: (page) => setParams((p) => ({ ...p, page })),
    onSearch: (search) => setParams((p) => ({ ...p, search, page: 1 })),
    onFilterChange: (key, value) =>
      setParams((p) => ({
        ...p,
        page: 1,
        filters: { ...p.filters, [key]: value },
      })),
    onSortChange: (sortKey, sortOrder) =>
      setParams((p) => ({ ...p, sortKey, sortOrder })),
  };

  /* ================= UI ================= */
  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <button
          className="px-5 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => setIsAddModal(true)}
        >
          + Add User
        </button>
      </div>

      <DataTable
        title="Users"
        data={users}
        config={tableConfig}
      />

      {/* ADD */}
      {isAddModal && (
        <Modal title="Add User" onClose={closeAddModal}>
          <UserForm formUser={formUser} setFormUser={setFormUser} isAdd />
          <ModalActions onCancel={closeAddModal} onSave={handleAddUser} />
        </Modal>
      )}

      {/* EDIT */}
      {isEditModal && (
        <Modal title="Edit User" onClose={closeEditModal}>
          {isUserFetching ? (
            <p>Loading...</p>
          ) : (
            <>
              <UserForm formUser={formUser} setFormUser={setFormUser} />
              <ModalActions onCancel={closeEditModal} onSave={handleEditUser} />
            </>
          )}
        </Modal>
      )}

      {/* VIEW */}
      {isViewModal && userData?.data && (
        <Modal title="View User" onClose={closeViewModal}>
          <ViewUser user={userData.data} />
        </Modal>
      )}
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
    <div className="bg-white w-[450px] p-6 rounded-lg">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">{title}</h3>
        <IoClose className="cursor-pointer" onClick={onClose} />
      </div>
      {children}
    </div>
  </div>
);

const ModalActions = ({ onCancel, onSave }) => (
  <div className="flex justify-end gap-3 mt-5">
    <button onClick={onCancel} className="border px-4 py-2 rounded">
      Cancel
    </button>
    <button
      onClick={onSave}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Save
    </button>
  </div>
);


const ViewUser = ({ user }) => (
  //console.log(user),
  <div className="space-y-2">
    <Input label="Full Name" value={user.fullName} />
    <Input label="Email" value={user.email} />
    <Input label="Role" value={user.role} />

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
