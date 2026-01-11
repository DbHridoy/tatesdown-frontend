import { createCustomApi } from "./createCustomApi";

const clientApi = createCustomApi({
  reducerPath: "clientApi",
  tagTypes: ["Client"],
  endpoints: (builder) => ({
    createClient: builder.mutation({
      query: (newClient) => ({
        url: "/clients",
        method: "POST",
        body: newClient,
      }),
      invalidatesTags: ["Client"],
    }),

    addCallLog: builder.mutation({
      query: ({ clientId, callAt, status, reason, note }) => ({
        url: `/clients/${clientId}/call-log`,
        method: "POST",
        body: { callAt, status, reason, note },
      }),
      invalidatesTags: ["Client"],
    }),

    addNote: builder.mutation({
      query: ({ clientId, formData }) => ({
        url: `/clients/${clientId}/client-note`,
        method: "POST",
        body: formData, // ✅ FormData
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

        return `/clients?${params.toString()}`;
      },
      providesTags: ["Client"],
    }),

    getClientById: builder.query({
      query: (id) => `/clients/${id}`,
      providesTags: ["Client"],
    }),

    updateClient: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/clients/${id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["Client"],
    }),

    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/clients/${id}`,
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
