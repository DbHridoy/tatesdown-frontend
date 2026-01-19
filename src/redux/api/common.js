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
      query: () => "/common/my-stats",
      providesTags: ["MyStats", "User"],
    }),

    getVariables: builder.query({
      query: () => "/common/get-variable",
      providesTags: ["Variable"],
    }),

    getLeaderBoard: builder.query({
      query: () => "/common/salesrep-leaderboard",
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
} = commonApi;
export default commonApi;
