import { useState } from "react";

// Generic Modal Component
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
                  className={`px-4 py-3 text-left text-sm font-semibold ${
                    col.sortable ? "cursor-pointer" : ""
                  }`}
                >
                  {col.label}
                  {sortKey === col.accessor &&
                    (sortOrder === "asc" ? " ▲" : " ▼")}

                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-4 py-3 text-sm font-semibold">Actions</th>
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
                    <td key={col.accessor} className="px-4 py-3 text-sm">
                      {value}
                    </td>
                  );
                })}

                {actions.length > 0 && (
                  <td className="px-4 py-3 space-x-2">
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
