import { createCustomApi } from "./createCustomApi";

const clientApi = createCustomApi({
  reducerPath: "clientApi",
  tagTypes: ["Client"],
  endpoints: (builder) => ({
    // Add your endpoints here
    getClients: builder.query({
      query: () => "/client",
      providesTags: ["Client"],
    }),
    createClient: builder.mutation({
      query: (newClient) => ({
        url: "/client/create-client",
        method: "POST",
        body: newClient,
      }),
      invalidatesTags: ["Client"],
    }),
    getAllClients: builder.query({
      query: (options = {}) => {
        const params = new URLSearchParams();
        if (options.page) params.append('page', options.page);
        if (options.limit) params.append('limit', options.limit);
        if (options.search) params.append('search', options.search);
        if (options.sort) params.append('sort', options.sort);
        const queryString = params.toString();
        return `/client/get-all-clients?${queryString}`;
      },
      providesTags: ["Client"],
    }),
  }),
});

export const { useGetClientsQuery, useCreateClientMutation, useGetAllClientsQuery } = clientApi;
export default clientApi;
