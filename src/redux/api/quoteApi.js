import { createCustomApi } from "./createCustomApi";

const quoteApi = createCustomApi({
  reducerPath: "quoteApi",
  tagTypes: ["Quote"],
  endpoints: (builder) => ({
    createQuote: builder.mutation({
      query: (newQuote) => ({
        url: "/quote",
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

        return `/quote?${params.toString()}`;
      },
      providesTags: ["Quote"],
    }),

    getQuoteById: builder.query({
      query: (id) => `/quote/${id}`,
      providesTags: ["Quote"],
    }),

    updateQuote: builder.mutation({
      query: ({ id, body }) => ({
        url: `/quote/${id}`,
        method: "PATCH",
        body, // send FormData directly, no wrapping
      }),
      invalidatesTags: ["Quote"],
    }),

    deleteQuote: builder.mutation({
      query: (id) => ({
        url: `/quote/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quote"],
    }),
  }),
});

export const {
  useCreateQuoteMutation,
  useGetAllQuotesQuery,
  useGetQuoteByIdQuery,
  useUpdateQuoteMutation,
  useDeleteQuoteMutation,
} = quoteApi;
export default quoteApi;
