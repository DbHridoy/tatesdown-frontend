import { useState } from "react";
import AddExpense from "../../../Components/Sales-rep/Expenses/AddExpense";

import ExpenseCard from "../../../Components/Sales-rep/Expenses/ExpenseCard";

import { useGetMyMileageLogsQuery } from "../../../redux/api/expenseApi";
import DataTable from "../../../Components/Common/DataTable";

function UserExpenses() {
  const { data: mileageLogs } = useGetMyMileageLogsQuery();

  const mileageLogsData = mileageLogs?.data ?? [];

  const columnData = [
    {
      label: "No",
      accessor: "No",
    },
    {
      label: "Total Miles Driven",
      accessor: "totalMilesDriven",
    },
    {
      label: "Deduction",
      accessor: "deduction",
    },
    {
      label: "Status",
      accessor: "status",
    },
  ];

  const filterData = [
    // {
    //   label: "Call Status",
    //   accessor: "callStatus",
    //   options: ["Not Called", "Picked-Up Yes", "Picked-Up No"],
    // },
  ];

  const actionData = [
    // {
    //   label: "Delete",
    //   modal: true,
    //   modalTitle: "Delete Client",
    //   modalMessage: (item) =>
    //     `Are you sure you want to delete ${item.clientName}?`,
    //   onConfirm: (item) => console.log("Deleted", item),
    // },
    // {
    //   label: "Edit",
    //   className: "bg-yellow-500 hover:bg-yellow-600 text-white",
    //   onClick: (item) => console.log("Edit", item),
    // },
  ];

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    sort: "", // API value
    sortKey: "", // UI only
    sortOrder: "asc", // "asc" | "desc"
    filters: {},
  });

  const totalItems = mileageLogsData.length;

  // const formattedQuote = mileageLogsData?.map((quote) => ({
  //   ...quote,
  //   clientName: quote.clientId?.clientName || "Unknown",
  // }));

  const handleSearch = (search) => {
    setParams((p) => ({ ...p, search, page: 1 }));
  };

  const handleSortChange = (key) => {
    setParams((prev) => {
      let order = "asc";

      // same column → toggle
      if (prev.sortKey === key) {
        order = prev.sortOrder === "asc" ? "desc" : "asc";
      }

      return {
        ...prev,
        page: 1,
        sortKey: key,
        sortOrder: order,
        sort: order === "asc" ? key : `-${key}`,
      };
    });
  };

  const handlePageChange = (page) => {
    setParams((p) => ({ ...p, page }));
  };

  const handleFilterChange = (key, value) => {
    setParams((p) => ({
      ...p,
      page: 1,
      filters: {
        ...p.filters,
        [key]: value,
      },
    }));
  };

  return (
    <>
      <div className="space-y-8">
        <AddExpense />
        <ExpenseCard />
        <DataTable
          title="Quote"
          data={mileageLogsData || []} // 🔴 adjust if backend uses different key
          totalItems={totalItems}
          columns={columnData}
          actions={actionData}
          currentPage={params.page}
          itemsPerPage={params.limit}
          sortKey={params.sortKey}
          sortOrder={params.sortOrder}
          filters={filterData}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
        {/* <ExpenseFilter /> */}
        {/* <ExpenseList /> */}
      </div>
    </>
  );
}

export default UserExpenses;
