import styles from '../Libary.module.scss';

interface LibraryHeaderProps {
  cardsCount: number;
}

export default function LibraryHeader({ cardsCount }: LibraryHeaderProps) {
  return (
    <header className={styles.header}>
      <div>
        <p className={styles.eyebrow}>Материалы для обучения</p>
        <h1 className={styles.title}>Библиотека</h1>
        <p className={styles.subtitle}>Выберите карточку и повторите нужную тему.</p>
      </div>

      <div className={styles.counter}>
        <span className={styles.counterValue}>{cardsCount}</span>
        <span className={styles.counterLabel}>карточек</span>
      </div>
    </header>
  );
}
