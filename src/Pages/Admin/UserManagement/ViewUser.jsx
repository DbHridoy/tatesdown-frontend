import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllClustersQuery,
  useGetUserQuery,
  useGetUserStatsQuery,
  useUpdateUserMutation,
} from "../../../redux/api/userApi";

const emptyForm = {
  fullName: "",
  email: "",
  role: "",
  cluster: "",
};

const ViewUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [formUser, setFormUser] = useState(emptyForm);
  const [updateUser, { isLoading: isSaving }] = useUpdateUserMutation();
  const { data: userData, isLoading } = useGetUserQuery(userId, {
    skip: !userId,
  });
  const { data: userStatsData, isLoading: isStatsLoading } =
    useGetUserStatsQuery(userId, { skip: !userId });
  const { data: clustersData } = useGetAllClustersQuery();
  const user = userData?.data;
  const userStats = userStatsData?.data;
  const clusters = clustersData?.data ?? [];

  useEffect(() => {
    if (!user) return;
    setFormUser({
      fullName: user.fullName ?? "",
      email: user.email ?? "",
      role: user.role ?? "",
      cluster: user.cluster ?? "",
    });
  }, [user]);

  const stats = useMemo(() => {
    if (!userStats?.stats) return [];
    const statsData = userStats.stats;

    if (userStats.role === "Production Manager") {
      return [
        { key: "readyToScheduleCount", label: "Ready to Schedule", value: statsData.readyToScheduleCount ?? 0 },
        { key: "scheduledAndOpenCount", label: "Scheduled & Open", value: statsData.scheduledAndOpenCount ?? 0 },
        { key: "pendingCloseCount", label: "Pending Close", value: statsData.pendingCloseCount ?? 0 },
        { key: "cancelledCount", label: "Cancelled", value: statsData.cancelledCount ?? 0 },
        { key: "totalRevenue", label: "Total Revenue", value: statsData.totalRevenue ?? 0, prefix: "$" },
        { key: "totalProducedRevenue", label: "Total Produced Revenue", value: statsData.totalProducedRevenue ?? 0, prefix: "$" },
      ];
    }

    return [
      { key: "totalClients", label: "Total Clients", value: statsData.totalClients ?? 0 },
      { key: "totalQuotes", label: "Total Quotes", value: statsData.totalQuotes ?? 0 },
      { key: "totalJobs", label: "Total Jobs", value: statsData.totalJobs ?? 0 },
      { key: "totalRevenueEarned", label: "Revenue Earned", value: statsData.totalRevenueEarned ?? 0, prefix: "$" },
      { key: "totalRevenueProduced", label: "Revenue Produced", value: statsData.totalRevenueProduced ?? 0, prefix: "$" },
      { key: "totalCommissionEarned", label: "Commission Earned", value: statsData.totalCommissionEarned ?? 0, prefix: "$" },
      { key: "totalCommissionPaid", label: "Commission Paid", value: statsData.totalCommissionPaid ?? 0, prefix: "$" },
      { key: "totalCommissionPending", label: "Commission Pending", value: statsData.totalCommissionPending ?? 0, prefix: "$" },
    ];
  }, [userStats]);

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
      role: user.role ?? "",
      cluster: user.cluster ?? "",
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
        role: formUser.role,
        cluster: formUser.role === "Sales Rep" ? formUser.cluster : "",
      },
    }).unwrap();
    setIsEditing(false);
  };

  if (isLoading) {
    return <div className="p-6">Loading user...</div>;
  }

  if (!user) {
    return <div className="p-6 text-red-500">User not found.</div>;
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            User Details
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Manage basic account information.
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="w-full sm:w-auto px-3 py-2 border rounded-md text-sm sm:text-base"
        >
          Back
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Personal Info
          </h3>
          <p className="text-sm sm:text-base text-gray-500">
            Review and update core contact details.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="w-full sm:w-auto px-3 py-2 border rounded-md text-sm sm:text-base"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="w-full sm:w-auto px-3 py-2 bg-blue-600 text-white rounded-md text-sm sm:text-base disabled:opacity-60"
                disabled={isSaving}
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full sm:w-auto px-3 py-2 bg-blue-600 text-white rounded-md text-sm sm:text-base"
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
          label="Role"
          value={formUser.role}
          isEditing={isEditing}
          asSelect
          options={["Sales Rep", "Production Manager"]}
          onChange={(value) =>
            setFormUser((prev) => ({
              ...prev,
              role: value,
              cluster: value === "Sales Rep" ? prev.cluster : "",
            }))
          }
        />
        {formUser.role === "Sales Rep" ? (
          <InfoField
            label="Cluster"
            value={formUser.cluster}
            isEditing={isEditing}
            asSelect
            options={clusters.map((cluster) => cluster.clusterName)}
            onChange={(value) =>
              setFormUser((prev) => ({ ...prev, cluster: value }))
            }
          />
        ) : (
          <DisplayField label="Cluster" value="N/A" />
        )}
      </div>

      <div className="border-t pt-6">
        <div className="mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            Role Stats
          </h3>
          <p className="text-sm sm:text-base text-gray-500">
            Performance metrics for {user?.role ?? "this role"}.
          </p>
        </div>
        {isStatsLoading ? (
          <div className="rounded-lg border border-dashed p-4 text-sm text-gray-500">
            Loading stats...
          </div>
        ) : stats.length === 0 ? (
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
                <div className="mt-1 text-lg sm:text-xl font-semibold text-gray-900">
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

const InfoField = ({
  label,
  value,
  type = "text",
  isEditing,
  onChange,
  asSelect = false,
  options = [],
}) => (
  <div className="space-y-1">
    <div className="text-sm font-medium text-gray-700">{label}</div>
    {isEditing ? (
      asSelect ? (
        <select
          className="w-full rounded-md border px-3 py-2 text-sm sm:text-base"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className="w-full rounded-md border px-3 py-2 text-sm sm:text-base"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )
    ) : (
      <div className="rounded-md border px-3 py-2 text-sm sm:text-base text-gray-800">
        {value || "N/A"}
      </div>
    )}
  </div>
);

const DisplayField = ({ label, value }) => (
  <div className="space-y-1">
    <div className="text-sm font-medium text-gray-700">{label}</div>
    <div className="rounded-md border px-3 py-2 text-sm sm:text-base text-gray-800">
      {value || "N/A"}
    </div>
  </div>
);

export default ViewUser;
