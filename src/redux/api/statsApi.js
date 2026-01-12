import { baseApi } from "../baseApi";

const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query({
      query: () => "/stats/admin",
      providesTags: ["Stats"],
    }),
  }),
});

export const { useGetAdminStatsQuery } = statsApi;
export default statsApi;
