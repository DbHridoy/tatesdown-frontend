import { useState } from "react";

const Modal = ({ show, title, message, onCancel, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-3">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataTable = ({
  title,
  columns,
  data = [],
  actions = [],
  filters = [],

  // server controlled
  currentPage,
  totalItems,
  itemsPerPage,
  sortKey,
  sortOrder,
  onPageChange,
  onSearch,
  onFilterChange,
  onSortChange,
}) => {
  const [modalConfig, setModalConfig] = useState({
    show: false,
    item: null,
    action: null,
  });

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleSort = (col) => {
    if (!col.sortable) return;
    onSortChange?.(col.accessor);
  };

  const handleAction = (action, item) => {
    if (action.modal) {
      setModalConfig({ show: true, item, action });
    } else {
      action.onClick?.(item);
    }
  };

  const handleConfirmModal = () => {
    modalConfig.action?.onConfirm?.(modalConfig.item);
    setModalConfig({ show: false, item: null, action: null });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      {title && (
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 p-4 border-b">
        {filters.map((f) => (
          <select
            key={f.accessor}
            onChange={(e) => onFilterChange?.(f.accessor, e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">{f.label}</option>
            {f.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  onClick={() => handleSort(col)}
                  className={`px-4 py-3 text-center align-middle text-sm font-semibold ${
                    col.sortable ? "cursor-pointer" : ""
                  }`}
                >
                  {col.label}
                  {col.sortable &&
                    sortKey === col.accessor &&
                    (sortOrder === "asc" ? " ▲" : " ▼")}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-4 py-3 text-center align-middle text-sm font-semibold">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map((col) => {
                  const value =
                    col.accessor === "No"
                      ? (currentPage - 1) * itemsPerPage + idx + 1
                      : row[col.accessor];

                  return (
                    <td key={col.accessor}>
                      <div
                        className={`text-center align-middle text-sm ${
                          col.colorMap?.[value] || ""
                        }`}
                      >
                        {value}
                      </div>
                    </td>
                  );
                })}

                {actions.length > 0 && (
                  <td className="px-4 py-3 flex justify-center items-center space-x-2">
                    {actions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => handleAction(action, row)}
                        className={
                          action.className ||
                          "px-2 py-1 bg-blue-500 text-white rounded"
                        }
                      >
                        {action.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <div className="space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        show={modalConfig.show}
        title={modalConfig.action?.modalTitle || "Confirm"}
        message={
          modalConfig.action?.modalMessage?.(modalConfig.item) ||
          "Are you sure?"
        }
        onCancel={() =>
          setModalConfig({ show: false, item: null, action: null })
        }
        onConfirm={handleConfirmModal}
      />
    </div>
  );
};

export default DataTable;

// const columnData = [
//     { label: "No", accessor: "No" },
//     { label: "Client Name", accessor: "clientName", sortable: true },
//     { label: "Phone", accessor: "phoneNumber" },
//   {
//     label: "Call Status",
//     accessor: "callStatus",
//     colorMap: {
//       "Not Called": "bg-gray-100 text-gray-700 rounded-2xl text-center p-2",
//       "Picked-Up Yes": "bg-green-100 text-green-800 rounded-2xl text-center p-2",
//       "Picked-Up No": "bg-red-100 text-red-700 rounded-2xl text-center p-2",
//       "No Pickup": "bg-yellow-100 text-yellow-700 rounded-2xl text-center p-2",
//     },
//   },
// ];

// const filterData = [
//   {
//     label: "Call Status",
//     accessor: "callStatus",
//     options: ["Not Called", "Picked-Up Yes", "Picked-Up No", "No Pickup"],
//   },
// {
//   label: "Call Status",
//   accessor: "callStatus",
//   options: ["Not Called", "Picked-Up Yes", "Picked-Up No"],
// },
// {
//   label: "Call Status",
//   accessor: "callStatus",
//   options: ["Not Called", "Picked-Up Yes", "Picked-Up No"],
// },
// {
//   label: "Call Status",
//   accessor: "callStatus",
//   options: ["Not Called", "Picked-Up Yes", "Picked-Up No"],
// },
// ];
// const actionData = [
//   {
//     label: "View",
//     className: "bg-blue-500 text-white p-2 rounded-lg",
//     onClick: (item) => navigate(`${item._id}`),
//   },
//   {
//     label: "Delete",
//     className: "bg-red-500 text-white p-2 rounded-lg",
//     modal: true,
//     modalTitle: "Delete Client",
//     modalMessage: (item) =>
//       `Are you sure you want to delete ${item.clientName}?`,
//     onConfirm: (item) => deleteClient(item._id),
//   },
// ];
//  const columns = [
//   {
//     header: "No",
//     type: "index", // 👈 auto index
//   },
//   {
//     header: "Client Name",
//     accessor: "clientName",
//     sortable: true,
//     filterable: true,
//   },
//   {
//     header: "Source",
//     accessor: "source",
//     filterable: true,
//   },
//   {
//     header: "Call Status",
//     accessor: "callStatus",
//     type: "badge",
//     filterable: true,
//     colorMap: {
//       "Not Called": "bg-gray-100 text-gray-700",
//       "Picked-Up Yes": "bg-green-100 text-green-700",
//       "Picked-Up No": "bg-red-100 text-red-700",
//       "No Pickup": "bg-yellow-100 text-yellow-700",
//     },
//   },
// ];

//   const actions = [
//     {
//       label: "View",
//       className: "bg-blue-100 text-blue-700",
//       onClick: (row) => navigate(`/clients/${row._id}`),
//     },
//     {
//       label: "Delete",
//       className: "bg-red-100 text-red-700",
//       modal: ({ row }) => ({
//         title: "Delete Client",
//         content: `Are you sure you want to delete ${row.clientName}?`,
//         onConfirm: () => deleteClient(row._id),
//       }),
//     },
//   ];

// const [params, setParams] = useState({
//   page: 1,
//   limit: 5,
//   search: "",
//   sort: "clientName", // API value
//   sortKey: "clientName", // UI only
//   sortOrder: "asc", // "asc" | "desc"
//   filters: {
//     callStatus: "",
//   },
// });

{
  /* <DataTable
        title="Clients"
        data={clients || []} // 🔴 adjust if backend uses different key
        totalItems={totalItems}
        currentPage={params.page}
        itemsPerPage={params.limit}
        columns={columnData}
        filters={filterData}
        actions={actionData}
        onPageChange={(page) => setParams((p) => ({ ...p, page }))}
        onSearch={(search) => setParams((p) => ({ ...p, search, page: 1 }))}
        onFilterChange={(key, value) =>
          setParams((p) => ({
            ...p,
            page: 1,
            filters: {
              ...p.filters,
              [key]: value,
            },
          }))
        }
        onSortChange={handleSortChange}
        sortKey={params.sortKey}
        sortOrder={params.sortOrder}
      /> */
}
