import { Controller } from 'react-hook-form';

import type {
    Control,
    FieldErrors,
} from 'react-hook-form';

import type { CreateCardFormValues } from '../../model/types';

import styles from './TagSelector.module.scss';

const tagOptions = [
    'React',
    'JavaScript',
    'Frontend',
    'State',
    'API',
    'TypeScript',
];

interface TagSelectorProps {
    control: Control<CreateCardFormValues>;
    error?: FieldErrors<CreateCardFormValues>['tags'];
}

export default function TagSelector({
    control,
    error,
}: TagSelectorProps) {
    return (
        <div className={styles.field}>
            <label>Теги</label>

            <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                    <div className={styles.tags}>
                        {tagOptions.map((tag) => {
                            const isSelected =
                                field.value.includes(tag);

                            return (
                                <button
                                    key={tag}
                                    type="button"
                                    className={`${styles.tag} ${
                                        isSelected
                                            ? styles.selected
                                            : ''
                                    }`}
                                    onClick={() => {
                                        if (isSelected) {
                                            field.onChange(
                                                field.value.filter(
                                                    (item) =>
                                                        item !== tag
                                                )
                                            );
                                        } else {
                                            field.onChange([
                                                ...field.value,
                                                tag,
                                            ]);
                                        }
                                    }}
                                >
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                )}
            />

            {error && (
                <span className={styles.error}>
                    {error.message}
                </span>
            )}
        </div>
    );
}