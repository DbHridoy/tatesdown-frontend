import { createCustomApi } from "./createCustomApi";

const expenseApi = createCustomApi({
  reducerPath: "expenseApi",
  tagTypes: ["Expense"],
  endpoints: (builder) => ({
    createMileageLog: builder.mutation({
      query: (data) => ({
        url: "/expense/create-mileage",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Expense"],
    }),
    getMyMileageLogs: builder.query({
      query: (options = {}) => {
        const { page = 1, limit = 10, search, sort, filters = {} } = options;

        const params = new URLSearchParams();

        params.set("page", page);
        params.set("limit", limit);

        if (search) params.set("search", search);
        if (sort) params.set("sort", sort);

        // 🔥 Dynamic filters
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            params.set(key, value);
          }
        });

        return `/expense/get-my-mileage?${params.toString()}`;
      },
      providesTags: ["Expense"],
    }),
    getPendingMileageLogs: builder.query({
      query: () => "/expense/get-pending-mileage",
      providesTags: ["Expense"],
    }),
    changeMileageLogStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/expense/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Expense"],
    }),
  }),
});

export const {
  useCreateMileageLogMutation,
  useGetMyMileageLogsQuery,
  useGetPendingMileageLogsQuery,
  useChangeMileageLogStatusMutation,
} = expenseApi;
export default expenseApi;
