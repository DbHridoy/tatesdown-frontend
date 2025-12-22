import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAdd01Icon } from "@hugeicons/core-free-icons";
import Filters from "../../../Components/Sales-rep/Clients/Filters";
import QuoteTable from "../../../Components/Sales-rep/Quote/QuoteTable";
import DataTable from "../../../Components/Common/DataTable";
import { useState } from "react";
import { useGetAllQuotesQuery } from "../../../redux/api/quoteApi";

function Quotes() {
  const navigate = useNavigate();
  
  const { data } = useGetAllQuotesQuery();
  const quotes = data?.data ?? [];
  console.log(quotes);

  const columnData = [
    { label: "No", accessor: "No" },
    { label: "Client Name", accessor: "clientName" },
    { label: "Estimated Price", accessor: "estimatedPrice" },
    {
      label: "Expiry Date",
      accessor: "expiryDate",
    },
  ];

  const filterData = [
    // {
    //   label: "Status",
    //   accessor: "status",
    //   options: ["Pending", "Accepted", "Rejected"],
    // },
  ];

  const actionData = [
    {
      label: "Delete",
      modal: true,
      modalTitle: "Delete Client",
      modalMessage: (item) =>
        `Are you sure you want to delete ${item.clientName}?`,
      onConfirm: (item) => console.log("Deleted", item),
    },
    {
      label: "View",
      className: "bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600 text-white",
      onClick: (item) => navigate(`/s/sales-rep/quotes/${item.id}`),
    },
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
  
  const totalItems = quotes.length;
  
  const formattedQuote = quotes?.map((quote) => ({
    ...quote,
    clientName: quote.clientId?.clientName || "Unknown",
  }));

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
    <div>
      <div className="flex justify-between flex-row ">
        <div>
          <h1 className="text-2xl font-bold">Quotes</h1>
          <p>Manage your quotes here</p>
        </div>
        <div className="flex flex-row gap-2 bg-primarycolor text-white p-4 rounded">
          <HugeiconsIcon icon={UserAdd01Icon} />
          <button
            className=" "
            onClick={() => navigate("/s/sales-rep/add-new-quote")}
          >
            Add Quote
          </button>
        </div>
      </div>

      <DataTable
        title="Quote"
        data={formattedQuote || []} // 🔴 adjust if backend uses different key
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
      {/* <div className="py-4">
        <Filters />
      </div> */}
      {/* <div className="py-4">
        <QuoteTable />
      </div> */}
    </div>
  );
}

export default Quotes;
