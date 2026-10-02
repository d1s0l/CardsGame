import type { Card } from '../../../../app/api/cards/cardsApi';
import styles from '../Libary.module.scss';
import LibraryCard from './LibraryCard';
import LibraryEmptyState from './LibraryEmptyState';
import LibraryHeader from './LibraryHeader';

interface LibraryContentProps {
  cards: Card[];
}

export default function LibraryContent({ cards }: LibraryContentProps) {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <LibraryHeader cardsCount={cards.length} />

        {cards.length > 0 ? (
          <div className={styles.grid}>
            {cards.map((card) => <LibraryCard key={card.id} card={card} />)}
          </div>
        ) : <LibraryEmptyState />}
      </section>
    </main>
  );
}
