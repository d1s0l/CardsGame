import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetCardQuery } from '../../../app/api/cards/cardsApi';
import CreateCardForm from '../../../features/card/create/ui/CreateCardForm/CreateCardForm';
import styles from './EditCardPage.module.scss';

export default function EditCardPage() {
  const { cardId } = useParams<{ cardId: string }>();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const { data: card, isLoading, isError } = useGetCardQuery(cardId ?? '', {
    skip: !cardId,
  });

  const handleSuccess = () => {
    setIsSaved(true);
    window.setTimeout(() => navigate('/my-cards'), 900);
  };

  if (isLoading) {
    return (
      <main className={styles.page}>
        <section className={styles.statusCard} aria-live="polite">
          <h1 className={styles.statusTitle}>Загружаем карточку...</h1>
        </section>
      </main>
    );
  }

  if (isError || !card) {
    return (
      <main className={styles.page}>
        <section className={styles.statusCard}>
          <h1 className={styles.statusTitle}>Карточка не найдена</h1>
          <p className={styles.statusText}>Вернитесь к списку и выберите существующую карточку.</p>
          <Link to="/my-cards" className={styles.backLink}>К моим карточкам</Link>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Мои карточки</p>
            <h1 className={styles.title}>Редактировать карточку</h1>
          </div>

          <Link to="/my-cards" className={styles.backLink}>Отмена</Link>
        </header>

        {isSaved && (
          <p className={styles.success} role="status">
            Изменения сохранены. Возвращаемся к списку карточек...
          </p>
        )}

        <CreateCardForm
          mode="edit"
          cardId={cardId}
          initialValues={card}
          onSuccess={handleSuccess}
        />
      </section>
    </main>
  );
}
