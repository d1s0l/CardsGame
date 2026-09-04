import styles from './ErrorMessaage.module.scss'

interface ErrorMessageProps {
    title: string;
    description: string;
    onRetry: () => void;
}

export default function ErrorMessage({title, description, onRetry}: ErrorMessageProps) {
    return(
        <main className={styles.page}>
            <section className={styles.card}>
                <h4>{title}</h4>
                <span>{description}</span>
                <button type='button' onClick={onRetry}>Повтроить попытку</button>
            </section>
        </main>
    )
}