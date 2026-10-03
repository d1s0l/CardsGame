import { Link } from 'react-router-dom';
import type { Card } from '../../../../app/api/cards/cardsApi';
import styles from '../Libary.module.scss';

interface LibraryCardProps {
  card: Card;
}

export default function LibraryCard({ card }: LibraryCardProps) {
  return (
    <Link to={`/libary/${card.id}`} className={styles.learningCard}>
      <div className={styles.cardTop}>
        <span className={styles.topic}>{card.topic}</span>
        <span className={styles.cardNumber}>Карточка</span>
      </div>

      <h2 className={styles.cardTitle}>{card.title}</h2>

      <div className={styles.contentBlock}>
        <span className={styles.contentLabel}>Вопрос</span>
        <p className={styles.question}>{card.question}</p>
      </div>

      <div className={styles.answerBlock}>
        <span className={styles.contentLabel}>Ответ</span>
        <p className={styles.answer}>{card.answer}</p>
      </div>

      {card.tags.length > 0 && (
        <div className={styles.tags} aria-label="Теги карточки">
          {card.tags.map((tag) => <span key={tag} className={styles.tag}>{tag}</span>)}
        </div>
      )}
    </Link>
  );
}
