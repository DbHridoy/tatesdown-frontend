import { useState, useMemo } from "react";

// Generic Modal Component
const Modal = ({ show, title, message, onCancel, onConfirm }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md">
        <div className="p-5 sm:p-6">
          {title && (
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
              {title}
            </h3>
          )}
          <p className="text-sm sm:text-base text-gray-600 mb-6">{message}</p>
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2.5 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium text-white w-full sm:w-auto"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fully dynamic DataTable component
const DataTable = ({
  title,
  columns,
  data,
  actions = [],
  filters = [],
  // itemsPerPageOptions = [5, 10, 20]
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState(null);
  const [filterValues, setFilterValues] = useState({});
  const [modalConfig, setModalConfig] = useState({
    show: false,
    item: null,
    action: null,
  });
  const [itemsPerPage, setItemsPerPage] = useState(5);
  // const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

  // Handle search + filter + sorting
  const processedData = useMemo(() => {
    let filtered = Array.isArray(data) ? [...data] : [];

    // Global search
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        columns.some((col) => {
          const value =
            col.accessor === "No" ? item.id || "" : item[col.accessor];
          return value
            ?.toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        })
      );
    }

    // Column filters
    Object.keys(filterValues).forEach((key) => {
      const value = filterValues[key];
      if (value) filtered = filtered.filter((item) => item[key] === value);
    });

    // Sorting
    if (sort?.key && sort?.direction) {
      filtered.sort((a, b) => {
        const valA = sort.key === "No" ? a.id : a[sort.key];
        const valB = sort.key === "No" ? b.id : b[sort.key];
        if (valA < valB) return sort.direction === "asc" ? -1 : 1;
        if (valA > valB) return sort.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, searchQuery, filterValues, sort, columns]);

  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const paginatedData = processedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (col) => {
    if (!col.sortable) return;
    if (sort?.key === col.accessor) {
      setSort({
        key: col.accessor,
        direction: sort.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSort({ key: col.accessor, direction: "asc" });
    }
  };

  const handleAction = (action, item) => {
    if (action.modal) {
      setModalConfig({ show: true, item, action });
    } else if (action.onClick) {
      action.onClick(item);
    }
  };

  const handleConfirmModal = () => {
    if (modalConfig.action?.onConfirm)
      modalConfig.action.onConfirm(modalConfig.item);
    setModalConfig({ show: false, item: null, action: null });
  };

  const handleCancelModal = () =>
    setModalConfig({ show: false, item: null, action: null });

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {title && (
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              {title}
            </h2>
          </div>
          <div className=" items-center space-x-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 flex-1 min-w-[150px]"
            />
          </div>
        </div>
      )}

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3 p-4 border-b border-gray-200 items-center justify-between">
        {filters.map((f) => (
          <select
            key={f.accessor}
            value={filterValues[f.accessor] || ""}
            onChange={(e) =>
              setFilterValues((prev) => ({
                ...prev,
                [f.accessor]: e.target.value,
              }))
            }
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 min-w-[120px]"
          >
            <option value="">{f.label}</option>
            {f.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ))}
        {/* <select
          value={itemsPerPage}
          onChange={e => setItemsPerPage(Number(e.target.value))}
          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 min-w-[80px]"
        >
          {itemsPerPageOptions.map(opt => (
            <option key={opt} value={opt}>{opt} / page</option>
          ))}
        </select> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider ${
                    col.sortable ? "cursor-pointer" : ""
                  }`}
                  onClick={() => handleSort(col)}
                >
                  {col.label}
                  {sort?.key === col.accessor &&
                    (sort?.direction === "asc" ? " ▲" : " ▼")}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                {columns.map((col, cIdx) => {
                  let cellValue =
                    col.accessor === "No"
                      ? (currentPage - 1) * itemsPerPage + idx + 1
                      : row[col.accessor];
                  const colorClass =
                    col.colorMap && col.colorMap[cellValue]
                      ? col.colorMap[cellValue]
                      : "";
                  return (
                    <td
                      key={cIdx}
                      className={`px-4 py-3 text-sm ${colorClass}`}
                    >
                      {cellValue}
                    </td>
                  );
                })}
                {actions.length > 0 && (
                  <td className="px-4 py-3 flex space-x-2">
                    {actions.map((action, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={() => handleAction(action, row)}
                        className={`px-2 py-1 text-sm rounded ${
                          action.className ||
                          "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
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
      <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <div className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold">
            {(currentPage - 1) * itemsPerPage + 1}
          </span>{" "}
          -{" "}
          <span className="font-semibold">
            {Math.min(currentPage * itemsPerPage, processedData.length)}
          </span>{" "}
          of <span className="font-semibold">{processedData.length}</span>{" "}
          entries
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <span className="px-2">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Dynamic Modal */}
      <Modal
        show={modalConfig.show}
        title={modalConfig.action?.modalTitle || "Confirm"}
        message={
          modalConfig.action?.modalMessage?.(modalConfig.item) ||
          "Are you sure?"
        }
        onCancel={handleCancelModal}
        onConfirm={handleConfirmModal}
      />
    </div>
  );
};

export default DataTable;
