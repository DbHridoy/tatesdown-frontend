import { createCustomApi } from "./createCustomApi";

const jobApi = createCustomApi({
  reducerPath: "jobApi",
  tagTypes: ["Job"],
  endpoints: (builder) => ({
    createNewJob: builder.mutation({
      query: (newJob) => ({
        url: "/job",
        method: "POST",
        body: newJob,
      }),
      invalidatesTags: ["Job"],
    }),

     createJobNote: builder.mutation({
      query: (formData) => ({
        url: "/job/job-note",
        method: "POST",
        body: formData, // FormData
      }),
      invalidatesTags: ["Job"],
    }),

      createDesignConsultation: builder.mutation({
      query: (dc) => ({
        url: `/job/design-consultation`,
        body: dc,
        method: "POST",
      }),
      providesTags: ["Job"],
    }),

    getAllJobs: builder.query({
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

        return `/job?${params.toString()}`;
      },
      providesTags: ["Job"],
    }),
    getJobById: builder.query({
      query: (id) => `/job/${id}`,
      providesTags: ["Job"],
    }),
   
  

    changeStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/job/${id}`,
        method: "PATCH",
        body: {
          status,
        },
      }),
      invalidatesTags: ["Job"],
    }),

    getDownpaymentRequest: builder.query({
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

        return `/job/downpayment-request?${params.toString()}`;
      },
      providesTags: ["Job"],
    }),
    getPendingCloseRequest: builder.query({
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

        return `/job/job-close-approval?${params.toString()}`;
      },
      providesTags: ["Job"],
    }),
    updateDownPaymentStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: "/job/downpayment-status",
        method: "PATCH",
        body: {
          id,
          status,
        },
      }),
      invalidatesTags: ["Job"],
    }),
    getSalesRepJobs: builder.query({
      query: ({ options = {}, repId }) => {
        const { page = 1, limit = 10, search, sort, filters = {} } = options;

        const params = new URLSearchParams();
        params.set("page", page);
        params.set("limit", limit);

        if (search) params.set("search", search);
        if (sort) params.set("sort", sort);

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            params.set(key, value);
          }
        });

        return `/job/${repId}?${params.toString()}`;
      },
      providesTags: ["Job"],
    }),
    getSalesRepDeduction: builder.query({
      query: (repId) => `/stats/sales-rep-stats/${repId}`,
      providesTags: ["Job"],
    }),
  }),
});

export const {
  useCreateNewJobMutation,
  useGetAllJobsQuery,
  useGetJobByIdQuery,
  useCreateJobNoteMutation,
  useCreateDesignConsultationMutation,
  useChangeStatusMutation,
  useGetDownpaymentRequestQuery,
  useGetPendingCloseRequestQuery,
  useUpdateDownPaymentStatusMutation,
  useGetSalesRepJobsQuery,
  useGetSalesRepDeductionQuery,
} = jobApi;
export default jobApi;
