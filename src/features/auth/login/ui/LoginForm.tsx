import styles from './LoginForm.module.scss';

import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { LoginFormValues } from '../model/types';
import { loginSchema } from '../model/schema';

import Input from '../../../../shared/ui/LoginInput/Input';
import LoginButton from '../../../../shared/ui/LoginButton/LoginButton';
import PasswordInput from '../../../../shared/ui/PasswordInput/PasswordInput';
import { useLoginMutation } from '../../../../app/api/users/usersApi';
import { setToken } from '../../../../shared/lib/auth/token';

export default function LoginForm() {
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await login(data).unwrap();
            setToken(response.token)
            console.log('Авторизация успешна', response);
            navigate('/profile')
        } catch(error){
            console.error('Ошибка авторизации:', error)
        }
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1 className={styles.title}>Войдите</h1>

            <Input
                className={styles.input}
                title="Введите адрес электронной почты"
                type="email"
                placeholder="Введите адрес электронной почты"
                {...register('email')}
                error={errors.email?.message}
            />

            <PasswordInput
                title="Пароль"
                {...register('password')}
                placeholder="Введите пароль"
            />

            <div className={styles.metaRow}>
                <label className={styles.checkboxLabel}>
                    <input type="checkbox" />
                    <span>Входя в аккаунт, вы соглашаетесь с Политикой конфиденциальности и  Условиями использования </span>
                </label>
            </div>

            <LoginButton />

            <p className={styles.footerText}>
                Ещё нет аккаунта?{' '}
                <Link to="/register" className={styles.footerLink}>
                    Зарегистрироваться
                </Link>
            </p>
        </form>
    );
}