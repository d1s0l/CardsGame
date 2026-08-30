import Header from "../../../widgets/Header/Header";
import HeroAction from "../../../widgets/hero-action/ui/HeroAction";
import Hero from "../../../widgets/hero/ui/Hero";
import styles from "./HomePage.module.scss";

export default function HomePage()  {
    return(
        <section className={styles.page}>
            <Header />
            <Hero />
            <HeroAction />
        </section>
    )
}