import { createCustomApi } from "./createCustomApi";

const commonApi = createCustomApi({
  reducerPath: "commonApi",
  tagTypes: ["Variable"],
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
  }),
});

export const { useUpsertVariableMutation, useGetVariablesQuery } = commonApi;
export default commonApi;
