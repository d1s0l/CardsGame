import { baseApi } from "../baseApi";

import type { CreateCardRequest } from "./types";

export interface Card {
    id: string;
    title: string;
    question: string;
    answer: string;
    topic: string;
    tags: string[];
}

export const cardsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createCard: builder.mutation<Card, CreateCardRequest>({
            query: (data) => ({
                url: '/cards',
                method: 'POST',
                body: data,
            }),
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
    useCreateCardMutation,
    useSaveDraftMutation,
} = cardsApi;