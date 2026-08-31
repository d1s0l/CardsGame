import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '../../../../shared/ui/LoginInput/Input';
import PasswordInput from '../../../../shared/ui/PasswordInput/PasswordInput';
import LoginButton from '../../../../shared/ui/LoginButton/LoginButton';

import styles from './RegisterForm.module.scss';

import type { RegisterFormValues } from '../model/types';
import { registerSchema } from '../model/schema';

import { useRegisterMutation } from '../../../../app/api/users/usersApi';

export default function RegisterForm() {
    const [registerUser, { isLoading, error }] = useRegisterMutation();
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        try {
            const response = await registerUser(data).unwrap();

            localStorage.setItem('token', response.token);
            navigate('/login')
            console.log('Регистрация успешна:', response);
        } catch (error) {
            console.error('Ошибка регистрации:', error);
        }
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1 className={styles.title}>
                Создайте аккаунт
            </h1>

            <p className={styles.authSwitch}>
                Уже зарегистрированы?{' '}
                <Link
                    to="/login"
                    className={styles.authLink}
                >
                    Войти
                </Link>
            </p>

            <Input
                className={styles.input}
                title="Как к вам обращаться?"
                {...register('username')}
                placeholder="Введите имя профиля"
                error={errors.username?.message}
            />

            <Input
                className={styles.input}
                title="Какой у вас email"
                {...register('email')}
                type="email"
                placeholder="Введите адрес электронной почты"
                error={errors.email?.message}
            />

            <PasswordInput
                className={styles.input}
                title="Создайте пароль"
                {...register('password')}
                placeholder="Введите пароль"
                error={errors.password?.message}
            />

            <LoginButton
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </LoginButton>

            {error && (
                <p>
                    Не удалось зарегистрироваться
                </p>
            )}
        </form>
    );
}

