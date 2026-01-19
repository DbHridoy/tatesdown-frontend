import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
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
      query: (id) => `/users/${id}`,
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

        return `/users/?${params.toString()}`;
      },
      providesTags: ["User"],
    }),

    getUserStats: builder.query({
      query: ({ userId, periodType } = {}) => {
        if (!userId) return "";
        const params = new URLSearchParams();
        if (periodType) params.set("periodType", periodType);
        const query = params.toString();
        return query
          ? `/common/admin/users-stats/${userId}?${query}`
          : `/common/admin/users-stats/${userId}`;
      },
      providesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateMe: builder.mutation({
      query: (payload) => ({
        url: `/users/me`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),

    creatUser: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

  }),
});

export const {
  useCreateClusterMutation,
  useGetAllClustersQuery,
  useGetMeQuery,
  useGetUserQuery,
  useGetUserStatsQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useUpdateMeMutation,
  useCreatUserMutation,
  useDeleteUserMutation,
  useGetAllSalesRepQuery,
} = userApi;
