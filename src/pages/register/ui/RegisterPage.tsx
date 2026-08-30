import RegisterForm from "../../../features/auth/registration/ui/RegisterForm";
import styles from './RegisterPage.module.scss'

export default function RegisterPage() {
    return(
        <main className={styles.page}>
            <div className={styles.card}>
                <RegisterForm />
            </div>
        </main>
    )
}