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
      query: () => "/expense/get-my-mileage",
      providesTags: ["Expense"],
    }),
    getPendingMileageLogs: builder.query({
      query: () => "/expense/get-pending-mileage",
      providesTags: ["Expense"],
    }),
    changeMileageLogStatus: builder.mutation({
      query: (data) => ({
        url: `/expense/${data._id}`,
        method: "PATCH",
        body: data,
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
