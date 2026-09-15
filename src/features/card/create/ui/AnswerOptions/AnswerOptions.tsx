import type {
    FieldError,
    UseFormRegister,
} from 'react-hook-form';

import type { CreateCardFormValues } from '../../model/types';

import styles from './AnswerOptions.module.scss';

interface AnswerInputProps {
    register: UseFormRegister<CreateCardFormValues>;
    error?: FieldError;
}

export default function AnswerInput({
    register,
    error,
}: AnswerInputProps) {
    return (
        <div className={styles.field}>
            <label htmlFor="answer">
                Ответ
            </label>

            <input
                id="answer"
                type="text"
                placeholder="Введите ответ"
                {...register('answer')}
            />

            {error && (
                <span className={styles.error}>
                    {error.message}
                </span>
            )}
        </div>
    );
}