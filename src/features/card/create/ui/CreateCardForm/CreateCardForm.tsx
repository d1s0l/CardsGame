import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    useCreateCardMutation,
    useSaveDraftMutation,
    useUpdateCardMutation,
} from '../../../../../app/api/cards/cardsApi';

import styles from './CreateCardForm.module.scss';

import AnswerInput from '../AnswerOptions/AnswerOptions';
import TagSelector from '../TagSelector/TagSelector';

import { createCardSchema } from '../../model/schema';
import type { CreateCardFormValues } from '../../model/types';

const topicOptions = [
    'Frontend',
    'Backend',
    'JavaScript',
    'TypeScript',
    'UI/UX',
];

const emptyValues: CreateCardFormValues = {
    title: '',
    question: '',
    answer: '',
    topic: '',
    tags: [],
};

interface CreateCardFormProps {
    mode?: 'create' | 'edit';
    initialValues?: CreateCardFormValues;
    cardId?: string;
    onSuccess?: () => void;
}

export default function CreateCardForm({
    mode = 'create',
    initialValues,
    cardId,
    onSuccess,
}: CreateCardFormProps) {
    const [actionError, setActionError] = useState('');
    const [createCard, {isLoading: isCreating}] = useCreateCardMutation();
    const [updateCard, {isLoading: isUpdating}] = useUpdateCardMutation();
    const [saveDraft, {isLoading: isSavingDraft}] = useSaveDraftMutation();

    const {
        register,
        handleSubmit,
        control,
        getValues,
        reset,
        formState: { errors },
    } = useForm<CreateCardFormValues>({
        resolver: zodResolver(createCardSchema),
        defaultValues: emptyValues,
    });

    useEffect(() => {
        if (initialValues) {
            reset(initialValues);
        }
    }, [initialValues, reset]);

    const handleSaveDraft = async (data: CreateCardFormValues) => {
        try {
            await saveDraft(data).unwrap();
            setActionError('');
        } catch {
            setActionError('Не удалось сохранить черновик');
        }
    };

    const onSubmit = async (data: CreateCardFormValues) => {
        try {
            if (mode === 'edit' && cardId) {
                await updateCard({ id: cardId, data }).unwrap();
            } else {
                await createCard(data).unwrap();
            }

            setActionError('');
            onSuccess?.();
        } catch {
            setActionError('Не удалось сохранить карточку');
        }
    };

    const isSubmitting = isCreating || isUpdating;
    const isEditMode = mode === 'edit';

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className={styles.field}>
                <label htmlFor="card-title">
                    Название карточки
                </label>

                <input
                    id="card-title"
                    type="text"
                    placeholder="Например: Основы React state"
                    {...register('title')}
                />

                {errors.title && (
                    <span className={styles.error}>
                        {errors.title.message}
                    </span>
                )}
            </div>

            <div className={styles.field}>
                <label htmlFor="card-question">
                    Вопрос
                </label>

                <textarea
                    id="card-question"
                    rows={4}
                    placeholder="Напишите вопрос для карточки..."
                    {...register('question')}
                />

                {errors.question && (
                    <span className={styles.error}>
                        {errors.question.message}
                    </span>
                )}
            </div>

            <AnswerInput
                register={register}
                error={errors.answer}
            />

            <div className={styles.field}>
                <label htmlFor="topic">
                    К чему относится
                </label>

                <select
                    id="topic"
                    {...register('topic')}
                >
                    <option value="">
                        Выберите тему
                    </option>

                    {topicOptions.map((topic) => (
                        <option
                            key={topic}
                            value={topic}
                        >
                            {topic}
                        </option>
                    ))}
                </select>

                {errors.topic && (
                    <span className={styles.error}>
                        {errors.topic.message}
                    </span>
                )}
            </div>


            <TagSelector
                control={control}
                error={errors.tags}
            />

            <div className={styles.actions}>

                {!isEditMode && (
                    <button
                        type="button"
                        className={styles.secondaryButton}
                        onClick={() => handleSaveDraft(getValues())}
                        disabled={isSavingDraft || isSubmitting}
                    >
                        {isSavingDraft
                            ? 'Сохранение...'
                            : 'Сохранить черновик'
                        }
                    </button>
                )}

                <button
                    type="submit"
                    className={styles.primaryButton}
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? (isEditMode ? 'Сохранение...' : 'Создание...')
                        : (isEditMode ? 'Сохранить изменения' : 'Создать карточку')}
                </button>

            </div>

            {actionError && <p className={styles.error} role="alert">{actionError}</p>}
        </form>
    );
}
