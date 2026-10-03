import { type FormEvent, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCheckCardAnswerMutation, useGetCardQuery } from '../../../app/api/cards/cardsApi';
import styles from './CardPage.module.scss';

export default function CardPage() {
  const { cardId } = useParams<{ cardId: string }>();
  const { data: card, isLoading, isError } = useGetCardQuery(cardId ?? '', {
    skip: !cardId,
  });
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const [checkAnswer, { isLoading: isChecking, isError: isCheckError }] = useCheckCardAnswerMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!cardId || !answer.trim()) {
      setResult('incorrect');
      return;
    }

    try {
      const response = await checkAnswer({ cardId, answer }).unwrap();
      setResult(response.isCorrect ? 'correct' : 'incorrect');
    } catch {
      setResult('incorrect');
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswer(value);
    setResult(null);
  };

  if (isLoading) {
    return (
      <main className={styles.page}>
        <section className={styles.statusCard} aria-live="polite">
          <span className={styles.eyebrow}>Карточка</span>
          <h1 className={styles.statusTitle}>Загружаем материал...</h1>
        </section>
      </main>
    );
  }

  if (isError || !card) {
    return (
      <main className={styles.page}>
        <section className={styles.statusCard}>
          <span className={styles.eyebrow}>Карточка</span>
          <h1 className={styles.statusTitle}>Карточка не найдена</h1>
          <p className={styles.statusText}>Вернитесь в библиотеку и выберите материал из списка.</p>
          <Link to="/libary" className={styles.backButton}>К библиотеке</Link>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <article className={styles.card}>
        <Link to="/libary" className={styles.backLink}>← Все карточки</Link>

        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>{card.topic}</p>
            <h1 className={styles.title}>{card.title}</h1>
          </div>
          <span className={styles.cardLabel}>Учебная карточка</span>
        </header>

        <section className={styles.questionBlock}>
          <span className={styles.sectionLabel}>Вопрос</span>
          <p className={styles.question}>{card.question}</p>
        </section>

        <section className={styles.answerBlock}>
          <span className={styles.sectionLabel}>Ответ</span>
          <form className={styles.answerForm} onSubmit={handleSubmit}>
            <label className={styles.visuallyHidden} htmlFor="card-answer">Ваш ответ</label>
            <input
              id="card-answer"
              className={styles.answerInput}
              type="text"
              value={answer}
              onChange={(event) => handleAnswerChange(event.target.value)}
              placeholder="Введите ответ"
              disabled={isChecking || result === 'correct'}
              autoComplete="off"
            />
            <button className={styles.checkButton} type="submit" disabled={isChecking || result === 'correct'}>
              {isChecking ? 'Проверяем...' : 'Проверить'}
            </button>
          </form>

          {result === 'correct' && (
            <p className={`${styles.result} ${styles.resultCorrect}`} role="status">
              Верно! Отличная работа.
            </p>
          )}

          {result === 'incorrect' && (
            <p className={`${styles.result} ${styles.resultIncorrect}`} role="alert">
              {isCheckError ? 'Не удалось проверить ответ. Попробуйте ещё раз.' : 'Пока неверно. Попробуйте ещё раз.'}
            </p>
          )}
        </section>

        {card.tags.length > 0 && (
          <footer className={styles.tags} aria-label="Теги карточки">
            {card.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </footer>
        )}
      </article>
    </main>
  );
}
