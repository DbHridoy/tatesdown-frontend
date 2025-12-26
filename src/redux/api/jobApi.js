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
    getAllJobs:builder.query({
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
    })
  }),   
});

export const {
  useCreateNewJobMutation,
  useGetAllJobsQuery,
} = jobApi;
export default jobApi;
