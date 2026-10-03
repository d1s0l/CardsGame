import { baseApi } from "../baseApi";

import type { CreateCardRequest } from "./types";

export interface Card {
    id: string;
    title: string;
    question: string;
    answer: string;
    topic: string;
    tags: string[];
    isDraft: boolean;
}

interface CheckCardAnswerResponse {
    isCorrect: boolean;
}

export const cardsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateCard: builder.mutation<Card, { id: string; data: CreateCardRequest }>({
            query: ({ id, data }) => ({
                url: `/cards/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Card'],
        }),
        deleteCard: builder.mutation<Card, string>({
            query: (id) => ({
                url: `/cards/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Card'],
        }),
        getCards: builder.query<Card[], void>({
            query: () => '/cards',
            providesTags: ['Card']
        }),
        getCard: builder.query<Card, string>({
            query: (id) => `/cards/${id}`,
        }),
        checkCardAnswer: builder.mutation<CheckCardAnswerResponse, { cardId: string; answer: string }>({
            query: ({ cardId, answer }) => ({
                url: `/cards/${cardId}/answer`,
                method: 'POST',
                body: { answer },
            }),
        }),
        createCard: builder.mutation<Card, CreateCardRequest>({
            query: (data) => ({
                url: '/cards',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Card']
        }),
        saveDraft: builder.mutation<Card, CreateCardRequest>({
            query: (data) => ({
                url: '/cards/drafts',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useUpdateCardMutation,
    useDeleteCardMutation,
    useGetCardsQuery,
    useGetCardQuery,
    useCheckCardAnswerMutation,
    useCreateCardMutation,
    useSaveDraftMutation,
} = cardsApi;
