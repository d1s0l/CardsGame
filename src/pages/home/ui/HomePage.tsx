import HeroAction from "../../../widgets/hero-action/ui/HeroAction";
import Hero from "../../../widgets/hero/ui/Hero";
import styles from "./HomePage.module.scss";

export default function HomePage()  {
    return(
        <section className={styles.page}>
            <Hero />
            <HeroAction />
        </section>
    )
}