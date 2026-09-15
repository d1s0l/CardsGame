import { Link } from 'react-router-dom';
import styles from './HeroAction.module.scss';

export default function HeroAction(){
    return(
        <section className={styles.block}>
            <Link to='/create-card' className={styles.btn_create}>
                <div className={styles.content}>
                    <p className={styles.title}>создавайте</p>
                    <div className={styles.line}></div>
                    <p className={styles.sub_title}>
                        Создавайте свои модули и делитесь ими с другими.<br />
                        Упрощайте обучение с помощью удобных карточек.
                    </p>
                </div>
                <img className={styles.arrow} src="/arrow.svg" alt="" />
            </Link>
            <Link to='/find' className={styles.btn_search}>
                <div className={styles.content}>
                    <p className={styles.title}>находите</p>
                    <div className={styles.line}></div>
                    <p className={styles.sub_title}>
                        Ищите и используйте готовые модули, созданные<br />
                        другими пользователями для быстрого обучения.
                    </p>
                </div>
                <img className={styles.arrow} src="/arrow.svg" alt="" />
            </Link>
        </section>
    )
}