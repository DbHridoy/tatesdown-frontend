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
  }),
});

export const { useUpsertVariableMutation } = commonApi;
export default commonApi;
