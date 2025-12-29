import { createCustomApi } from "./createCustomApi";

const statsApi = createCustomApi({
  reducerPath: "statsApi",
  tagTypes: ["Stats"],
  endpoints: (builder) => ({
    getAdminStats: builder.query({
      query: () => "/stats/admin",
      providesTags: ["Stats"],
    }),
  }),
});

export const { useGetAdminStatsQuery } = statsApi;
export default statsApi;
