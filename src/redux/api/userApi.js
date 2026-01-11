import { createCustomApi } from "./createCustomApi";

export const userApi = createCustomApi({
  reducerPath: "userApi",
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createCluster: builder.mutation({
      query: (clusterName) => ({
        url: "/common/cluster",
        method: "POST",
        body: { clusterName },
      }),
      invalidatesTags: ["User"],
    }),

    getAllClusters: builder.query({
      query: () => `/common/cluster`,
      providesTags: ["User"],
    }),

    getMe: builder.query({
      query: () => `/users/me`,
      providesTags: ["User"],
    }),

    getUser: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: ["User"],
    }),

    getAllUsers: builder.query({
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

        return `/user/?${params.toString()}`;
      },
      providesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateMe: builder.mutation({
      query: (payload) => ({
        url: `/user/me`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),

    creatUser: builder.mutation({
      query: (userData) => ({
        url: "/user",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    getAllSalesRep: builder.query({
      query: () => `/user/sales-reps`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useCreateClusterMutation,
  useGetAllClustersQuery,
  useGetMeQuery,
  useGetUserQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useUpdateMeMutation,
  useCreatUserMutation,
  useDeleteUserMutation,
  useGetAllSalesRepQuery,
} = userApi;
