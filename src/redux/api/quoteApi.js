import { createCustomApi } from "./createCustomApi";

const quoteApi = createCustomApi({
  reducerPath: "quoteApi",
  tagTypes: ["Quote"],
  endpoints: (builder) => ({
    // Add your endpoints here
    getQuotes: builder.query({
      query: () => "/quote",
      providesTags: ["Quote"],
    }),
    createQuote: builder.mutation({
      query: (newQuote) => ({
        url: "/quote/create-quote",
        method: "POST",
        body: newQuote,
      }),
      invalidatesTags: ["Quote"],
    }),
    getAllQuotes: builder.query({
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

        return `/quote/get-all-quotes?${params.toString()}`;
      },
      providesTags: ["Quote"],
    }),
    getQuoteById: builder.query({
      query: (id) => `/quote/get-single-quote/${id}`,
      providesTags: ["Quote"],
    }),
    updateQuote: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/quote/update-quote/${id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["Quote"],
    }),
    deleteQuote: builder.mutation({
      query: (id) => ({
        url: `/quote/delete-quote/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quote"],
    }),
    // Keep the rest of the code as is
    getAllQuotes: builder.query({
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

        return `/quote/get-all-quotes?${params.toString()}`;
      },
      providesTags: ["Quote"],
    }),
    getQuoteById: builder.query({
      query: (id) => `/quote/get-single-quote/${id}`,
      providesTags: ["Quote"],
    }),
    updateQuote: builder.mutation({
      query: ({ id, ...updateData }) => ({
        url: `/quote/update-quote/${id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["Quote"],
    }),
    addCallLog: builder.mutation({
      query: (callLogData) => ({
        url: `/quote/create-quote-call-log`,
        method: "POST",
        body: callLogData,
      }),
      invalidatesTags: ["Quote"],
    }),
    addNote: builder.mutation({
      query: (noteData) => ({
        url: `/quote/create-quote-note`,
        method: "POST",
        body: noteData,
      }),
      invalidatesTags: ["Quote"],
    }),
    deleteQuote: builder.mutation({
      query: (id) => ({
        url: `/quote/delete-quote/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quote"],
    }),
  }),
});

export const {
  useGetQuotesQuery,
  useCreateQuoteMutation,
  useGetAllQuotesQuery,
  useGetQuoteByIdQuery,
  useUpdateQuoteMutation,
  useAddCallLogMutation,
  useAddNoteMutation,
  useDeleteQuoteMutation,
} = quoteApi;
export default quoteApi;
