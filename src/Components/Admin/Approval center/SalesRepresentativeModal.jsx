import React, { useState, useMemo } from "react";
import { useGetAllUsersQuery } from "../../../redux/api/userApi";
import { useUpdateClientMutation } from "../../../redux/api/clientApi";

export default function SalesRepresentativeModal({ isOpen, onClose, lead }) {
  const [search, setSearch] = useState("");

  const [updateClient, { isLoading: updating }] =
    useUpdateClientMutation();

  const { data: user, isLoading } = useGetAllUsersQuery({
    filters: { role: "sales-rep" },
  });

  const users = user?.data || [];

  const filteredReps = useMemo(() => {
    return users.filter(
      (rep) =>
        rep.fullName.toLowerCase().includes(search.toLowerCase()) ||
        rep.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const handleAssignSalesRep = async (rep) => {
    if (!lead?._id) return;

    try {
      await updateClient({
        id: lead._id,
        salesRepId: rep._id,
      }).unwrap();

      onClose();
    } catch (error) {
      console.error("Failed to assign sales rep:", error);
    }
  };

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Sales Representative</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search sales rep..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-lg bg-gray-100"
        />

        {/* List */}
        <div className="max-h-64 overflow-y-auto space-y-2">
          {filteredReps.length > 0 ? (
            filteredReps.map((rep) => (
              <div
                key={rep._id}
                onClick={() => handleAssignSalesRep(rep)}
                className="p-3 rounded-md border hover:bg-gray-100 cursor-pointer"
              >
                <p className="font-medium">{rep.fullName}</p>
                <p className="text-sm text-gray-500">{rep.email}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">
              No representatives found.
            </p>
          )}
        </div>

        {updating && (
          <p className="text-sm text-center text-blue-500 mt-3">
            Assigning sales rep...
          </p>
        )}
      </div>
    </div>
  );
}
