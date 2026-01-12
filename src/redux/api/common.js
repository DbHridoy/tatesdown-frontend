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
  }),
});

export const {
  useUpsertVariableMutation,
  useGetVariablesQuery,
  useGetLeaderBoardQuery,
} = commonApi;
export default commonApi;
