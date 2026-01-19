import { baseApi } from "../baseApi";

const commonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    upsertVariable: builder.mutation({
      query: (newVariable) => ({
        url: "/common/upsert-variable",
        method: "POST",
        body: newVariable,
      }),
      invalidatesTags: ["Variable"],
    }),

    getMyStats: builder.query({
      query: ({ periodType, date } = {}) => {
        const params = new URLSearchParams();
        if (periodType) params.set("periodType", periodType);
        if (date) params.set("date", date);
        const query = params.toString();
        return query ? `/common/my-stats?${query}` : "/common/my-stats";
      },
      providesTags: ["MyStats", "User"],
    }),

    getVariables: builder.query({
      query: () => "/common/get-variable",
      providesTags: ["Variable"],
    }),

    getLeaderBoard: builder.query({
      query: ({ periodType } = {}) => {
        const params = new URLSearchParams();
        if (periodType) params.set("periodType", periodType);
        const query = params.toString();
        return query
          ? `/common/salesrep-leaderboard?${query}`
          : "/common/salesrep-leaderboard";
      },
      providesTags: ["LeaderBoard"],
    }),

    getNotifications: builder.query({
      query: () => "/common/my-notifications",
      providesTags: ["User"],
    }),

    markNotificationRead: builder.mutation({
      query: (id) => ({
        url: `/common/notification/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),

    createPayment: builder.mutation({
      query: (payload) => ({
        url: "/common/payments",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Payment", "User"],
    }),

    getPayments: builder.query({
      query: (salesRepId) => ({
        url: "/common/payments",
        params: { salesRepId },
      }),
      providesTags: ["Payment"],
    }),

    updatePayment: builder.mutation({
      query: ({ paymentId, ...body }) => ({
        url: `/payments/${paymentId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Payment"],
    }),

    deletePayment: builder.mutation({
      query: (paymentId) => ({
        url: `/payments/${paymentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const {
  useUpsertVariableMutation,
  useGetVariablesQuery,
  useGetLeaderBoardQuery,
  useCreateFiscalYearMutation,
  useGetFiscalYearQuery,
  useGetMyStatsQuery,
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useCreatePaymentMutation,
  useGetPaymentsQuery,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = commonApi;
export default commonApi;
