import { baseApi } from "../baseApi";

const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewJob: builder.mutation({
      query: (newJob) => ({
        url: "/jobs",
        method: "POST",
        body: newJob,
      }),
      invalidatesTags: ["Job", "User"],
    }),

    createJobNote: builder.mutation({
      query: (formData) => ({
        url: "/jobs/job-note",
        method: "POST",
        body: formData, // FormData
      }),
      invalidatesTags: ["Job"],
    }),

    createDesignConsultation: builder.mutation({
      query: (dc) => ({
        url: `/jobs/design-consultation`,
        body: dc,
        method: "POST",
      }),
      invalidatesTags: ["Job"],
    }),

    getAllJobs: builder.query({
      query: (options = {}) => {
        const { page = 1, limit = 0, search, sort, filters = {} } = options;

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

        return `/jobs?${params.toString()}`;
      },
      providesTags: ["Job"],
    }),

    getJobById: builder.query({
      query: (id) => `/jobs/${id}`,
      providesTags: ["Job"],
    }),

    updateJob: builder.mutation({
      query: ({ id, data }) => ({
        url: `/jobs/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),

    changeStatus: builder.mutation({
      query: ({ id, status, productionManagerId }) => ({
        url: `/jobs/${id}`,
        method: "PATCH",
        body: {
          status,
          productionManagerId
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

        return `/jobs/downpayment-request?${params.toString()}`;
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

        return `/jobs/job-close-approval?${params.toString()}`;
      },
      providesTags: ["Job"],
    }),

    updateDownPaymentStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: "/jobs/downpayment-status",
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

        return `/jobs/${repId}?${params.toString()}`;
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
  useUpdateJobMutation,
  useGetDownpaymentRequestQuery,
  useGetPendingCloseRequestQuery,
  useUpdateDownPaymentStatusMutation,
  useGetSalesRepJobsQuery,
  useGetSalesRepDeductionQuery,
} = jobApi;
export default jobApi;
