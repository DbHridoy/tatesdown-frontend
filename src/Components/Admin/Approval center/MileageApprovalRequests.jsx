import React from "react";
import DataTable from "../../Common/DataTable";
import {
  useChangeMileageLogStatusMutation,
  useGetPendingMileageLogsQuery,
} from "../../../redux/api/expenseApi";
import { useState } from "react";

function MileageApprovalRequests() {
  const [changeMileageLogStatus, { isLoading: isChangeLoading }] =
    useChangeMileageLogStatusMutation();

  const { data: getPendingMileageLogs, isLoading: isGetLoading } =
    useGetPendingMileageLogsQuery();
  console.log(getPendingMileageLogs);
  const mileageData = getPendingMileageLogs?.data ?? [];

  const formattedMileageData = mileageData.map((m) => ({
    id: m._id,
    salesRep: m.salesRepId?.fullName ?? "N/A",
    requestedAmount: m.deduction,
    status: m.status,
  }));

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortKey: "fullName",
    sortOrder: "asc",
    filters: { role: "" },
  });

  const totalItems = getPendingMileageLogs?.total;
  const tableConfig = {
    columns: [
      { label: "No", accessor: "No" },
      { label: "Sales Rep", accessor: "salesRep", sortable: true },
      { label: "Requested Amount", accessor: "requestedAmount" },
      { label: "Status", accessor: "status" },
    ],
    actions: [
      {
        label: "Approve",
        className: "bg-green-500 text-white p-2 rounded-lg",
        modal: true,
        modalTitle: "Approve Mileage Log",
        modalMessage: (item) =>
          `Are you sure you want to approve ${item.fullName}?`,
        onConfirm: (item) =>
          changeMileageLogStatus({ id: item.id, status: "Approved" }),
      },
      {
        label: "Reject",
        className: "bg-red-500 text-white p-2 rounded-lg",
        modal: true,
        modalTitle: "Reject Mileage Log",
        modalMessage: (item) =>
          `Are you sure you want to reject ${item.fullName}?`,
        onConfirm: (item) => {
          console.log(item); // logs the whole item
          changeMileageLogStatus({ id: item.id, status: "Rejected" });
        },
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
  return (
    <DataTable
      title="Mileage Log Approvals"
      data={formattedMileageData}
      config={tableConfig}
    />
  );
}

export default MileageApprovalRequests;
