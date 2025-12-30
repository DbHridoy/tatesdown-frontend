import { createCustomApi } from "./createCustomApi";

export const authApi = createCustomApi({
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    // Password management
    sendOtp: builder.mutation({
      query: (email) => ({
        url: "/auth/send-otp",
        method: "POST",
        body: { email },
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    setNewPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/set-new-password",
        method: "POST",
        body: data,
      }),
    }),

    // Profile endpoints
    // getProfile: builder.query({
    //   query: () => "/users/profile",
    //   transformResponse: (response) => {
    //     // Handle both wrapped and direct responses
    //     if (response.success && response.data) {
    //       return response.data;
    //     }
    //     return response;
    //   },
    //   providesTags: ["Profile"],
    // }),
    // updateProfile: builder.mutation({
    //   query: (data) => ({
    //     url: "/users/profile",
    //     method: "PUT",
    //     body: data,
    //   }),
    //   transformResponse: (response) => {
    //     // Handle both wrapped and direct responses
    //     if (response.success && response.data) {
    //       return response.data;
    //     }
    //     return response;
    //   },
    //   invalidatesTags: ["Profile"],
    // }),
    // changePassword: builder.mutation({
    //   query: (data) => ({
    //     url: "/users/profile/change-password",
    //     method: "PUT",
    //     body: data,
    //   }),
    // }),
    // profileImage: builder.mutation({
    //   query: (data) => ({
    //     url: "/users/profile/image-upload",
    //     method: "POST",
    //     body: data,
    //   }),
    //   transformResponse: (response) => {
    //     // Handle both wrapped and direct responses
    //     if (response.success && response.data) {
    //       return response.data;
    //     }
    //     return response;
    //   },
    //   invalidatesTags: ["Profile"],
    // }),

    // // User management (Admin/SuperAdmin only)
    // createUser: builder.mutation({
    //   query: (userData) => ({
    //     url: "/users/create",
    //     method: "POST",
    //     body: userData,
    //   }),
    //   invalidatesTags: ["User"],
    // }),
    // getAllUsers: builder.query({
    //   query: (params) => ({
    //     url: "/users",
    //     params,
    //   }),
    //   transformResponse: (response) => {
    //     // Your API nests pagination data inside response.pagination.pagination
    //     if (response.success && response.pagination?.data) {
    //       return {
    //         items: response.pagination.data,
    //         pagination: response.pagination.pagination || {},
    //       };
    //     }

    //     // Fallback for other structures
    //     if (response.success && Array.isArray(response.data)) {
    //       return {
    //         items: response.data,
    //         pagination: response.pagination || {},
    //       };
    //     }

    //     // As a last resort
    //     return {
    //       items: [],
    //       pagination: {},
    //     };
    //   },
    //   providesTags: ["User"],
    // }),

    // getUserById: builder.query({
    //   query: (id) => `/users/${id}`,
    //   transformResponse: (response) => {
    //     // Handle both wrapped and direct responses
    //     if (response.success && response.data) {
    //       return response.data;
    //     }
    //     // If it's already the direct data, return it
    //     return response;
    //   },
    //   providesTags: (result, error, id) => [{ type: "User", id }],
    // }),
    // adminUpdateUser: builder.mutation({
    //   query: ({ id, ...data }) => ({
    //     url: `/users/${id}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   transformResponse: (response) => {
    //     // Handle both wrapped and direct responses
    //     if (response.success && response.data) {
    //       return response.data;
    //     }
    //     return response;
    //   },
    //   invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    // }),
    // deleteUser: builder.mutation({
    //   query: (id) => ({
    //     url: `/users/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: (result, error, id) => [{ type: "User", id }],
    // }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useSetNewPasswordMutation,
} = authApi;
