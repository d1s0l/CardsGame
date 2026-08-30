import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '../../../../shared/ui/LoginInput/Input';
import PasswordInput from '../../../../shared/ui/PasswordInput/PasswordInput';
import LoginButton from '../../../../shared/ui/LoginButton/LoginButton';

import styles from './RegisterForm.module.scss';

import type { RegisterFormValues } from '../model/types';
import { registerSchema } from '../model/schema';

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterFormValues) => {
        console.log(data);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h1 className={styles.title}>Создайте аккаунт</h1>

            <p className={styles.authSwitch}>
                Уже зарегистрированы?{' '}
                <Link to="/login" className={styles.authLink}>Войти</Link>
            </p>

            <Input
                className={styles.input}
                title="Как к вам обращаться?"
                {...register('name')}
                placeholder="Введите имя профиля"
                error={errors.name?.message}
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

            <LoginButton type="submit">
                Зарегистрироваться
            </LoginButton>
        </form>
    );
}