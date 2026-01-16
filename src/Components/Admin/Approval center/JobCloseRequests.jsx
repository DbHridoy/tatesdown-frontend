import React from "react";
import DataTable from "../../Common/DataTable";
import {
  useChangeStatusMutation,
  useGetPendingCloseRequestQuery,
} from "../../../redux/api/jobApi";
import { useState } from "react";

function JobCloseRequests() {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortKey: "fullName",
    sortOrder: "asc",
    filters: { role: "" },
  });

  const [changeJobStatus] = useChangeStatusMutation();

  const { data: getPendingMileageLogs, isLoading: isGetLoading } =
    useGetPendingCloseRequestQuery(params);
  //console.log(getPendingMileageLogs);
  const mileageData = getPendingMileageLogs?.data ?? [];

  const formattedJobCloseData = mileageData.map((m) => ({
    id: m._id,
    clientName: m.quoteId?.clientId?.clientName ?? "N/A",
    totalAmount: m.estimatedPrice,
    status: m.status,
  }));

  const totalItems = getPendingMileageLogs?.total;
  const tableConfig = {
    columns: [
      { label: "No", accessor: "No" },
      { label: "Client Name", accessor: "clientName", sortable: true },
      { label: "Total Amount", accessor: "totalAmount" },
      { label: "Status", accessor: "status" },
    ],
    actions: [
      {
        label: "Approve",
        className: "bg-green-500 text-white p-2 rounded-lg",
        modal: true,
        modalTitle: "Approve Job Close Request",
        modalMessage: (item) =>
          `Are you sure you want to approve ${item.fullName}?`,
        onConfirm: (item) =>
          changeJobStatus({ id: item.id, status: "Approved" }),
      },
      {
        label: "Reject",
        className: "bg-red-500 text-white p-2 rounded-lg",
        modal: true,
        modalTitle: "Reject Job Close Request",
        modalMessage: (item) =>
          `Are you sure you want to reject ${item.fullName}?`,
        onConfirm: (item) =>
          changeJobStatus({ id: item.id, status: "Rejected" }),
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
      title="Job Close Approvals"
      data={formattedJobCloseData}
      config={tableConfig}
    />
  );
}

export default JobCloseRequests;
