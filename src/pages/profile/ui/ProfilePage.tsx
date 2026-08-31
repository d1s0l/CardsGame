import {
    useGetProfileQuery,
} from '../../../app/api/users/usersApi';

import LogoutButton from '../../../features/auth/logout/ui/LogoutButton';
import styles from './ProfilePage.module.scss';

export default function ProfilePage() {
    const {
        data: profile,
        isLoading: isProfileLoading,
        error: profileError,
    } = useGetProfileQuery();

    if (isProfileLoading) {
        return <div>Loading...</div>;
    }

    if (profileError) {
        return <div>Не удалось загрузить профиль</div>;
    }

    return (
        <main className={styles.page}>
            <section className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.profileInfo}>
                        <div className={styles.avatar}>
                            {profile?.username?.[0] ?? 'А'}
                        </div>

                        <div>
                            <h1 className={styles.name}>
                                {profile?.username ?? 'Пользователь'}
                            </h1>

                            <p className={styles.role}>
                                Пользователь
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className={styles.actionButton}
                    >
                        Редактировать
                    </button>

                    <LogoutButton />
                </div>

                <div className={styles.grid}>
                    <div className={styles.block}>
                        <h2 className={styles.blockTitle}>
                            Личная информация
                        </h2>

                        <div className={styles.fieldList}>
                            <div className={styles.field}>
                                <span className={styles.fieldLabel}>
                                    Email
                                </span>

                                <span className={styles.fieldValue}>
                                    {profile?.email ?? '—'}
                                </span>
                            </div>

                            <div className={styles.field}>
                                <span className={styles.fieldLabel}>
                                    Город
                                </span>

                                <span className={styles.fieldValue}>
                                    {profile?.city ?? '—'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.block}>
                        <h2 className={styles.blockTitle}>
                            Статистика
                        </h2>

                        <div className={styles.stats}>
                            <div className={styles.stat}>
                                <span className={styles.statValue}>
                                    24
                                </span>

                                <span className={styles.statLabel}>
                                    Карточки
                                </span>
                            </div>

                            <div className={styles.stat}>
                                <span className={styles.statValue}>
                                    8
                                </span>

                                <span className={styles.statLabel}>
                                    Модули
                                </span>
                            </div>

                            <div className={styles.stat}>
                                <span className={styles.statValue}>
                                    12
                                </span>

                                <span className={styles.statLabel}>
                                    Подписки
                                </span>
                            </div>

                            <div className={styles.stat}>
                                <span className={styles.statValue}>
                                    96%
                                </span>

                                <span className={styles.statLabel}>
                                    Прогресс
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </main>
    );
}

