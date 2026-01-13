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
    getVariables: builder.query({
      query: () => "/common/get-variable",
      providesTags: ["Variable"],
    }),
    getLeaderBoard: builder.query({
      query: () => "/common/salesrep-leaderboard",
      providesTags: ["LeaderBoard"],
    }),

    createFiscalYear: builder.mutation({
      query: (newFiscalYear) => ({
        url: "/common/fiscal-year",
        method: "POST",
        body: newFiscalYear,
      }),
      invalidatesTags: ["FiscalYear"],
    }),

    getFiscalYear: builder.query({
      query: () => "/common/active-fiscal-year",
      providesTags: ["FiscalYear"],
    }),
  }),
});

export const {
  useUpsertVariableMutation,
  useGetVariablesQuery,
  useGetLeaderBoardQuery,
  useCreateFiscalYearMutation,
  useGetFiscalYearQuery,
} = commonApi;
export default commonApi;
