import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAdd01Icon } from "@hugeicons/core-free-icons";
import DataTable from "../../../Components/Common/DataTable";
import { useState } from "react";
import { useGetAllQuotesQuery } from "../../../redux/api/quoteApi";

function AdminQuote() {
  const navigate = useNavigate();
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortKey: "fullName",
    sortOrder: "asc",
    filters: { status: "Pending" },
  });

  const { data } = useGetAllQuotesQuery(params);
  const quotes = data?.data ?? [];
  console.log("line:21-quotes", quotes);
  const totalItems = data?.total;
  console.log("line:23-totalItems", totalItems);
  const formattedQuote = quotes.map((q) => {
    return {
      _id: q._id,
      clientName: q.clientId.clientName,
      estimatedPrice: q.estimatedPrice,
      bidSheet: q.bidSheet,
      bookedOnSpot: q.bookedOnSpot,
      expiryDate: new Date(q.expiryDate).toLocaleDateString(),
      notes: q.notes,
      status: q.status === 'pending' ? 'Pending' : q.status === 'approved' ? 'Approved' : 'Rejected',
      createdAt: new Date(q.createdAt).toLocaleDateString(),
      updatedAt: new Date(q.updatedAt).toLocaleDateString(),
      customQuoteId: q.customQuoteId,
    };
  });

  const tableConfig = {
    columns: [
      { label: "No", accessor: "No" },
      { label: "Client name", accessor: "clientName", sortable: true },
      { label: "Estimated price", accessor: "estimatedPrice", sortable: true },
      { label: "Creation date", accessor: "createdAt", sortable: true },

    ],
    // filters: [
    //   {
    //     label: "Role",
    //     accessor: "role",
    //     options: {
    //       "Sales rep": "sales-rep",
    //       "Production manager": "production-manager",
    //     },
    //   },
    // ],
    actions: [
      {
        label: "View",
        className: "bg-blue-500 text-white p-2 rounded-lg",
        onClick: (item) => {
          //console.log(item)
          navigate(`/admin/quotes/${item._id}`)
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
      </div>
      <DataTable title="Quotes" data={formattedQuote} config={tableConfig} />;
    </div>
  );
}

export default AdminQuote;
