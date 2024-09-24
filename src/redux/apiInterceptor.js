import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: headers => {
    return headers;
  },
});

const baseQueryWithAuth = async (api, args, extraOptions) => {
  const result = await baseQuery(api, args, extraOptions);
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['auth'],
  endpoints: () => ({}),
});
