import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './LoginButton.module.scss';

interface LoginButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}

export default function LoginButton({
    children = 'Войти',
    ...props
}: LoginButtonProps) {
    return (
        <button {...props} className={styles.btn}>
            {children}
        </button>
    );
}