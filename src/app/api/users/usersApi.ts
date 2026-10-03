import { baseApi } from '../baseApi';

import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    User,
} from './types';

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Auth

        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),

        // User

        getProfile: builder.query<User, void>({
            query: () => '/user/profile',
            providesTags: ['User'],
        }),

    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGetProfileQuery,
} = userApi;

