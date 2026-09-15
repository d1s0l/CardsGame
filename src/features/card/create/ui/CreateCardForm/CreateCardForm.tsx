import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateCardMutation, useSaveDraftMutation } from '../../../../../app/api/cards/cardsApi';

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

export default function CreateCardForm() {
    const [createCard, {isLoading}] = useCreateCardMutation();
    const [saveDraft, {isLoading: isSavingDraft}] = useSaveDraftMutation();

    const {
        register,
        handleSubmit,
        control,
        getValues,
        formState: { errors },
    } = useForm<CreateCardFormValues>({
        resolver: zodResolver(createCardSchema),
        defaultValues: {
            title: '',
            question: '',
            answer: '',
            topic: '',
            tags: [],
        },
    });

    const handleSaveDraft = async (data: CreateCardFormValues) => {
        try {
            const response = await saveDraft(data).unwrap();
            console.log('Карточка добавлена в черновики', response);
        } catch(error) {
            console.log('Ошибка сохранения', error)
        }
    };

    const onSubmit = async (data: CreateCardFormValues) => {
        try {
            const response = await createCard(data).unwrap();

            console.log('Карточка создана', response)
        } catch(error) {
            console.log('Ошибка создания карточки:', error)
        }
    };

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

                <button
                        type="button"
                        className={styles.secondaryButton}
                        onClick={() => handleSaveDraft(getValues())}
                        disabled={isSavingDraft}
                    >
                        {isSavingDraft
                            ? 'Сохранение...'
                            : 'Сохранить черновик'
                        }
                </button>

                <button
                    type="submit"
                    className={styles.primaryButton}
                    disabled={isLoading}
                >
                    {isLoading ? 'Создание...' : 'Создать карточку'}
                </button>

            </div>
        </form>
    );
}