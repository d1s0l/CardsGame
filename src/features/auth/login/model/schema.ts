import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .email('Некорректный email'),

    password: z
        .string()
        .min(1, 'Введите пароль')
        .min(8, 'Пароль должен содержать минимум 8 символов')
})