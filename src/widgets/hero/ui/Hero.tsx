import styles from './Hero.module.scss'

export default function Hero(){
    return(
        <section className={styles.hero}>
                <div className={styles.text}>
                    <h2 className={styles.statecolor}>
                        Запоминайте больше с каждой{' '}
                        <span className={styles.imageBlock1}>
                            <img src="/text-block1.svg" alt="" />
                        </span>
                    </h2>
                    <h2 className={styles.gradientcolor}>
                        <span className={styles.imageBlock2}>
                            <img src="/text-block2.svg" alt="" />
                        </span>
                        перевернутой
                    </h2>
                    <h2 className={styles.statecolor}>
                        карточкой
                    </h2>
            </div>
            <div>
                <img className={styles.cursor} src="/cursor.png" alt="cursor" />
            </div>
        </section>
    )
}