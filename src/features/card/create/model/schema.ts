import { z } from "zod";

export const createCardSchema = z.object({
    title: z
        .string()
        .min(1, 'Введите название карточки')
        .min(2, 'Название должно содержать минимум 2 символа'),

    question: z
        .string()
        .min(1, 'Введите вопрос'),

    answer: z
        .string()
        .min(1, 'Введите ответ'),

    topic: z
        .string()
        .min(1, 'Выберите тему'),

    tags: z
        .array(z.string())
        .min(1, 'Выберите хотя бы один тэг')
})