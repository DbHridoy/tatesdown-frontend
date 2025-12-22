import { createCustomApi } from "./createCustomApi";

const jobApi = createCustomApi({
  reducerPath: "jobApi",
  tagTypes: ["Job"],
  endpoints: (builder) => ({
   createNewJob: builder.mutation({
      query: (newJob) => ({
        url: "/job/create-job",
        method: "POST",
        body: newJob,
      }),
      invalidatesTags: ["Job"],
    }),
    getAllJobs:builder.query({
        query:()=>({
            url:"/job/get-all-jobs",
            method:"GET",
        }),
        providesTags:["Job"]
    })
  }),   
});

export const {
  useCreateNewJobMutation,
  useGetAllJobsQuery,
} = jobApi;
export default jobApi;
