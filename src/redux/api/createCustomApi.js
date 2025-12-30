import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseApi";

export const createCustomApi = (config) => {
  const { reducerPath, tagTypes = [], endpoints } = config;

  return createApi({
    reducerPath,
    baseQuery: baseQueryWithReauth,
    tagTypes,
    endpoints,
  });
};
