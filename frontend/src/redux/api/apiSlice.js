import {fetchQuery, createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URI } from '../constants';

const baseQuery = fetchBaseQuery({baseUrl: BASE_URI });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Product", "Order", "User", "Category"],
    endpoints: () => ({}),
})
