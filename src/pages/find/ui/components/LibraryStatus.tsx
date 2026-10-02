import styles from '../Libary.module.scss';

interface LibraryStatusProps {
  title: string;
  description: string;
  live?: boolean;
}

export default function LibraryStatus({ title, description, live = false }: LibraryStatusProps) {
  return (
    <main className={styles.page}>
      <section className={styles.statusCard} aria-live={live ? 'polite' : undefined}>
        <span className={styles.statusLabel}>Библиотека</span>
        <h1 className={styles.statusTitle}>{title}</h1>
        <p className={styles.statusText}>{description}</p>
      </section>
    </main>
  );
}
