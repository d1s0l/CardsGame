import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  useDeleteCardMutation,
  useGetCardsQuery,
} from '../../../app/api/cards/cardsApi';

import ConfirmDialog from '../../../shared/ui/ConfirmDialog/ConfirmDialog';

import styles from './MyCardsPage.module.scss';

export default function MyCardsPage() {
  const { data: cards, isLoading, isError } = useGetCardsQuery();

  const [deleteCard, { isLoading: isDeleting }] = useDeleteCardMutation();

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <main className={styles.page}>
        <h1 className={styles.title}>Мои карточки</h1>
        <p>Загрузка...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className={styles.page}>
        <h1 className={styles.title}>Мои карточки</h1>
        <p>Не удалось загрузить карточки.</p>
      </main>
    );
  }

  const handleDelete = async () => {
    if (!selectedCardId) {
      return;
    }

    try {
      await deleteCard(selectedCardId).unwrap();
      setSelectedCardId(null);
    } catch {
      // Пока ничего не делаем.
      // Позже сюда можно добавить отображение ошибки.
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Коллекция</p>
          <h1 className={styles.title}>Мои карточки</h1>
        </div>

        <Link
          to="/create"
          className={styles.createButton}
        >
          Создать карточку
        </Link>
      </header>

      {cards?.length === 0 ? (
        <section className={styles.empty}>
          <h2>У вас пока нет карточек</h2>

          <p>
            Создайте первую карточку, чтобы начать обучение.
          </p>

          <Link
            to="/create"
            className={styles.createButton}
          >
            Создать карточку
          </Link>
        </section>
      ) : (
        <section className={styles.grid}>
          {cards?.map((card) => (
            <article
              key={card.id}
              className={styles.card}
            >
              <div>
                <p className={styles.topic}>
                  {card.topic}
                </p>

                <h2 className={styles.cardTitle}>
                  {card.title}
                </h2>

                <p className={styles.question}>
                  {card.question}
                </p>
              </div>

              <div className={styles.footer}>
                <div className={styles.tags}>
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className={styles.tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={styles.actions}>
                    <Link
                        to={`/cards/${card.id}/edit`}
                        className={styles.link}
                    >
                        Редактировать
                    </Link>

                    <button
                        type="button"
                        onClick={() => setSelectedCardId(card.id)}
                        disabled={isDeleting}
                        className={styles.deleteButton}
                    >
                        Удалить
                    </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      <ConfirmDialog
        open={selectedCardId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCardId(null);
          }
        }}
        title="Удалить карточку?"
        description="Карточка будет удалена без возможности восстановления."
        confirmText="Удалить"
        cancelText="Отмена"
        onConfirm={handleDelete}
      />
    </main>
  );
}