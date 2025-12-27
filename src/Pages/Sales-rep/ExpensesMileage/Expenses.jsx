import { useState } from "react";
import AddExpense from "../../../Components/Sales-rep/Expenses/AddExpense";
import ExpenseCard from "../../../Components/Sales-rep/Expenses/ExpenseCard";
import { useGetMyMileageLogsQuery } from "../../../redux/api/expenseApi";
import DataTable from "../../../Components/Common/DataTable";

function UserExpenses() {
  const { data: mileageLogs } = useGetMyMileageLogsQuery();

  const mileageLogsData = mileageLogs?.data ?? [];
  const totalMiles = mileageLogs?.totalMilesDriven ?? 0;
  const totalDeduction = mileageLogs?.totalDeduction ?? 0;

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortKey: "fullName",
    sortOrder: "asc",
    filters: { role: "" },
  });

  const totalItems = mileageLogs?.total ?? 0;

  const tableConfig = {
    columns: [
      { label: "No", accessor: "No" },
      { label: "Date", accessor: "createdAt", sortable: true },
      { label: "Total Miles Driven", accessor: "totalMilesDriven" },
      { label: "Deduction", accessor: "deduction" },
      { label: "Status", accessor: "status" },
    ],
    filters: [],
    totalItems,
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
    <div className="space-y-8">
      <AddExpense />
      <ExpenseCard totalMiles={totalMiles} totalDeduction={totalDeduction} />
      <DataTable title="Users" data={mileageLogsData} config={tableConfig} />
    </div>
  );
}

export default UserExpenses;
