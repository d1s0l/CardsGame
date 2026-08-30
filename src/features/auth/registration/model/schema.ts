import { z } from 'zod';

export const registerSchema = z.object({
    name: z
        .string()
        .min(2, 'Минимум 2 символа'),
    email: z
        .email('Некорректный email'),

    password: z
        .string()
        .min(1, 'Введите пароль')
        .min(8, 'Пароль должен содержать минимум 8 символов')
})