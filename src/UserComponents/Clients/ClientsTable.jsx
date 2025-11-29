import { Delete02Icon, EyeIcon, MoneySendSquareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Table } from "antd";

const getStars = (rating) => {
  const ratingMap = {
    High: 4,
    Medium: 3,
    Low: 2,
  };

  const filledStars = ratingMap[rating] || 0;

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={i < filledStars ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const columns = [
  {
    title: "Client Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Phone / Email",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Lead Source",
    dataIndex: "source",
    key: "source",
  },
  {
    title: "Lead Rating",
    dataIndex: "rating",
    key: "rating",
    render: (rating) => getStars(rating),
  },
  {
    title: "Call Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div className="flex gap-2">
        <button className="text-red-500">
          <HugeiconsIcon icon={Delete02Icon} />
        </button>
        <button className="text-green-500">
          <HugeiconsIcon icon={MoneySendSquareIcon} />
        </button>
        <button className="text-blue-500">
          <HugeiconsIcon icon={EyeIcon} />
        </button>
      </div>
    ),
  },
];

const dataSource = [
  {
    name: "John Doe",
    phone: "123-456-7890",
    source: "New York",
    rating: "High",
    status: "Contacted",
  },
  {
    name: "Jane Smith",
    phone: "555-321-8976",
    source: "Chicago",
    rating: "Medium",
    status: "Pending",
  },
].map((item, index) => ({ ...item, key: index }));


function ClientsTable() {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{ pageSize: 5 }}
    />
  );
}
 

export default ClientsTable;
