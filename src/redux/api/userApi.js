import { createCustomApi } from "./createCustomApi";

export const userApi = createCustomApi({
  reducerPath: "userApi",
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => `/user/me`,
      providesTags: ["User"],
    }),
    getUser: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: () => "/user",
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: `/user/${userData.id}`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    creatUser: builder.mutation({
      query: (userData) => ({
        url: "/user",
        method: "POST",
        body: userData,
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetUserQuery,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useCreatUserMutation,
  useDeleteUserMutation,
} = userApi;
