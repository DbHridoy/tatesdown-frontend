import React, { useEffect, useMemo, useState } from "react";
import { useUpdateUserMutation } from "../../../redux/api/userApi";

const emptyForm = {
  fullName: "",
  email: "",
  phoneNumber: "",
  address: "",
};

const ViewUser = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formUser, setFormUser] = useState(emptyForm);
  const [updateUser, { isLoading: isSaving }] = useUpdateUserMutation();

  useEffect(() => {
    if (!user) return;
    setFormUser({
      fullName: user.fullName ?? "",
      email: user.email ?? "",
      phoneNumber: user.phoneNumber ?? "",
      address: user.address ?? "",
    });
  }, [user]);

  const roleStats = useMemo(() => {
    if (!user) return null;
    if (user.role === "Sales Rep") return user.salesRep ?? null;
    if (user.role === "Production Manager") return user.productionManager ?? null;
    return null;
  }, [user]);

  const stats = useMemo(() => {
    if (!roleStats) return [];
    return [
      { key: "totalSold", label: "Total Sold", value: roleStats.totalSold ?? 0, prefix: "$" },
      { key: "commissionEarned", label: "Commission Earned", value: roleStats.commissionEarned ?? 0, prefix: "$" },
      { key: "commissionPending", label: "Commission Pending", value: roleStats.commissionPending ?? 0, prefix: "$" },
      { key: "totalRevenue", label: "Total Revenue", value: roleStats.totalRevenue ?? 0, prefix: "$" },
      { key: "totalProducedRevenue", label: "Total Produced Revenue", value: roleStats.totalProducedRevenue ?? 0, prefix: "$" },
      { key: "totalClients", label: "Total Clients", value: roleStats.totalClients ?? 0 },
      { key: "totalQuotes", label: "Total Quotes", value: roleStats.totalQuotes ?? 0 },
      { key: "totalJobs", label: "Total Jobs", value: roleStats.totalJobs ?? 0 },
      { key: "totalDc", label: "Total DC", value: roleStats.totalDc ?? 0 },
    ];
  }, [roleStats]);

  const formatValue = (item) => {
    const raw = item.value ?? 0;
    const formatted = typeof raw === "number" ? raw.toLocaleString() : String(raw);
    return `${item.prefix ?? ""}${formatted}${item.suffix ?? ""}`;
  };

  const handleCancel = () => {
    if (!user) return;
    setFormUser({
      fullName: user.fullName ?? "",
      email: user.email ?? "",
      phoneNumber: user.phoneNumber ?? "",
      address: user.address ?? "",
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!user?._id) return;
    await updateUser({
      id: user._id,
      data: {
        fullName: formUser.fullName,
        email: formUser.email,
        phoneNumber: formUser.phoneNumber,
        address: formUser.address,
      },
    }).unwrap();
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Personal Info</h3>
          <p className="text-sm text-gray-500">
            Review and update core contact details.
          </p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-3 py-2 border rounded-md text-sm"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm disabled:opacity-60"
                disabled={isSaving}
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoField
          label="Full Name"
          value={formUser.fullName}
          isEditing={isEditing}
          onChange={(value) => setFormUser((prev) => ({ ...prev, fullName: value }))}
        />
        <InfoField
          label="Email"
          value={formUser.email}
          type="email"
          isEditing={isEditing}
          onChange={(value) => setFormUser((prev) => ({ ...prev, email: value }))}
        />
        <InfoField
          label="Phone Number"
          value={formUser.phoneNumber}
          type="tel"
          isEditing={isEditing}
          onChange={(value) =>
            setFormUser((prev) => ({ ...prev, phoneNumber: value }))
          }
        />
        <InfoField
          label="Address"
          value={formUser.address}
          isEditing={isEditing}
          onChange={(value) => setFormUser((prev) => ({ ...prev, address: value }))}
        />
        <DisplayField label="Role" value={user?.role ?? "N/A"} />
        <DisplayField
          label="Cluster"
          value={roleStats?.cluster ?? "N/A"}
        />
      </div>

      <div className="border-t pt-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Role Stats</h3>
          <p className="text-sm text-gray-500">
            Performance metrics for {user?.role ?? "this role"}.
          </p>
        </div>
        {stats.length === 0 ? (
          <div className="rounded-lg border border-dashed p-4 text-sm text-gray-500">
            No stats available for this role yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {stats.map((item) => (
              <div
                key={item.key}
                className="rounded-xl border bg-white p-4 shadow-sm"
              >
                <div className="text-sm text-gray-500">{item.label}</div>
                <div className="mt-1 text-xl font-semibold text-gray-900">
                  {formatValue(item)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const InfoField = ({ label, value, type = "text", isEditing, onChange }) => (
  <div className="space-y-1">
    <div className="text-sm font-medium text-gray-700">{label}</div>
    {isEditing ? (
      <input
        type={type}
        className="w-full rounded-md border px-3 py-2 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <div className="rounded-md border px-3 py-2 text-sm text-gray-800">
        {value || "N/A"}
      </div>
    )}
  </div>
);

const DisplayField = ({ label, value }) => (
  <div className="space-y-1">
    <div className="text-sm font-medium text-gray-700">{label}</div>
    <div className="rounded-md border px-3 py-2 text-sm text-gray-800">
      {value || "N/A"}
    </div>
  </div>
);

export default ViewUser;
