import { createCustomApi } from "./createCustomApi";

const clientApi = createCustomApi({
  reducerPath: "clientApi",
  tagTypes: ["Client"],
  endpoints: (builder) => ({
    createClient: builder.mutation({
      query: (newClient) => ({
        url: "/client",
        method: "POST",
        body: newClient,
      }),
      invalidatesTags: ["Client"],
    }),

    getAllClients: builder.query({
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

        return `/client?${params.toString()}`;
      },
      providesTags: ["Client"],
    }),

    getClientById: builder.query({
      query: (id) => `/client/${id}`,
      providesTags: ["Client"],
    }),

    updateClient: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/client/update-client/${id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["Client"],
    }),

    addCallLog: builder.mutation({
      query: (callLogData) => ({
        url: `/client/call-log`,
        method: "POST",
        body: callLogData,
      }),
      invalidatesTags: ["Client"],
    }),

    addNote: builder.mutation({
      query: (noteData) => ({
        url: `/client/client-note`,
        method: "POST",
        body: noteData,
      }),
      invalidatesTags: ["Client"],
    }),

    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/client/delete-client/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Client"],
    }),
  }),
});

export const {
  useCreateClientMutation,
  useGetAllClientsQuery,
  useGetClientByIdQuery,
  useUpdateClientMutation,
  useAddCallLogMutation,
  useAddNoteMutation,
  useDeleteClientMutation,
} = clientApi;
export default clientApi;
