import { baseApi } from '../baseApi';

import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    VerifyEmailRequest,
    VerifyEmailResponse,
    ResendVerificationRequest,
    ResendVerificationResponse,
    User,
    UpdateProfileRequest,
    ChangePasswordRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    Session,
    TerminateSessionRequest,
    TerminateAllSessionsRequest,
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

        verifyEmail: builder.mutation<
            VerifyEmailResponse,
            VerifyEmailRequest
        >({
            query: (data) => ({
                url: '/auth/verify-email',
                method: 'POST',
                body: data,
            }),
        }),

        resendVerification: builder.mutation<
            ResendVerificationResponse,
            ResendVerificationRequest
        >({
            query: (data) => ({
                url: '/auth/resend-verification',
                method: 'POST',
                body: data,
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

        updateProfile: builder.mutation<User, UpdateProfileRequest>({
            query: (data) => ({
                url: '/user/profile',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),

        changePassword: builder.mutation<void, ChangePasswordRequest>({
            query: (data) => ({
                url: '/users/change-password',
                method: 'POST',
                body: data,
            }),
        }),

        // Password

        forgotPassword: builder.mutation<void, ForgotPasswordRequest>({
            query: (data) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: data,
            }),
        }),

        resetPassword: builder.mutation<void, ResetPasswordRequest>({
            query: (data) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: data,
            }),
        }),

        // Sessions

        getSessions: builder.query<Session[], void>({
            query: () => '/users/sessions',
        }),

        terminateSession: builder.mutation<void, TerminateSessionRequest>({
            query: ({ sessionId }) => ({
                url: `/users/sessions/${sessionId}`,
                method: 'DELETE',
            }),
        }),

        terminateAllSessions: builder.mutation<
            void,
            TerminateAllSessionsRequest
        >({
            query: (data) => ({
                url: '/users/sessions/terminate-all',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useVerifyEmailMutation,
    useResendVerificationMutation,
    useLogoutMutation,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useGetSessionsQuery,
    useTerminateSessionMutation,
    useTerminateAllSessionsMutation,
} = userApi;

