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
  }),
});

export const { useCreateMileageLogMutation, useGetMyMileageLogsQuery } = expenseApi;
export default expenseApi;
