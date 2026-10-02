import styles from '../Libary.module.scss';

export default function LibraryEmptyState() {
  return (
    <div className={styles.emptyState}>
      <h2 className={styles.emptyTitle}>Здесь пока нет карточек</h2>
      <p className={styles.emptyText}>Создайте первый учебный модуль, чтобы он появился в библиотеке.</p>
    </div>
  );
}
