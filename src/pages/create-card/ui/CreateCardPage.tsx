import CreateCardForm from '../../../features/card/create/ui/CreateCardForm/CreateCardForm';
import styles from './CreateCardPage.module.scss'


export default function CreateCardPage() {
  return (
    <main>
      <section className={styles.card}>
            <header className={styles.header}>
                    <div>
                        <p className={styles.eyebrow}>
                            Новая карточка
                        </p>

                        <h1 className={styles.title}>
                            Создать модуль
                        </h1>
                    </div>


                </header>
      </section>
      <CreateCardForm />
    </main>
  );
}
