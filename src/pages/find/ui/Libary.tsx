import { useGetCardsQuery } from '../../../app/api/cards/cardsApi';
import LibraryContent from './components/LibraryContent';
import LibraryStatus from './components/LibraryStatus';

export default function LibaryPage() {
  const { data: cards, isLoading, isError } = useGetCardsQuery();

  if (isLoading) {
    return (
      <LibraryStatus
        title="Загружаем карточки..."
        description="Собираем материалы для следующего занятия."
        live
      />
    );
  }

  if (isError) {
    return (
      <LibraryStatus
        title="Не удалось загрузить карточки"
        description="Пожалуйста, попробуйте обновить страницу немного позже."
      />
    );
  }

  return <LibraryContent cards={cards ?? []} />;
}
