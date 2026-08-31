
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../../shared/lib/auth/token';

export const baseApi = createApi({
    reducerPath: 'baseApi',

    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,

        prepareHeaders: (headers) => {
            const token = getToken()

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),

    tagTypes: ['User'],

    endpoints: () => ({}),
});

