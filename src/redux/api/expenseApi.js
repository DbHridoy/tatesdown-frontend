import { createCustomApi } from "./createCustomApi";

const variableApi = createCustomApi({
  reducerPath: "variableApi",
  tagTypes: ["Variable"],
  endpoints: (builder) => ({
    upsertVariable: builder.mutation({
      query: (newVariable) => ({
        url: "/variable/upsert-variable",
        method: "POST",
        body: newVariable,
      }),
      invalidatesTags: ["Variable"],
    }),
  }),
});

export const { useUpsertVariableMutation } = variableApi;
export default variableApi;
