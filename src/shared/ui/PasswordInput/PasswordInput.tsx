import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';

import styles from './PasswordInput.module.scss';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
    title?: string;
    error?: string;
    className?: string;
}

export default function PasswordInput({ title, error, className, ...props }: PasswordInputProps) {
    const [isShow, setIsShow] = useState(false);

    return (
        <div className={`${styles.block} ${className ?? ''}`.trim()}>
            {title && (
                <div className={styles.titleRow}>
                    <p className={styles.title}>{title}</p>
                    <button
                        type="button"
                        className={styles.inlineButton}
                        onClick={() => setIsShow(prev => !prev)}
                    >
                        {isShow ? 'Скрыть' : 'Показать'}
                    </button>
                </div>
            )}

            <div className={styles.wrapper}>
                <input
                    {...props}
                    className={styles.input}
                    type={isShow ? 'text' : 'password'}
                    aria-label={title ?? 'Пароль'}
                />
            </div>

            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
}