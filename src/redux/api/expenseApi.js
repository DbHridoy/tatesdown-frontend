import { baseApi } from "../baseApi";

const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExpenseSettings: builder.query({
      query: () => "/common/get-variable",
      providesTags: ["Variable"],
    }),

    updateExpenseSettings: builder.mutation({
      query: (data) => ({
        url: "/common/upsert-variable",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Variable"],
    }),

    createMileageLog: builder.mutation({
      query: (data) => ({
        url: "/expenses/mileage",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Expense"],
    }),

    getAllMileageLogs: builder.query({
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

        return `/expenses/all-mileage?${params.toString()}`;
      },
      providesTags: ["Expense"],
    }),

    updateMileageLogStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/expenses/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Expense"],
    }),
  }),
});

export const {
  useCreateMileageLogMutation,
  useGetAllMileageLogsQuery,
  useUpdateMileageLogStatusMutation,
  useGetExpenseSettingsQuery,
  useUpdateExpenseSettingsMutation,
} = expenseApi;
export default expenseApi;
