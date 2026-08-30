import {
    forwardRef,
    type InputHTMLAttributes,
} from 'react';

import styles from './Input.module.scss';

interface InputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    title: string;
    error?: string;
    className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ title, error, className, ...props }, ref) => {
        return (
            <div className={`${styles.block} ${className ?? ''}`.trim()}>
                <p>{title}</p>

                <input
                    ref={ref}
                    {...props}
                />

                {error && (
                    <span>{error}</span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;