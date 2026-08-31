import styles from './CreateCardPage.module.scss';

export default function CreateCardPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Создать карточку</h1>
        <p className={styles.subtitle}>Скоро здесь будет редактор карточек.</p>
      </section>
    </main>
  );
}
