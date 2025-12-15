import { createCustomApi } from "./createCustomApi";

export const userApi = createCustomApi({
  reducerPath: "userApi",
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => '/user/get-user-profile',
      providesTags: ['User']
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: '/user/update-profile',
        method: 'PATCH',
        body: userData
      }),
      invalidatesTags: ['User']
    })
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
